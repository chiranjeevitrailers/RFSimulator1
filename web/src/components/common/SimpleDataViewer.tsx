import React from 'react'
import { useQuery } from '@tanstack/react-query'

interface SimpleDataViewerProps {
  title: string
  queryKey: any[]
  fetcher: () => Promise<any[]>
}

const SimpleDataViewer: React.FC<SimpleDataViewerProps> = ({ title, queryKey, fetcher }) => {
  const { data, isLoading, error } = useQuery({ queryKey, queryFn: fetcher })

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="alert alert-error">
          <span>Error: {(error as Error).message}</span>
        </div>
      </div>
    )
  }

  if (!data || !data.length) {
    return (
      <div className="h-full flex items-center justify-center text-base-content/50">
        No data available.
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <pre className="bg-base-200 p-4 rounded-lg text-sm overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

export default SimpleDataViewer