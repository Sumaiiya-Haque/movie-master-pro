import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { RouterProvider } from "react-router";

import AuthProvider from './providers/AuthProvider.jsx';
import router from './routes/router.jsx';
import ErrorBoundary from './pages/ErrorBoundary.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ErrorBoundary>
    <AuthProvider> <RouterProvider router={router} /></AuthProvider>
  </ErrorBoundary>
  </StrictMode>,
)
