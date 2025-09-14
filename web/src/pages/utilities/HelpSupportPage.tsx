import React from 'react'
import { HelpCircle, Activity, BarChart3, Settings } from 'lucide-react'

export const HelpSupportPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-base-content/70">
            Documentation, support, and help resources
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h2 className="card-title">Documentation</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Comprehensive user guides and API documentation
            </p>
            <div className="space-y-2">
              <a href="#" className="link link-primary">User Manual</a>
              <a href="#" className="link link-primary">API Reference</a>
              <a href="#" className="link link-primary">Tutorials</a>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-secondary" />
              <h2 className="card-title">Support</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Get help from our support team
            </p>
            <div className="space-y-2">
              <a href="#" className="link link-primary">Contact Support</a>
              <a href="#" className="link link-primary">Submit Ticket</a>
              <a href="#" className="link link-primary">Live Chat</a>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-accent" />
              <h2 className="card-title">Community</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Connect with other users and developers
            </p>
            <div className="space-y-2">
              <a href="#" className="link link-primary">Forum</a>
              <a href="#" className="link link-primary">GitHub</a>
              <a href="#" className="link link-primary">Discord</a>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-8 h-8 text-info" />
              <h2 className="card-title">Training</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Learn how to use the platform effectively
            </p>
            <div className="space-y-2">
              <a href="#" className="link link-primary">Video Tutorials</a>
              <a href="#" className="link link-primary">Webinars</a>
              <a href="#" className="link link-primary">Certification</a>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-warning" />
              <h2 className="card-title">FAQ</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Frequently asked questions and answers
            </p>
            <div className="space-y-2">
              <a href="#" className="link link-primary">General FAQ</a>
              <a href="#" className="link link-primary">Technical FAQ</a>
              <a href="#" className="link link-primary">Billing FAQ</a>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-success" />
              <h2 className="card-title">Status</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              System status and service health
            </p>
            <div className="space-y-2">
              <a href="#" className="link link-primary">System Status</a>
              <a href="#" className="link link-primary">Incidents</a>
              <a href="#" className="link link-primary">Maintenance</a>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Getting Started</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="link link-primary">Quick Start Guide</a></li>
                <li><a href="#" className="link link-primary">Installation</a></li>
                <li><a href="#" className="link link-primary">Configuration</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Features</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="link link-primary">Protocol Analysis</a></li>
                <li><a href="#" className="link link-primary">Test Suites</a></li>
                <li><a href="#" className="link link-primary">Real-time Monitoring</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Integration</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="link link-primary">API Integration</a></li>
                <li><a href="#" className="link link-primary">Webhooks</a></li>
                <li><a href="#" className="link link-primary">SDK</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Account</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="link link-primary">Billing</a></li>
                <li><a href="#" className="link link-primary">Usage</a></li>
                <li><a href="#" className="link link-primary">Settings</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpSupportPage