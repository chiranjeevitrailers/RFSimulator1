import React, { useState } from 'react'
import { FileText, Download, Calendar, Filter, Settings } from 'lucide-react'

export const ReportGeneratorPage: React.FC = () => {
  const [reportConfig, setReportConfig] = useState({
    type: 'comprehensive',
    timeRange: '24h',
    includeCharts: true,
    includeLogs: true,
    includeAnalytics: true,
    format: 'pdf'
  })

  const reportTypes = [
    { value: 'comprehensive', label: 'Comprehensive Analysis' },
    { value: 'performance', label: 'Performance Report' },
    { value: 'error', label: 'Error Analysis' },
    { value: 'custom', label: 'Custom Report' }
  ]

  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ]

  const formats = [
    { value: 'pdf', label: 'PDF' },
    { value: 'excel', label: 'Excel' },
    { value: 'csv', label: 'CSV' },
    { value: 'json', label: 'JSON' }
  ]

  const handleGenerateReport = () => {
    // Simulate report generation
    console.log('Generating report with config:', reportConfig)
    // In a real implementation, this would call the backend API
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Report Generator</h1>
        <p className="text-gray-600 mt-1">Generate comprehensive protocol analysis reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Report Configuration</h3>
          
          <div className="space-y-6">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportConfig.type}
                onChange={(e) => setReportConfig(prev => ({...prev, type: e.target.value}))}
                className="w-full border rounded px-3 py-2"
              >
                {reportTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Time Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
              <select
                value={reportConfig.timeRange}
                onChange={(e) => setReportConfig(prev => ({...prev, timeRange: e.target.value}))}
                className="w-full border rounded px-3 py-2"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Report Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
              <select
                value={reportConfig.format}
                onChange={(e) => setReportConfig(prev => ({...prev, format: e.target.value}))}
                className="w-full border rounded px-3 py-2"
              >
                {formats.map(format => (
                  <option key={format.value} value={format.value}>{format.label}</option>
                ))}
              </select>
            </div>

            {/* Include Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Include in Report</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reportConfig.includeCharts}
                    onChange={(e) => setReportConfig(prev => ({...prev, includeCharts: e.target.checked}))}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm">Charts and Graphs</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reportConfig.includeLogs}
                    onChange={(e) => setReportConfig(prev => ({...prev, includeLogs: e.target.checked}))}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm">Log Entries</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reportConfig.includeAnalytics}
                    onChange={(e) => setReportConfig(prev => ({...prev, includeAnalytics: e.target.checked}))}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm">Analytics Data</span>
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateReport}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Report Templates */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Report Templates</h3>
          
          <div className="space-y-3">
            <div className="p-3 border rounded cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Daily Summary</span>
              </div>
              <p className="text-sm text-gray-600">24-hour performance overview</p>
            </div>
            
            <div className="p-3 border rounded cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-green-600" />
                <span className="font-medium">Weekly Analysis</span>
              </div>
              <p className="text-sm text-gray-600">7-day trend analysis</p>
            </div>
            
            <div className="p-3 border rounded cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-purple-600" />
                <span className="font-medium">Error Report</span>
              </div>
              <p className="text-sm text-gray-600">Error analysis and recommendations</p>
            </div>
            
            <div className="p-3 border rounded cursor-pointer hover:bg-gray-50">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-orange-600" />
                <span className="font-medium">Custom Template</span>
              </div>
              <p className="text-sm text-gray-600">Create your own template</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Report Name</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Generated</th>
                <th className="px-4 py-2 text-left">Size</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2">Daily_Report_2024-01-15.pdf</td>
                <td className="px-4 py-2">Comprehensive</td>
                <td className="px-4 py-2">2 hours ago</td>
                <td className="px-4 py-2">2.4 MB</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Performance_Analysis_Week1.xlsx</td>
                <td className="px-4 py-2">Performance</td>
                <td className="px-4 py-2">1 day ago</td>
                <td className="px-4 py-2">1.8 MB</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Error_Report_January.csv</td>
                <td className="px-4 py-2">Error Analysis</td>
                <td className="px-4 py-2">3 days ago</td>
                <td className="px-4 py-2">856 KB</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ReportGeneratorPage