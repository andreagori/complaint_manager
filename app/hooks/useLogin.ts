"use-client";

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
      return true; // ya que cookie se maneja automáticamente
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
