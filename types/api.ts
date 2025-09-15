/**
 * API Response Types
 *
 * - ApiResponse<T>: Generic interface for API responses.
 *   - data?: T → Optional payload of type T returned by the API.
 *   - error?: string → Optional error message if the request failed.
 *   - message?: string → Optional informational message from the API.
 *
 * - ApiError: Interface for standardized API errors.
 *   - error: string → Error message describing what went wrong.
 *   - status?: number → Optional HTTP status code associated with the error.
 */

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  error: string;
  status?: number;
}