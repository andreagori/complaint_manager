/**
 * AccountButton Component
 * 
 * A clickable button that navigates the user to the account page.
 * 
 * Client-side only:
 * - Uses `useRouter` from Next.js for client-side navigation.
 * - Wraps an InteractiveHoverButton for hover effects and styling.
 */
"use client";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { useRouter } from "next/navigation";

export default function AccountButton() {
  const router = useRouter();

  const handleAccountClick = () => {
    router.push("/account");
  };

  return (
    <InteractiveHoverButton
      onClick={handleAccountClick}
      className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
    >
      <span className="font-medium tracking-wide">
        Account
      </span>
    </InteractiveHoverButton>
  );
}