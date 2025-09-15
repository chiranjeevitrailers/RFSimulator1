import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.tsx'
import './index.css'

const rootEl = document.getElementById('web-root') as HTMLElement | null;
if (rootEl) ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'hsl(var(--b1))',
          color: 'hsl(var(--bc))',
          border: '1px solid hsl(var(--b3))',
        },
        success: {
          iconTheme: {
            primary: 'hsl(var(--su))',
            secondary: 'hsl(var(--suc))',
          },
        },
        error: {
          iconTheme: {
            primary: 'hsl(var(--er))',
            secondary: 'hsl(var(--erc))',
          },
        },
      }}
    />
  </React.StrictMode>,
);