import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import router from './Router/router.jsx';
import { RouterProvider } from 'react-router';
import AuthProvider from './Authentication/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />
 <ToastContainer position="top-center" />
    </QueryClientProvider>
   </AuthProvider>
  </StrictMode>,
)
