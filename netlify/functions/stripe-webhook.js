const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  const sig = event.headers['stripe-signature']
  let stripeEvent

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook signature verification failed' }),
    }
  }

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(stripeEvent.data.object)
        break

      case 'customer.subscription.created':
        await handleSubscriptionCreated(stripeEvent.data.object)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(stripeEvent.data.object)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(stripeEvent.data.object)
        break

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(stripeEvent.data.object)
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(stripeEvent.data.object)
        break

      case 'customer.subscription.trial_will_end':
        await handleTrialWillEnd(stripeEvent.data.object)
        break

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    }
  } catch (error) {
    console.error('Error processing webhook:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook processing failed' }),
    }
  }
}

async function handleCheckoutSessionCompleted(session) {
  console.log('Processing checkout.session.completed:', session.id)

  const { user_id, plan_id } = session.metadata

  if (!user_id || !plan_id) {
    console.error('Missing metadata in checkout session:', session.id)
    return
  }

  // Update user's subscription status
  await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      stripe_subscription_id: session.subscription,
      current_period_start: new Date(session.subscription_details.current_period_start * 1000).toISOString(),
      current_period_end: new Date(session.subscription_details.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user_id)
    .eq('plan_id', plan_id)

  // Update user role if upgrading from trial
  const { data: user } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user_id)
    .single()

  if (user && user.role === 'trial') {
    const { data: plan } = await supabase
      .from('plans')
      .select('name')
      .eq('id', plan_id)
      .single()

    if (plan) {
      await supabase
        .from('profiles')
        .update({ role: plan.name.toLowerCase() })
        .eq('id', user_id)
    }
  }

  console.log('Checkout session completed successfully:', session.id)
}

async function handleSubscriptionCreated(subscription) {
  console.log('Processing customer.subscription.created:', subscription.id)

  const { user_id, plan_id } = subscription.metadata

  if (!user_id || !plan_id) {
    console.error('Missing metadata in subscription:', subscription.id)
    return
  }

  // Create or update subscription record
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id,
      plan_id,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

  if (error) {
    console.error('Error creating subscription:', error)
  } else {
    console.log('Subscription created successfully:', subscription.id)
  }
}

async function handleSubscriptionUpdated(subscription) {
  console.log('Processing customer.subscription.updated:', subscription.id)

  const { user_id } = subscription.metadata

  if (!user_id) {
    console.error('Missing user_id in subscription metadata:', subscription.id)
    return
  }

  // Update subscription record
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Error updating subscription:', error)
  } else {
    console.log('Subscription updated successfully:', subscription.id)
  }
}

async function handleSubscriptionDeleted(subscription) {
  console.log('Processing customer.subscription.deleted:', subscription.id)

  // Update subscription status to canceled
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Error canceling subscription:', error)
  } else {
    console.log('Subscription canceled successfully:', subscription.id)
  }
}

async function handleInvoicePaymentSucceeded(invoice) {
  console.log('Processing invoice.payment_succeeded:', invoice.id)

  if (invoice.subscription) {
    // Update subscription status to active
    await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', invoice.subscription)
  }

  console.log('Invoice payment succeeded:', invoice.id)
}

async function handleInvoicePaymentFailed(invoice) {
  console.log('Processing invoice.payment_failed:', invoice.id)

  if (invoice.subscription) {
    // Update subscription status to past_due
    await supabase
      .from('subscriptions')
      .update({
        status: 'past_due',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', invoice.subscription)
  }

  console.log('Invoice payment failed:', invoice.id)
}

async function handleTrialWillEnd(subscription) {
  console.log('Processing customer.subscription.trial_will_end:', subscription.id)

  // Send notification to user about trial ending
  // This could trigger an email notification or in-app notification
  console.log('Trial will end for subscription:', subscription.id)
}