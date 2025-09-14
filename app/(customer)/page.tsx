"use client";
import { useState, useRef } from "react";
import ComplaintForm, { ComplaintFormRef } from "../components/complaintForm";
import LoginButton from "../components/loginButton";
import SubmitModal from "../components/submitModal";
import { TypingAnimation } from "../components/magicui/typing-animation";
import Image from "next/image";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<ComplaintFormRef>(null);

  const handleFormSubmit = () => {
    console.log("handleFormSubmit called"); 
    console.log("Setting modal to open"); 
    setIsModalOpen(true);
    console.log("Modal state should be true now"); 
  };

  const handleCloseModal = () => {
    console.log("Closing modal and clearing form"); 
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
