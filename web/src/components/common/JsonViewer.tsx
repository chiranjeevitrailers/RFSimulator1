import React from 'react'
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'

interface JsonViewerProps {
  data: any
  title?: string
  collapsed?: boolean
  style?: React.CSSProperties
  className?: string
}

const JsonViewer: React.FC<JsonViewerProps> = ({
  data,
  title,
  collapsed = false,
  style,
  className
}) => {
  return (
    <div className={`json-viewer ${className || ''}`} style={style}>
      {title && (
        <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </div>
      )}
      <JsonView
        data={data}
        shouldExpandNode={collapsed ? () => false : allExpanded}
        style={{
          ...defaultStyles,
          backgroundColor: 'transparent',
          fontSize: '14px',
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
        }}
      />
    </div>
  )
}

export default JsonViewer