import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import IntroPage from './pages/IntroPage.jsx';
import CenterPage from './pages/CenterPage.jsx';
import Dashboard from '../src/pages/Dashboard.jsx'

import { UserProvider } from './hooks/useUser.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "intro", element: <IntroPage /> },
      { path: "center", element: <CenterPage /> },
      { 
        path: "dashboard", 
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      { path: "*", element: <LoginPage /> } // fallback
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
