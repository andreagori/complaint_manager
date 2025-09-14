"use client";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AccountButton() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("Account");

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleAccountClick = () => {
    router.push("/account");
  };

  return (
    <InteractiveHoverButton
      onClick={handleAccountClick}
      className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
    >
      <span className="font-medium tracking-wide">
        {userEmail}
      </span>
    </InteractiveHoverButton>
  );
}