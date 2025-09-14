"use client";

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

      // Guardar el email en localStorage
      console.log("Login successful, saving email:", email);
      localStorage.setItem("userEmail", email);
      console.log("Email saved, verification:", localStorage.getItem("userEmail"));

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
