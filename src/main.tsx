import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Preload first visible menu images for instant display
const PRELOAD_IMAGES = [
  'kappa.jpg', 'kani.jpg', 'nigiri.jpg', 'handrollcrab.jpg',
  'unagi.jpg', 'saki.jpg', 'handrollshrimp.jpg', 'alaska.jpg',
]
PRELOAD_IMAGES.forEach(name => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = `/images/${name}`
  document.head.appendChild(link)
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
