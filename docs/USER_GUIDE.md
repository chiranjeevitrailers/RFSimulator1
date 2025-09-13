# 5GLabX Cloud User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Test Suite Library](#test-suite-library)
4. [Protocol Analyzer](#protocol-analyzer)
5. [Execution Management](#execution-management)
6. [Advanced Features](#advanced-features)
7. [Team Management](#team-management)
8. [API Integration](#api-integration)
9. [Troubleshooting](#troubleshooting)

## Getting Started

### Account Setup
1. **Sign Up**: Visit [5glabx.com](https://5glabx.com) and click "Sign Up"
2. **Email Verification**: Check your email and click the verification link
3. **Complete Profile**: Fill in your professional details
4. **Choose Plan**: Select from Trial, Pro, or Enterprise plans
5. **Onboarding**: Follow the interactive tour to learn the platform

### First Steps
1. **Explore Test Suites**: Browse the 1000+ available 3GPP test cases
2. **Run Your First Test**: Execute a basic attach procedure
3. **Analyze Results**: Use the protocol analyzer to examine messages
4. **Set Up Team**: Invite colleagues and assign roles (Pro+ plans)

## Dashboard Overview

### Key Metrics
- **Total Executions**: Number of tests run this month
- **Success Rate**: Percentage of successful test executions
- **Average Duration**: Mean execution time across all tests
- **Active Users**: Team members currently using the platform

### Quick Actions
- **Browse Test Suites**: Access the complete test case library
- **Protocol Analyzer**: Start a new analysis session
- **View History**: Check past execution results

### Recent Activity
- Latest test executions with status indicators
- Quick access to detailed results
- Performance trends and insights

## Test Suite Library

### Browsing Test Cases
1. **Navigate to Test Suites**: Click "Test Suites" in the sidebar
2. **Use Filters**: Filter by protocol type, complexity, or 3GPP release
3. **Search**: Use the search bar to find specific test cases
4. **Expand Suites**: Click on suite names to view individual test cases

### Test Case Categories
- **Functional**: Basic protocol procedures (Attach, Detach, Paging)
- **Mobility**: Handover and mobility management tests
- **Performance**: KPI validation and performance testing
- **Security**: Authentication and encryption procedures
- **IMS**: VoLTE and VoWiFi specific tests
- **O-RAN**: Open RAN specific procedures
- **NB-IoT**: Narrowband IoT optimizations
- **V2X**: Vehicle-to-everything communications
- **NTN**: Non-terrestrial network procedures

### Test Case Details
Each test case includes:
- **3GPP Reference**: Official specification reference
- **Description**: Detailed test purpose and scope
- **Complexity Level**: Basic, Intermediate, or Advanced
- **Expected Duration**: Typical execution time
- **Default Parameters**: Pre-configured test parameters
- **Prerequisites**: Required setup and conditions

### Executing Tests
1. **Select Test Case**: Click on a test case from the library
2. **Configure Parameters**: Modify default parameters if needed
3. **Start Execution**: Click "Execute Test" button
4. **Monitor Progress**: Watch real-time execution updates
5. **Analyze Results**: Review detailed execution results

## Protocol Analyzer

### Interface Overview
The protocol analyzer provides a professional-grade interface with:
- **Dual-Pane Viewer**: Message list and detailed analysis
- **Real-time Updates**: Live message streaming during execution
- **Layer Filtering**: Focus on specific protocol layers
- **Correlation Tracking**: Follow messages across layers

### Message Analysis
- **Message Information**: Type, layer, direction, timestamp
- **Correlation Keys**: RNTI, PLMN, TAC, and other identifiers
- **Raw Message**: Original protocol message data
- **Parsed Message**: Structured interpretation with IEs
- **Verdict**: PASS/FAIL/INCONCLUSIVE status

### Advanced Features
- **Fault Injection**: Simulate realistic protocol errors
- **Export Options**: Download results in JSON format
- **Collaboration**: Real-time sharing with team members
- **Annotations**: Add comments and notes to messages

### Protocol-Specific Views
- **O-RAN**: E2AP, O1, A1, E1, F1 protocol analysis
- **NB-IoT**: NPRACH, coverage enhancement, power saving
- **NTN**: Satellite handovers, beam switches, Doppler
- **V2X**: PC5, V2V/V2I/V2P, safety applications
- **IMS**: SIP, SDP, RTP, RTCP, DIAMETER
- **Security**: 5G-AKA, EAP-AKA, SUPI/SUCI, encryption

## Execution Management

### Viewing Executions
1. **Navigate to Executions**: Click "Executions" in the sidebar
2. **Filter Results**: Use status, date, and user filters
3. **Search**: Find specific executions by name or ID
4. **Sort**: Order by date, duration, or status

### Execution Details
Each execution shows:
- **Test Information**: Name, suite, complexity level
- **Execution Status**: Running, Passed, Failed, Cancelled
- **Duration**: Start time, end time, total duration
- **Performance Metrics**: Success rate, step-by-step results
- **Message Count**: Total protocol messages captured

### Results Analysis
- **Summary View**: High-level execution overview
- **Detailed Analysis**: Message-by-message examination
- **Performance Metrics**: Execution time and resource usage
- **Error Analysis**: Failed steps and error details
- **Export Options**: Download results for offline analysis

### Managing Executions
- **Cancel Running**: Stop active executions
- **Retry Failed**: Re-run failed test cases
- **Share Results**: Send results to team members
- **Archive Old**: Move completed executions to archive

## Advanced Features

### Analytics Dashboard
Access comprehensive analytics including:
- **Usage Trends**: Execution patterns over time
- **Performance Metrics**: Response times and success rates
- **Protocol Distribution**: Most-used test categories
- **User Activity**: Team engagement and usage patterns
- **AI Insights**: Automated recommendations and insights

### Team Management (Pro+ Plans)
- **Invite Members**: Add team members via email
- **Role Assignment**: Owner, Admin, Member, Viewer roles
- **Permission Control**: Granular access management
- **Activity Monitoring**: Track team member actions

### Audit Logs (Enterprise Plans)
- **User Activity**: Complete audit trail of all actions
- **Security Events**: Authentication and access logs
- **System Changes**: Configuration and permission updates
- **Compliance Reporting**: Export logs for compliance

### API Integration
- **API Keys**: Generate and manage API access keys
- **Webhooks**: Set up real-time event notifications
- **Documentation**: Complete API reference and examples
- **Rate Limiting**: Understand and manage API quotas

### System Monitoring (Enterprise Plans)
- **Real-time Metrics**: System health and performance
- **Alert Management**: Configure and manage alerts
- **Service Status**: Monitor all platform services
- **Capacity Planning**: Resource usage and scaling

## Team Management

### Creating Teams
1. **Navigate to Teams**: Click "Team Management" in the sidebar
2. **Create Team**: Click "Create New Team"
3. **Set Details**: Enter team name and description
4. **Invite Members**: Add team members via email

### Managing Members
- **View Members**: See all team members and their roles
- **Change Roles**: Update member permissions
- **Remove Members**: Revoke team access
- **Activity Tracking**: Monitor member actions

### Role Permissions
- **Owner**: Full access to all features and settings
- **Admin**: Manage users, teams, and billing
- **Member**: Execute tests and view results
- **Viewer**: Read-only access to test cases and results

## API Integration

### Getting Started
1. **Generate API Key**: Create a new API key in API Management
2. **Set Permissions**: Configure key permissions and access
3. **Test Connection**: Verify API access with test requests
4. **Integrate**: Use API in your applications and scripts

### API Endpoints
- **Executions**: Create, read, update, and delete executions
- **Test Cases**: Browse and retrieve test case information
- **Analytics**: Access performance and usage analytics
- **Webhooks**: Manage event notifications and callbacks

### Webhook Configuration
1. **Create Webhook**: Set up webhook endpoint
2. **Select Events**: Choose events to monitor
3. **Configure URL**: Set your webhook endpoint URL
4. **Test Delivery**: Verify webhook functionality

### Rate Limits
- **Authenticated Users**: 1,000 requests per hour
- **API Keys**: 10,000 requests per hour
- **Webhooks**: 100 events per minute
- **Burst Limits**: Temporary higher limits for short periods

## Troubleshooting

### Common Issues

#### Login Problems
- **Forgot Password**: Use "Reset Password" link on login page
- **Account Locked**: Contact support for account unlock
- **Email Not Verified**: Check spam folder for verification email

#### Execution Issues
- **Test Fails to Start**: Check quota limits and permissions
- **Execution Stuck**: Cancel and retry the execution
- **Missing Results**: Verify test case configuration

#### Performance Issues
- **Slow Loading**: Check internet connection and browser cache
- **Timeout Errors**: Reduce test complexity or contact support
- **Memory Issues**: Close unused browser tabs

#### API Problems
- **Authentication Errors**: Verify API key and permissions
- **Rate Limit Exceeded**: Implement request throttling
- **Webhook Failures**: Check endpoint availability and SSL

### Getting Help
- **Documentation**: Comprehensive guides and API reference
- **Support Portal**: Submit tickets and track issues
- **Community Forum**: Connect with other users
- **Training Resources**: Video tutorials and best practices

### Contact Support
- **Email**: support@5glabx.com
- **Phone**: +1 (555) 123-4567
- **Live Chat**: Available during business hours
- **Emergency**: 24/7 support for Enterprise customers

## Best Practices

### Test Execution
- **Start Simple**: Begin with basic functional tests
- **Use Defaults**: Leverage pre-configured parameters
- **Monitor Resources**: Watch system performance during execution
- **Document Results**: Keep notes on test outcomes

### Team Collaboration
- **Define Roles**: Clearly assign team member responsibilities
- **Share Knowledge**: Use annotations and comments
- **Regular Reviews**: Schedule team performance reviews
- **Training**: Ensure all members understand the platform

### Security
- **Strong Passwords**: Use complex, unique passwords
- **Enable MFA**: Activate multi-factor authentication
- **Regular Updates**: Keep API keys and permissions current
- **Monitor Access**: Review audit logs regularly

### Performance
- **Optimize Queries**: Use filters and search effectively
- **Batch Operations**: Group related test executions
- **Cache Results**: Leverage browser and API caching
- **Monitor Usage**: Track quota consumption and limits