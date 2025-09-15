/**
 * LogoutCard Component
 * 
 * Displays a card with user info and two actions: go back to dashboard or log out.
 * Features:
 * - Styled with `ShineBorder` and `ShimmerButton` for UI effects.
 * - Receives callbacks for `onLogout` and `onGoBack`.
 * - Fully client-side interactive component.
 */
"use client";
import { Card, CardContent } from "./ui/card";
import { ShineBorder } from "./magicui/shine-border";
import { ShimmerButton } from "./magicui/shimmer-button";

interface LogoutCardProps {
  onLogout: () => void;
  onGoBack: () => void;
}

export default function LogoutCard({ onLogout, onGoBack }: LogoutCardProps) {
  return (
    <Card className="relative overflow-hidden max-w-md w-full">
      <ShineBorder
        shineColor={["#8b1286", "#ffe991", "#A64194"]}
        borderWidth={2}
        duration={15}
      />
      <CardContent className="px-8 py-4">
        <div className="text-center space-y-6">
          {/* Title */}
          <h1 
            className="text-5xl font-bold"
            style={{ color: "var(--dark-purple)" }}
          >
            Your Account
          </h1>

          {/* User Info */}
          <div className="space-y-4">
            <div className="bg-(--cream) rounded-xl p-2">
              <p className="text-sm text-gray-600 font-medium -mb-1">Role</p>
              <p className="text-lg font-semibold" style={{ color: "var(--purple)" }}>
                Administrator
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4 pt-4">
            <button
              onClick={onGoBack}
              className="w-full py-2 px-4 rounded-4xl font-medium transition-colors border-2 hover:bg-gray-50 cursor-pointer"
              style={{ 
                borderColor: "var(--purple)",
                color: "var(--purple)"
              }}
            >
              Back to Dashboard
            </button>

            <ShimmerButton 
              className="shadow-2xl w-full" 
              onClick={onLogout}
            >
              <span className="whitespace-pre-wrap text-center text-lg font-medium leading-none tracking-wide text-white">
                Log Out
              </span>
            </ShimmerButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}