import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers["Content-type"] = "application/json"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
