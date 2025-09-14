import React from "react";
import Image from "next/image";

const page = () => {
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
      <div className="absolute top-8 left-8 z-10">
        <Image
          src="/ProjectLogo.svg"
          alt="Project Logo"
          width={150}
          height={60}
          className="filter brightness-0 invert"
        />
      </div>

      <div className="relative z-10 p-8">
        <h1 className="text-6xl font-bold text-white pt-20">Dashboard</h1>
        {/* Aquí puedes agregar el contenido del dashboard */}
      </div>
    </div>
  );
};

export default page;
