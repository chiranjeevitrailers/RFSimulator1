const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const sig = event.headers['stripe-signature']
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

    let stripeEvent

    try {
      stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message)
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Webhook signature verification failed' })
      }
    }

    // Handle the event
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(stripeEvent.data.object)
        break
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(stripeEvent.data.object)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(stripeEvent.data.object)
        break
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(stripeEvent.data.object)
        break
      case 'invoice.payment_failed':
        await handlePaymentFailed(stripeEvent.data.object)
        break
      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`)
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ received: true })
    }
  } catch (error) {
    console.error('Webhook error:', error)
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    }
  }
}

async function handleCheckoutSessionCompleted(session) {
  console.log('Processing checkout.session.completed:', session.id)
  
  const { userId, planId } = session.metadata
  
  if (!userId || !planId) {
    console.error('Missing userId or planId in session metadata')
    return
  }

  // Update user subscription
  const { error } = await supabase
    .from('subscriptions')
    .update({
      stripe_sub_id: session.subscription,
      plan_id: planId,
      status: 'active',
      period_end: new Date(session.subscription_details?.metadata?.current_period_end * 1000).toISOString()
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating subscription:', error)
    throw error
  }

  console.log('Subscription updated successfully for user:', userId)
}

async function handleSubscriptionUpdated(subscription) {
  console.log('Processing customer.subscription.updated:', subscription.id)
  
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status === 'active' ? 'active' : 'canceled',
      period_end: new Date(subscription.current_period_end * 1000).toISOString()
    })
    .eq('stripe_sub_id', subscription.id)

  if (error) {
    console.error('Error updating subscription status:', error)
    throw error
  }

  console.log('Subscription status updated:', subscription.id)
}

async function handleSubscriptionDeleted(subscription) {
  console.log('Processing customer.subscription.deleted:', subscription.id)
  
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      stripe_sub_id: null
    })
    .eq('stripe_sub_id', subscription.id)

  if (error) {
    console.error('Error canceling subscription:', error)
    throw error
  }

  console.log('Subscription canceled:', subscription.id)
}

async function handlePaymentSucceeded(invoice) {
  console.log('Processing invoice.payment_succeeded:', invoice.id)
  
  if (invoice.subscription) {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        period_end: new Date(invoice.period_end * 1000).toISOString()
      })
      .eq('stripe_sub_id', invoice.subscription)

    if (error) {
      console.error('Error updating subscription after payment:', error)
      throw error
    }

    console.log('Subscription renewed after payment:', invoice.subscription)
  }
}

async function handlePaymentFailed(invoice) {
  console.log('Processing invoice.payment_failed:', invoice.id)
  
  if (invoice.subscription) {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'past_due'
      })
      .eq('stripe_sub_id', invoice.subscription)

    if (error) {
      console.error('Error updating subscription after payment failure:', error)
      throw error
    }

    console.log('Subscription marked as past due:', invoice.subscription)
  }
}