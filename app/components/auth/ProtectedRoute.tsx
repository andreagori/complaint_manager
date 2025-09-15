/**
 * ProtectedRoute Component
 * 
 * This component restricts access to its children based on the presence of an authentication token.
 * It is used to wrap pages or components that require the user to be logged in.
 * 
 * Server-side / Auth Handling:
 * - This component does not directly communicate with the server.
 * - It relies on a client-side check of the `auth_token` stored in the browser cookies.
 * - In a production scenario, server-side validation should also occur when fetching data
 *   or calling protected endpoints to ensure the token is valid.
 * 
 * Client-side / UI Handling:
 * - Uses `useEffect` to check for the presence of `auth_token` in cookies.
 * - If no token is found or the token is empty, the user is redirected to the `/login` page.
 * - While checking the token, nothing is rendered to avoid flashing protected content.
 * - Once a valid token is detected, the children components are rendered.
 * 
 * Props:
 * - `children`: React.ReactNode — The protected content to display if the user is authenticated.
 * 
 * Usage:
 * ```
 * <ProtectedRoute>
 *   <DashboardPage />
 * </ProtectedRoute>
 * ```
 */

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
    // Check if auth_token exists in browser cookies
    const cookies = document.cookie.split(';');
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

    // If we reach here, a token exists
    setHasToken(true);
  }, [router]);

  // while checking for token, render nothing
  if (hasToken === null) {
    return null;
  }

  // If token exists, render the content
  return <>{children}</>;
}