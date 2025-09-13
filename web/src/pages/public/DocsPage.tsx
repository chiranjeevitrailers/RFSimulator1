import React, { useState } from 'react'
import { Search, Book, Code, Play, Users, Shield, Zap } from 'lucide-react'

export const DocsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const docSections = [
    {
      title: 'Getting Started',
      icon: Zap,
      description: 'Quick start guide and basic concepts',
      articles: [
        { title: 'Introduction to 5GLabX Cloud', href: '/docs/introduction' },
        { title: 'Quick Start Guide', href: '/docs/quick-start' },
        { title: 'Account Setup', href: '/docs/account-setup' },
        { title: 'First Test Execution', href: '/docs/first-test' }
      ]
    },
    {
      title: 'Protocol Analysis',
      icon: Book,
      description: 'Understanding protocol layers and analysis',
      articles: [
        { title: 'RRC Protocol Analysis', href: '/docs/rrc-analysis' },
        { title: 'NAS Protocol Analysis', href: '/docs/nas-analysis' },
        { title: 'S1AP/NGAP Analysis', href: '/docs/s1ap-ngap-analysis' },
        { title: 'SIP Protocol Analysis', href: '/docs/sip-analysis' },
        { title: 'O-RAN Protocol Support', href: '/docs/oran-protocols' },
        { title: 'NB-IoT Specific Analysis', href: '/docs/nbiot-analysis' }
      ]
    },
    {
      title: 'Test Suites',
      icon: Play,
      description: 'Working with 3GPP test cases',
      articles: [
        { title: 'Test Suite Library Overview', href: '/docs/test-suites' },
        { title: 'Functional Test Cases', href: '/docs/functional-tests' },
        { title: 'Mobility Test Cases', href: '/docs/mobility-tests' },
        { title: 'Performance Test Cases', href: '/docs/performance-tests' },
        { title: 'Security Test Cases', href: '/docs/security-tests' },
        { title: 'Creating Custom Test Cases', href: '/docs/custom-tests' }
      ]
    },
    {
      title: 'API Reference',
      icon: Code,
      description: 'REST API and WebSocket documentation',
      articles: [
        { title: 'API Overview', href: '/docs/api-overview' },
        { title: 'Authentication', href: '/docs/api-auth' },
        { title: 'Test Execution API', href: '/docs/api-execution' },
        { title: 'WebSocket Events', href: '/docs/websocket-events' },
        { title: 'Rate Limits', href: '/docs/api-limits' },
        { title: 'SDKs and Libraries', href: '/docs/api-sdks' }
      ]
    },
    {
      title: 'Collaboration',
      icon: Users,
      description: 'Team features and real-time collaboration',
      articles: [
        { title: 'Team Management', href: '/docs/team-management' },
        { title: 'Real-time Collaboration', href: '/docs/collaboration' },
        { title: 'Sharing Analysis Sessions', href: '/docs/sharing' },
        { title: 'Comments and Annotations', href: '/docs/annotations' },
        { title: 'Export and Reporting', href: '/docs/export-reporting' }
      ]
    },
    {
      title: 'Security & Compliance',
      icon: Shield,
      description: 'Security features and compliance information',
      articles: [
        { title: 'Security Overview', href: '/docs/security' },
        { title: 'Data Privacy', href: '/docs/privacy' },
        { title: 'Compliance Certifications', href: '/docs/compliance' },
        { title: 'Audit Logs', href: '/docs/audit-logs' },
        { title: 'SSO Integration', href: '/docs/sso' }
      ]
    }
  ]

  const popularArticles = [
    { title: 'Quick Start Guide', href: '/docs/quick-start', views: '12.5k' },
    { title: 'RRC Protocol Analysis', href: '/docs/rrc-analysis', views: '8.2k' },
    { title: 'Test Suite Library Overview', href: '/docs/test-suites', views: '6.8k' },
    { title: 'API Authentication', href: '/docs/api-auth', views: '5.4k' },
    { title: 'Creating Custom Test Cases', href: '/docs/custom-tests', views: '4.9k' }
  ]

  const filteredSections = docSections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.articles.length > 0)

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Documentation
          </h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto mb-8">
            Everything you need to know about 5GLabX Cloud. From basic concepts 
            to advanced protocol analysis techniques.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={20} />
              <input
                type="text"
                placeholder="Search documentation..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Popular Articles</h3>
              <div className="space-y-2">
                {popularArticles.map((article, index) => (
                  <a
                    key={index}
                    href={article.href}
                    className="block p-3 rounded-lg hover:bg-base-200 transition-colors"
                  >
                    <div className="font-medium text-sm">{article.title}</div>
                    <div className="text-xs text-base-content/50">{article.views} views</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {searchTerm ? (
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">
                  Search Results for "{searchTerm}"
                </h2>
                <p className="text-base-content/70">
                  Found {filteredSections.reduce((acc, section) => acc + section.articles.length, 0)} articles
                </p>
              </div>
            ) : (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Documentation Sections</h2>
                <p className="text-base-content/70">
                  Browse our comprehensive documentation organized by topic.
                </p>
              </div>
            )}

            <div className="space-y-8">
              {filteredSections.map((section, index) => {
                const Icon = section.icon
                return (
                  <div key={index} className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-bold">{section.title}</h3>
                      </div>
                      <p className="text-base-content/70 mb-4">{section.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.articles.map((article, articleIndex) => (
                          <a
                            key={articleIndex}
                            href={article.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-sm font-medium">{article.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredSections.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-base-content/70">
                  Try adjusting your search terms or browse our documentation sections.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help?
          </h2>
          <p className="text-xl text-base-content/70 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn btn-primary">
              Contact Support
            </a>
            <a href="/community" className="btn btn-outline">
              Join Community
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DocsPage