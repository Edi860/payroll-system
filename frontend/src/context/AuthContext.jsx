import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    const storedToken = localStorage.getItem('auth_token');

    if (storedToken) {
      setToken(storedToken);
      try {
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    localStorage.setItem('auth_token', authToken);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  }, []);

  const saveAuth = useCallback((userData, authToken) => {
    login(userData, authToken);
  }, [login]);

  // Role helpers
  const isAdmin = user?.role === 'admin';
  const isHR = user?.role === 'hr' || user?.role === 'admin';
  const isEmployee = user?.role === 'employee';

  const value = useMemo(() => ({
    user,
    token,
    loading,
    isAuthenticated: Boolean(token),
    isAdmin,
    isHR,
    isEmployee,
    role: user?.role || 'employee',
    login,
    logout,
    saveAuth,
  }), [user, token, loading, isAdmin, isHR, isEmployee, login, logout, saveAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}