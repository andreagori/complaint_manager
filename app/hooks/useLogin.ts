/**
 * useLogin Hook
 *
 * Handles user login with loading and error states:
 * - login(email: string, password: string) → Sends POST request to /api/auth with credentials.
 *   Returns true if login is successful, false otherwise.
 *
 * Returns:
 * - login: Function to attempt login
 * - loading: Boolean indicating if a login request is in progress
 * - error: String | null containing any error message from the login attempt
 */

import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Login failed");
      }

      setLoading(false);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setLoading(false);
      return false;
    }
  }

  return { login, loading, error };
}
