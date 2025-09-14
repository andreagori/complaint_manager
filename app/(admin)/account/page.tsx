"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoutCard from "../../components/logoutCard";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";

const AccountPage = () => {
  const router = useRouter();
  const { userEmail, logout } = useAuth();

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
            userEmail={userEmail}
            onLogout={handleLogout}
            onGoBack={handleGoBack}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AccountPage;