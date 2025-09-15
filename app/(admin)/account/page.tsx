/**
 * AccountPage Component
 * 
 * This component represents the user's account page. 
 * It is protected and requires authentication to access.
 * It displays the user's role and provides options to logout or go back to the dashboard.
 * 
 * Server-side / Auth Handling:
 * - The `useAuth` hook is used to access the logout function.
 * - The `ProtectedRoute` component ensures that only authenticated users can view this page.
 * - The logout function likely clears authentication tokens/session server-side and updates
 * 
 * Dependencies:
 * - "next/image": optimized image rendering.
 * - "next/navigation": client-side routing.
 * - LogoutCard: a component to display account and logout options.
 * - ProtectedRoute: component to enforce authentication.
 * - useAuth: custom hook for authentication state.
 */

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoutCard from "../../components/logoutCard";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";

const AccountPage = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleGoBack = () => {
    router.push('/dashboard');
  };

  return (
    <ProtectedRoute>
      <div
        className="min-h-screen relative"
        style={{
          backgroundImage: "url(/full-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-xs bg-black/10 z-0"></div>
        
        {/* Logo */}
        <div className="fixed top-8 left-8 z-50">
          <div 
            onClick={handleGoBack}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Image
              src="/ProjectLogo.svg"
              alt="Project Logo"
              width={150}
              height={60}
              className="filter brightness-0 invert"
            />
          </div>
        </div>

        {/* Account Card */}
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <LogoutCard 
            onLogout={handleLogout}
            onGoBack={handleGoBack}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AccountPage;