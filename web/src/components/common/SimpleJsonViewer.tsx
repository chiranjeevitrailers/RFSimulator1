import React, { useState } from 'react'

interface SimpleJsonViewerProps {
  data: any
  title?: string
  collapsed?: boolean
  style?: React.CSSProperties
  className?: string
}

const SimpleJsonViewer: React.FC<SimpleJsonViewerProps> = ({
  data,
  title,
  collapsed = false,
  style,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(!collapsed)

  const formatJson = (obj: any, indent: number = 0): string => {
    if (obj === null) return 'null'
    if (obj === undefined) return 'undefined'
    if (typeof obj === 'string') return `"${obj}"`
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj)
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]'
      const items = obj.map(item => '  '.repeat(indent + 1) + formatJson(item, indent + 1))
      return `[\n${items.join(',\n')}\n${'  '.repeat(indent)}]`
    }
    
    if (typeof obj === 'object') {
      const keys = Object.keys(obj)
      if (keys.length === 0) return '{}'
      const items = keys.map(key => 
        '  '.repeat(indent + 1) + `"${key}": ${formatJson(obj[key], indent + 1)}`
      )
      return `{\n${items.join(',\n')}\n${'  '.repeat(indent)}}`
    }
    
    return String(obj)
  }

  const jsonString = formatJson(data)

  return (
    <div className={`simple-json-viewer ${className || ''}`} style={style}>
      {title && (
        <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </div>
      )}
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-2 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {isExpanded ? '▼ Collapse' : '▶ Expand'}
        </button>
        {isExpanded && (
          <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm font-mono border">
            <code>{jsonString}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

export default SimpleJsonViewer