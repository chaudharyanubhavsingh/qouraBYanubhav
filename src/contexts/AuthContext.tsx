import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Simulate authentication with mock data
  const login = async (email: string) => {
    try {
      // Simulate API call
      setTimeout(() => {
        setUser({
          id: "user-1",
          name: "John Doe",
          email,
          avatar: "",
          reputation: 120,
          createdAt: new Date(),
        });
      }, 1000);
    } catch {
      // Handle error silently for now
    }
  };

  const register = async (name: string, email: string) => {
    try {
      // Simulate API call
      setTimeout(() => {
        setUser({
          id: "user-1",
          name,
          email,
          avatar: "",
          reputation: 0,
          createdAt: new Date(),
        });
      }, 1000);
    } catch {
      // Handle error silently for now
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Check for existing session on load
  useEffect(() => {
    // Simulate checking local storage or cookies
    const checkAuth = () => {
      const savedUser = localStorage.getItem("quora_user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem("quora_user");
        }
      }
    };
    
    checkAuth();
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("quora_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("quora_user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
