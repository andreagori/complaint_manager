"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [userEmail] = useState<string>(
    typeof window !== 'undefined' ? localStorage.getItem('userEmail') || '' : ''
  );
  const router = useRouter();

  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem('userEmail');
    
    // Limpiar cookie con el nombre correcto: auth_token
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Redirigir al login
    router.push('/login');
  };

  return {
    userEmail,
    logout
  };
}