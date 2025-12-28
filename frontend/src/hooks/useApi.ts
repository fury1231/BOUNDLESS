"use client";

import { useState, useCallback } from "react";
import type { ApiResponse, ApiError } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const request = useCallback(
    async (
      endpoint: string,
      options?: RequestInit
    ): Promise<ApiResponse<T> | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          headers: {
            "Content-Type": "application/json",
            ...options?.headers,
          },
          ...options,
        });

        const result = await response.json();

        if (!response.ok) {
          setError(result as ApiError);
          return null;
        }

        setData(result.data);
        return result as ApiResponse<T>;
      } catch (err) {
        setError({
          success: false,
          error: {
            code: "NETWORK_ERROR",
            message: "Failed to connect to server",
          },
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, request };
}
