import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: UserProfile) => void;
  logout: () => void;
  updateUser: (user: Partial<UserProfile>) => void;
}

const defaultUser: UserProfile = {
  id: 'user1',
  name: 'Demo User',
  email: 'demo@college.edu',
  avatar: 'https://i.pravatar.cc/150?img=3',
  school: 'State University',
  rating: 4.8,
  reviews: 12,
  isHelper: false
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // In a real app, this would check for a stored token and fetch user data
  useEffect(() => {
    // Simulate loading user data
    const storedUser = localStorage.getItem('user');
    
    setTimeout(() => {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // For demo purposes, auto-login with default user
        setUser(defaultUser);
        localStorage.setItem('user', JSON.stringify(defaultUser));
      }
      setLoading(false);
    }, 500);
  }, []);

  const login = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};