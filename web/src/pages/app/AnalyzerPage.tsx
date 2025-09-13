import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TestExecutionEngine } from '../../components/execution/TestExecutionEngine'
import { useQuery } from '@tanstack/react-query'
import { TestSuitesAPI } from '../../lib/api/testSuites'
import LoadingSpinner from '../../components/common/LoadingSpinner'

export const AnalyzerPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const testCaseId = searchParams.get('testCase')

  // Fetch test case details if provided
  const { data: testCase, isLoading } = useQuery({
    queryKey: ['test-case', testCaseId],
    queryFn: () => testCaseId ? TestSuitesAPI.getTestCase(testCaseId) : null,
    enabled: !!testCaseId
  })

  const handleExecutionComplete = (executionId: string) => {
    // Redirect to executions page to view results
    window.location.href = `/app/executions?execution=${executionId}`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="h-screen">
      <TestExecutionEngine 
        testCaseId={testCaseId || undefined}
        onExecutionComplete={handleExecutionComplete}
      />
    </div>
  )
}

export default AnalyzerPage