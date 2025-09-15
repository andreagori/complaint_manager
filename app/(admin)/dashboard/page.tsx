/**
 * DashboardPage Component
 * 
 * This component represents the main dashboard page for authenticated users.
 * It provides access to general dashboard features and account management.
 * 
 * Server-side / Auth Handling:
 * - The `ProtectedRoute` component ensures only authenticated users can access this page.
 * - Authentication logic is handled by `ProtectedRoute` and related server-side checks.
 *   This could include validating JWT tokens, sessions, or API requests to confirm
 *   the user's authentication status.
 * - There is no direct server data fetching in this component, but the dashboard
 *   and account components may fetch data from the server asynchronously.
 * 
 * Dependencies:
 * - "next/image": optimized image rendering.
 * - GeneralDashboard: displays main dashboard content.
 * - AccountButton: provides account access (like logout or profile).
 * - ProtectedRoute: enforces authentication for page access.
 */

"use client";
import Image from "next/image";
import GeneralDashboard from "../../components/dashboard/generalDashboard";
import AccountButton from "../../components/accountButton";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
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
    </ProtectedRoute>
  );
};

export default DashboardPage;