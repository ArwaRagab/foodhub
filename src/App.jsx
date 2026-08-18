import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import RestaurantPage from './pages/RestaurantPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackingPage from './pages/TrackingPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

import './styles/styles.css';
import './styles/dashboard.css';

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard.html" element={<Navigate to="/dashboard" replace />} />

            <Route path="/restaurant" element={<RestaurantPage />} />
            <Route path="/restaurant.html" element={<Navigate to="/restaurant" replace />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart.html" element={<Navigate to="/cart" replace />} />

            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout.html" element={<Navigate to="/checkout" replace />} />

            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/tracking.html" element={<Navigate to="/tracking" replace />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile.html" element={<Navigate to="/profile" replace />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/login.html" element={<Navigate to="/login" replace />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register.html" element={<Navigate to="/register" replace />} />

            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/forgot-password.html" element={<Navigate to="/forgot-password" replace />} />

            <Route path="/owner-dashboard" element={<OwnerDashboardPage />} />
            <Route path="/owner-dashboard.html" element={<Navigate to="/owner-dashboard" replace />} />

            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin-dashboard.html" element={<Navigate to="/admin-dashboard" replace />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}
