import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simple mock login
  const login = (credentials, type) => {
    // type can be 'vendor' or 'user'
    if (type === 'vendor') {
      // Mock vendor login with username/password
      const vendor = {
        id: 'vendor1',
        name: 'Tech Hub Admin',
        email: 'admin@techhub.com',
        role: 'vendor',
        isRegistered: true,
      };
      setUser(vendor);
      localStorage.setItem('user', JSON.stringify(vendor));
    } else if (type === 'user') {
      // Mock user login with phone/OTP
      const userData = {
        id: 'user1',
        name: 'John Doe',
        phone: credentials.phone,
        role: 'buyer',
        subscriptionStatus: 'ACTIVE',
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else if (type === 'temp_seller') {
       // Mock temp seller
       const tempSeller = {
        id: 'temp_seller1',
        name: 'Temporary Seller',
        role: 'temp_seller',
        isRegistered: false,
      };
      setUser(tempSeller);
      localStorage.setItem('user', JSON.stringify(tempSeller));
    } else if (type === 'admin') {
      const admin = {
        id: 'admin1',
        name: 'Super Admin',
        email: 'admin@xtrade.com',
        role: 'admin',
      };
      setUser(admin);
      localStorage.setItem('user', JSON.stringify(admin));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
