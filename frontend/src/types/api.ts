/**
 * API 類型定義
 */

export interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  role: "admin" | "manager" | "user" | "guest";
  is_active: boolean;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
  meta?: PaginationMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

export interface PaginationMeta {
  page: number;
  total: number;
}
