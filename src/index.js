import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <CookiesProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </CookiesProvider>
    </Router>
  </React.StrictMode>
)
