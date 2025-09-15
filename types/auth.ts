/**
 * Authentication and User Types
 *
 * - LoginCredentials: Object for login requests.
 *   - email: string → User's email address.
 *   - password: string → User's password.
 *
 * - LoginResponse: Response from login endpoint.
 *   - user: Object containing authenticated user's info:
 *       - id: number → User ID
 *       - name: string → User's full name
 *       - email: string → User's email
 *
 * - User: Full user record from the database.
 *   - user_Id: number → Database user ID
 *   - name: string → Full name
 *   - email: string → Email address
 *   - created_at: string → Creation timestamp
 *
 * - AuthenticatedUser: Minimal user info after authentication (JWT payload).
 *   - userId: number → User ID
 *   - email: string → Email
 *
 * - JwtPayload: Payload for JWT tokens.
 *   - userId: number → User ID
 *   - email: string → Email
 *   - [key: string]: unknown → Allows extra optional fields
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface User {
  user_Id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthenticatedUser {
  userId: number;
  email: string;
}

export interface JwtPayload {
  userId: number;
  email: string;
  [key: string]: unknown;
}