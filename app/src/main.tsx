import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/auth.tsx'
import Apollo from './utils/apollo-client.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <Apollo>
                <App />
            </Apollo>
        </AuthProvider>
    </React.StrictMode>
)
