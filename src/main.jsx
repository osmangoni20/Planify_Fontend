import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import route from './routes/route.jsx'
import AuthProvider from './auth/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <DndProvider backend={HTML5Backend}>
   
   
    <AuthProvider>
    <Toaster/>
    <RouterProvider router={route}/>
    </AuthProvider>
    </DndProvider>
  </React.StrictMode>,
)
