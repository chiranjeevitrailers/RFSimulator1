import React from 'react'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

interface JsonViewerProps {
  data: any
  title?: string
  collapsed?: boolean
  displayDataTypes?: boolean
  displayObjectSize?: boolean
  enableClipboard?: boolean
  theme?: 'light' | 'dark'
  style?: React.CSSProperties
  className?: string
}

const JsonViewer: React.FC<JsonViewerProps> = ({
  data,
  title,
  collapsed = false,
  displayDataTypes = true,
  displayObjectSize = true,
  enableClipboard = true,
  theme = 'dark',
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
        src={data}
        collapsed={collapsed}
        displayDataTypes={displayDataTypes}
        displayObjectSize={displayObjectSize}
        enableClipboard={enableClipboard}
        theme={theme}
        style={{
          backgroundColor: 'transparent',
          fontSize: '14px',
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
        }}
      />
    </div>
  )
}

export default JsonViewer