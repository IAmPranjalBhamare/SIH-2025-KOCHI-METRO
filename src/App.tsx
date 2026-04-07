import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingPage } from "./components/LandingPage";
import { LoginTypeSelector } from "./components/LoginTypeSelector";
import { GoogleAuthLogin } from "./components/GoogleAuthLogin";
import { WorkerLoginSelector } from "./components/WorkerLoginSelector";
import { FitnessCertificatesLogin } from "./components/worker-logins/FitnessCertificatesLogin";
import { JobCardsLogin } from "./components/worker-logins/JobCardsLogin";
import { BrandingLogin } from "./components/worker-logins/BrandingLogin";
import { MileageBalancingLogin } from "./components/worker-logins/MileageBalancingLogin";
import { CleaningDetailingLogin } from "./components/worker-logins/CleaningDetailingLogin";
import { StablingGeometryLogin } from "./components/worker-logins/StablingGeometryLogin";
import { Dashboard } from "./components/Dashboard";
import { WorkerDashboard } from "./components/WorkerDashboard";
import { AdminLogin } from "./components/AdminLogin";
import { MetroVoiceAssistant } from "./components/MetroVoiceAssistant";

import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "landing" | "login-selector" | "worker-selector" | "worker-login" | "admin-login" | "dashboard"
  >("landing");
  const [userType, setUserType] = useState("");
  const [userCategory, setUserCategory] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedWorkerCategory, setSelectedWorkerCategory] = useState("");

  const handleGetStarted = () => {
    setCurrentPage("login-selector");
  };

  const handleSelectAdmin = () => {
    setCurrentPage("admin-login");
  };

  const handleSelectWorker = () => {
    setCurrentPage("worker-selector");
  };

  const handleWorkerCategorySelect = (category: string) => {
    setSelectedWorkerCategory(category);
    setCurrentPage("worker-login");
  };

  const handleLogin = (type: string, category?: string, email?: string) => {
    setCurrentPage("dashboard");
    setUserType(type);
    setUserCategory(category || "");
    setUserEmail(email || "");
  };

  const handleLogout = () => {
    setCurrentPage("landing");
    setUserType("");
    setUserCategory("");
    setUserEmail("");
    setSelectedWorkerCategory("");
  };

  const handleBackToLoginSelector = () => {
    setCurrentPage("login-selector");
    setSelectedWorkerCategory("");
  };

  const handleBackToWorkerSelector = () => {
    setCurrentPage("worker-selector");
    setSelectedWorkerCategory("");
  };

  const renderDashboard = () => {
    if (userType === "admin") {
      return <Dashboard onLogout={handleLogout} />;
    } else if (userType === "worker" && userCategory) {
      return (
        <WorkerDashboard
          category={userCategory}
          onLogout={handleLogout}
        />
      );
    } else {
      // Fallback to login if something goes wrong
      setCurrentPage("login");
      return <GoogleAuthLogin onLogin={handleLogin} />;
    }
  };

  const renderWorkerLogin = () => {
    switch (selectedWorkerCategory) {
      case 'fitness-certificates':
        return <FitnessCertificatesLogin onLogin={handleLogin} onBack={handleBackToWorkerSelector} />;
      case 'job-cards':
        return <JobCardsLogin onLogin={handleLogin} onBack={handleBackToWorkerSelector} />;
      case 'branding':
        return <BrandingLogin onLogin={handleLogin} onBack={handleBackToWorkerSelector} />;
      case 'mileage-balancing':
        return <MileageBalancingLogin onLogin={handleLogin} onBack={handleBackToWorkerSelector} />;
      case 'cleaning-detailing':
        return <CleaningDetailingLogin onLogin={handleLogin} onBack={handleBackToWorkerSelector} />;
      case 'stabling-geometry':
        return <StablingGeometryLogin onLogin={handleLogin} onBack={handleBackToWorkerSelector} />;
      default:
        return <WorkerLoginSelector onSelectCategory={handleWorkerCategorySelect} onBack={handleBackToLoginSelector} />;
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onGetStarted={handleGetStarted} />;
      case "login-selector":
        return (
          <LoginTypeSelector
            onSelectAdmin={handleSelectAdmin}
            onSelectWorker={handleSelectWorker}
            onBack={() => setCurrentPage("landing")}
          />
        );

      case "worker-selector":
        return <WorkerLoginSelector onSelectCategory={handleWorkerCategorySelect} onBack={handleBackToLoginSelector} />;
      case "worker-login":
        return renderWorkerLogin();
      case "admin-login":
        return <AdminLogin onLogin={handleLogin} onBack={handleBackToLoginSelector} />;
      case "dashboard":
        return renderDashboard();
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -20 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 80,
              damping: 20,
            }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
        
        {/* Voice Assistant - Only show on dashboard pages */}
        {currentPage === "dashboard" && <MetroVoiceAssistant />}
        
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              zIndex: 9999,
            },
          }}
          className="!z-[9999]"
        />
      </div>
    </LanguageProvider>
  );
}