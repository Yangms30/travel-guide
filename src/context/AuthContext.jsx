import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('travel_app_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    const mockUser = {
      id: '1',
      name: 'Traveler',
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    };
    setUser(mockUser);
    localStorage.setItem('travel_app_user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travel_app_user');
  };

  const signup = (name, email, password) => {
    // Mock signup logic
    const mockUser = {
      id: '1',
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    };
    setUser(mockUser);
    localStorage.setItem('travel_app_user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
