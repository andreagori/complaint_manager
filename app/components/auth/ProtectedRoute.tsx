"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar si existe token en las cookies del navegador
    const cookies = document.cookie.split(';');
    // Buscar auth_token (no token)
    const authToken = cookies.find(cookie => cookie.trim().startsWith('auth_token='));
    
    if (!authToken) {
      router.replace('/login');
      return;
    }
    
    const tokenValue = authToken.split('=')[1]?.trim();
    if (!tokenValue || tokenValue === '') {
      router.replace('/login');
      return;
    }

    // Hay token válido, permitir acceso
    setHasToken(true);
  }, [router]);

  // Mientras verifica el token, no renderizar nada
  if (hasToken === null) {
    return null;
  }

  // Si hay token, mostrar el contenido
  return <>{children}</>;
}