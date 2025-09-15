import React from 'react'

const Legacy5GLabXPage: React.FC = () => {
  const token = localStorage.getItem('jwt') || ''
  const src = `/5glabx/index.html${token ? `?token=${encodeURIComponent(token)}` : ''}`
  return (
    <iframe
      title="5GLabX Cloud Legacy"
      src={src}
      style={{ width: '100%', height: '100%', border: '0' }}
    />
  )
}

export default Legacy5GLabXPage