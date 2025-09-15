/**
 * useAuth Hook
 *
 * Manages basic client-side authentication state:
 * - Retrieves the currently logged-in user's email from localStorage.
 * - Provides a logout function that clears localStorage and auth cookie, then redirects to /login.
 *
 * Returns:
 * - userEmail: string – the email of the logged-in user (empty string if none).
 * - logout: () => void – function to log out the user.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [userEmail] = useState<string>(
    typeof window !== 'undefined' ? localStorage.getItem('userEmail') || '' : ''
  );
  const router = useRouter();

  const logout = () => {
    // clean localStorage
    localStorage.removeItem('userEmail');
    
    // clean cookie
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // route to login
    router.push('/login');
  };

  return {
    userEmail,
    logout
  };
}