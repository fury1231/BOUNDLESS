"use client";

import { useState, useCallback, useEffect } from "react";
import type { User, ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [error, setError] = useState<string | null>(null);

  const getStoredToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  };

  const setStoredTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  };

  const clearStoredTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const fetchUser = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setState({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result: ApiResponse<User> = await response.json();
        setState({
          user: result.data,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        clearStoredTokens();
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      clearStoredTokens();
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (response.ok) {
        setStoredTokens(result.data.access_token, result.data.refresh_token);
        await fetchUser();
        return true;
      } else {
        setError(result.error?.message || "Login failed");
        return false;
      }
    } catch {
      setError("Network error");
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        return true;
      } else {
        setError(result.error?.message || "Registration failed");
        return false;
      }
    } catch {
      setError("Network error");
      return false;
    }
  };

  const logout = async () => {
    try {
      const token = getStoredToken();
      if (token) {
        await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } finally {
      clearStoredTokens();
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  };

  return {
    ...state,
    error,
    login,
    register,
    logout,
    refreshUser: fetchUser,
  };
}
