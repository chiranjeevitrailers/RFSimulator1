import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <span className="font-bold text-primary text-xl">5G</span>
              <span className="font-bold text-xl">LabX</span>
              <span className="text-sm text-base-content/70 ml-1">Cloud</span>
            </div>
            <p className="text-sm text-base-content/70">
              Professional 4G/5G protocol analysis platform with 1000+ 3GPP test cases.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="footer-title">Product</h3>
            <div className="grid grid-flow-col gap-4">
              <Link to="/pricing" className="link link-hover text-sm">
                Pricing
              </Link>
              <Link to="/docs" className="link link-hover text-sm">
                Documentation
              </Link>
              <Link to="/features" className="link link-hover text-sm">
                Features
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="footer-title">Support</h3>
            <div className="grid grid-flow-col gap-4">
              <Link to="/help" className="link link-hover text-sm">
                Help Center
              </Link>
              <Link to="/contact" className="link link-hover text-sm">
                Contact
              </Link>
              <Link to="/status" className="link link-hover text-sm">
                Status
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="footer-title">Company</h3>
            <div className="grid grid-flow-col gap-4">
              <Link to="/about" className="link link-hover text-sm">
                About
              </Link>
              <Link to="/careers" className="link link-hover text-sm">
                Careers
              </Link>
              <Link to="/privacy" className="link link-hover text-sm">
                Privacy
              </Link>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-8">
          <a
            href="https://github.com/5glabx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-circle"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://twitter.com/5glabx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-circle"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://linkedin.com/company/5glabx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-circle"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:support@5glabx.com"
            className="btn btn-ghost btn-circle"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-base-300 pt-8 mt-8">
          <p className="text-sm text-base-content/70">
            © 2024 5GLabX Cloud. All rights reserved.
          </p>
          <p className="text-xs text-base-content/50 mt-2">
            Built with React, TypeScript, and Supabase. Deployed on Netlify.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer