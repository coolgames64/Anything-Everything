import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
// AUTOMATIC WIX IMAGE TRANSLATOR
if (typeof window !== 'undefined') {
  setInterval(() => {
    document.querySelectorAll('img').forEach(img => {
      // Check if the image source is using a broken Wix media string
      if (img.src && (img.src.includes('wixstatic.com') || img.src.includes('undefined'))) {
        // Extract the raw image name if possible, or fallback to an Unsplash placeholder
        const wixMatch = img.src.match(/media\/([^~]+)/);
        if (wixMatch && wixMatch[1]) {
          img.src = `https://wixstatic.com{wixMatch[1]}`;
        } else {
          img.src = "https://unsplash.com";
        }
        img.style.objectFit = "cover";
      }
    });
  }, 1000);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
