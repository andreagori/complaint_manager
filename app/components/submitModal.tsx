/**
 * SubmitModal Component
 * 
 * Displays a confirmation modal when a complaint is successfully submitted.
 * Features:
 * - Shows a thank you message and social media links.
 * - Includes a "Back Home" button using `ShimmerButton`.
 * - Fully client-side interactive component.
 */

"use client";
import React from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Facebook, Linkedin } from "lucide-react";
import { ShimmerButton } from "./magicui/shimmer-button";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitModal({ isOpen, onClose }: SubmitModalProps) {
  if (!isOpen) return null;

  const handleBackHome = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="relative max-w-lg w-full rounded-4xl">
        <CardContent className="p-4 text-center">
          <h1 
            className="text-6xl font-bold mb-2"
            style={{ color: "var(--dark-gray)" }}
          >
            Your complaint has been sent!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6 font-bold leading-tight">
            Thank you for taking the time to make us better.<br />
            Your voice is heard and we appreciate it.
          </p>
          
          <p className="text-base text-gray-500 mb-2">
            Check your email for updates!<br />
            Follow us on our social media
          </p>
          
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="#" 
              className="p-3 rounded-full bg-fuchsia-600 text-white hover:bg-fuchsia-700 transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a 
              href="#" 
              className="p-3 rounded-full bg-fuchsia-600 text-white hover:bg-fuchsia-700 transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
          
          <div className="flex justify-center">
            <ShimmerButton 
              onClick={handleBackHome}
              className="shadow-2xl max-w-xs"
            >
              <span className="whitespace-pre-wrap text-center text-lg font-medium leading-none tracking-wide text-white">
                Back Home
              </span>
            </ShimmerButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}