"use client";
import Image from "next/image";
import GeneralDashboard from "../../components/dashboard/generalDashboard";
import AccountButton from "../../components/accountButton";

const DashboardPage = () => {
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
      
      <div className="fixed top-8 left-8 z-50">
        <Image
          src="/ProjectLogo.svg"
          alt="Project Logo"
          width={150}
          height={60}
          className="filter brightness-0 invert"
        />
      </div>

      <div className="fixed top-8 right-8 z-50">
        <AccountButton />
      </div>

      <div className="relative z-10 p-8">
        <div className="mt-18">
          <GeneralDashboard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;