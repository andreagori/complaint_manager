import React from 'react'
import LoginForm from '../../components/loginForm'
import Image from 'next/image'

export default function page() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="flex flex-col items-center gap-8">
        <Image 
          src="/ProjectLogoV2.svg" 
          alt="Project Logo" 
          width={450} 
          height={80}
          className="mb-4"
        />
        <LoginForm />
      </div>
    </div>
  )
}
