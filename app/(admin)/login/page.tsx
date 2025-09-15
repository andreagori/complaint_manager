/**
 * Login Page Component
 * 
 * This component renders the login page for the application.
 * It allows users to enter their credentials and authenticate.
 * 
 * Server-side / Auth Handling:
 * - The actual authentication process is handled inside the `LoginForm` component.
 *   This can involve sending credentials to the server via an API request, validating
 *   the user, and receiving authentication tokens or session data.
 * - Once authenticated, the server may set cookies or return a token that the client
 *   stores for subsequent authenticated requests.
 * - This page itself does not fetch server data but relies on `LoginForm` for any server communication.
 * 
 * Dependencies:
 * - "next/image": optimized image rendering.
 * - "next/link": client-side navigation.
 * - LoginForm: component that handles the login form UI and logic.
 */

import React from 'react'
import LoginForm from '../../components/loginForm'
import Image from 'next/image'
import Link from 'next/link'

export default function page() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="flex flex-col items-center gap-8">
      <Link href="/">
          <Image
            src="/ProjectLogoV2.svg"
            alt="Project Logo"
            width={450}
            height={80}
            className="mb-4"
          />
      </Link>
      <LoginForm />
    </div>
    </div>
  )
}
