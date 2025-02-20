import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-image-gallery/styles/css/image-gallery.css";
import '@fontsource/encode-sans-expanded';

import '@fontsource-variable/cairo';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
