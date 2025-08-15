import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Profile from './modules/profile/pages/Profile';
import Posts from './modules/posts/pages/Posts';
import Settings from './modules/settings/pages/Settings';
import Dashboard from './modules/dashboard/pages/DashBoard';
import AuthPage from './modules/auth/pages/AuthPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />

        <Route path="/" element={<App />}>
          <Route index element={<Posts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);