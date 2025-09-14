"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LogoutCard from "../../components/logoutCard";

const AccountPage = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dar tiempo para que se cargue el componente
    const timer = setTimeout(() => {
      const email = localStorage.getItem('userEmail');
      console.log('Account page - Retrieved email:', email);
      
      if (email) {
        setUserEmail(email);
      } else {
        console.log('No email found, redirecting to login');
        router.push('/login');
      }
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('userEmail');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login');
  };

  const handleGoBack = () => {
    router.push('/dashboard');
  };

  // Mostrar loading mientras verifica la sesión
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
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
  );
};

export default AccountPage;