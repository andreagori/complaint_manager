/**
 * LoginButton Component
 * 
 * Renders a styled interactive button that navigates to the login page when clicked.
 * 
 * Client-side only:
 * - Uses `useRouter` from Next.js for client-side navigation.
 * - Depends on `InteractiveHoverButton` for hover effects.
 */
"use client";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <InteractiveHoverButton
      onClick={handleLogin}
      className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
    >
      <span className="font-medium tracking-wide">Login</span>
    </InteractiveHoverButton>
  );
}
