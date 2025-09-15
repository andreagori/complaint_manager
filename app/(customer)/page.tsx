/**
 * Home Component
 * 
 * This component represents the main landing page where users can submit complaints.
 * It includes a complaint form, login button, animated text, and a submit confirmation modal.
 * 
 * Server-side / Auth Handling:
 * - This page does not fetch server data directly but interacts with server-side logic
 *   through the `ComplaintForm` component when a user submits a complaint.
 * - `ComplaintForm`  sends the complaint data to a backend API, which stores it
 *   or processes it accordingly.
 * - `LoginButton` trigger authentication-related server calls if the user needs to log in.
 * - The `SubmitModal` is shown after submission to indicate success, reflecting server-side
 *   acknowledgment 
 * 
 * Client-side / UI Handling:
 * - Uses `useState` to manage modal visibility (`isModalOpen`).
 * - Uses `useRef` to interact with the `ComplaintForm` instance for clearing the form after submission.
 * - Handles form submission via `handleFormSubmit`, which opens the modal.
 * - Handles modal closure and form reset via `handleCloseModal`.
 * 
 * Dependencies:
 * - React hooks: `useState`, `useRef`
 * - ComplaintForm: form component for user complaints
 * - LoginButton: handles user login
 * - SubmitModal: modal displayed after complaint submission
 * - TypingAnimation: animated typing effect for text
 * - Next.js `Image`: optimized image rendering
 */

"use client";
import { useState, useRef } from "react";
import ComplaintForm, {ComplaintFormRef} from "../components/complaintForm";
import LoginButton from "../components/loginButton";
import SubmitModal from "../components/submitModal";
import { TypingAnimation } from "../components/magicui/typing-animation";
import Image from "next/image";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<ComplaintFormRef>(null);

  // Opens the submit modal after complaint form submission
  const handleFormSubmit = () => {
    setIsModalOpen(true);
  };

  // Closes the modal and clears the complaint form
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (formRef.current) {
      formRef.current.clearForm();
    }
  };

  console.log("Component rendering, isModalOpen:", isModalOpen); 

  return (
    <div className="flex min-h-screen">
      <div
        className="w-1/2 flex flex-col items-start justify-center px-30 pb-50 relative"
        style={{
          backgroundImage: "url(/purple-noise-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-8 left-8">
          <Image
            src="/ProjectLogo.svg"
            alt="Project Logo"
            width={150}
            height={60}
            className="filter brightness-0 invert"
          />
        </div>

        <div>
          <TypingAnimation duration={50} className="text-3xl text-white ml-1">
            Feel free to reach out!
          </TypingAnimation>
        </div>
        <h1 className="text-8xl font-bold text-white drop-shadow-lg">
          How can we help you?
        </h1>

        <div className="absolute bottom-8 left-8">
          <LoginButton />
        </div>
      </div>
      <div
        className="w-1/2 flex items-center justify-center"
        style={{ backgroundColor: "var(--cream)" }}
      >
        <ComplaintForm ref={formRef} onSubmit={handleFormSubmit} />
      </div>

      <SubmitModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
