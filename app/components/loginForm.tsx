"use client";
import React, { useState } from "react";
import { ShineBorder } from "./magicui/shine-border";
import { ShimmerButton } from "../components/magicui/shimmer-button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    router.push("/dashboard");
  };

  return (
    <Card className="relative overflow-hidden max-w-xl w-full">
      <ShineBorder
        shineColor={["#8b1286", "#ffe991", "#A64194"]}
        borderWidth={2}
        duration={15}
      />
      <CardContent className="p-10">
        <form onSubmit={handleSubmit} className="text-2xl">
          {error && (
            <p className="mb-2" style={{ color: "var(--purple)" }}>
              {error}
            </p>
          )}
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
              value={form.email}
              onChange={handleChange}
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
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border rounded-2xl px-3 py-2 pr-12 shadow-md text-lg"
                style={{ borderColor: "var(--purple)", color: "black" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff size={25} />
                ) : (
                  <Eye size={25} />
                )}
              </button>
            </div>
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