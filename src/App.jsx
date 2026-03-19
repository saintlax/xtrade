import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './layouts/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SellerDashboard from './pages/SellerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import ItemsPage from './pages/ItemsPage';
 import MeetingRoom from './pages/MeetingRoom';
 import Checkout from './pages/Checkout';
 import AdminDashboard from './pages/AdminDashboard';

// Placeholder pages
const RegisterVendor = () => <Layout><div className="max-w-7xl mx-auto py-12 px-4 text-center text-2xl font-bold">Vendor Registration (Coming Soon)</div></Layout>;

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-vendor" element={<RegisterVendor />} />
          <Route path="/items" element={<ItemsPage />} />
          
          <Route 
            path="/buyer-dashboard" 
            element={
              <PrivateRoute roles={['buyer']}>
                <BuyerDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/vendor-dashboard" 
            element={
              <PrivateRoute roles={['vendor']}>
                <VendorDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/seller-dashboard" 
            element={
              <PrivateRoute roles={['temp_seller']}>
                <SellerDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/meeting/:id" 
            element={
              <PrivateRoute>
                <MeetingRoom />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/checkout/:id" 
            element={
              <PrivateRoute roles={['buyer']}>
                <Checkout />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <PrivateRoute roles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
