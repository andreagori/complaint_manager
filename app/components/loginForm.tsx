/**
 * LoginForm Component
 * 
 * Renders a client-side login form with email and password fields.
 * Features:
 * - Password visibility toggle using local state.
 * - Client-side form submission handling.
 * - Displays loading overlay via `Loading` component while logging in.
 * - Displays error messages from the `useLogin` hook.
 * - Uses `ShimmerButton` and `ShineBorder` for UI effects.
 * 
 * Client-side only:
 * - Uses `useState` and `useRouter` for client-side interactivity and navigation.
 */
"use client";
import { useState } from "react";
import { ShineBorder } from "./magicui/shine-border";
import { ShimmerButton } from "../components/magicui/shimmer-button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/useLogin";
import Loading from './loading';

export default function LoginForm() {
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      router.push("/dashboard");
    }
  };

  if (loading) {
    return <Loading isVisible={true} message="Loading data..." />;
  }

  return (
    <Card className="relative overflow-hidden max-w-xl w-full">
      <ShineBorder
        shineColor={["#8b1286", "#ffe991", "#A64194"]}
        borderWidth={2}
        duration={15}
      />
      <CardContent className="p-10">
        <form onSubmit={handleSubmit} className="text-2xl">
          <div className="mb-8">
            <label
              className="block mb-1 font-medium"
              htmlFor="email"
              style={{ color: "var(--purple)" }}
            >
              * Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-2xl px-3 py-2 shadow-md text-lg"
              style={{ borderColor: "var(--purple)", color: "black" }}
            />
          </div>
          <div className="mb-8">
            <label
              className="block mb-1 font-medium"
              htmlFor="password"
              style={{ color: "var(--purple)" }}
            >
              * Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border rounded-2xl px-3 py-2 pr-12 shadow-md text-lg"
                style={{ borderColor: "var(--purple)", color: "black" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
              </button>
            </div>
            {error && (
              <p className="text-lg italic mt-2 ml-2" style={{ color: "var(--dark-purple)" }}>
                {error}
              </p>
            )}
          </div>
          <ShimmerButton className="shadow-2xl w-full" type="submit">
            <span className="whitespace-pre-wrap text-center text-2xl font-medium leading-none tracking-wide text-white">
              Login
            </span>
          </ShimmerButton>
        </form>
      </CardContent>
    </Card>
  );
}
