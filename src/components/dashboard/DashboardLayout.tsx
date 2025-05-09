
import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DashboardSidebar from "./DashboardSidebar";
import TopNavbar from "./TopNavbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container flex min-h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div 
        className={`dashboard-content flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0 md:ml-16'
        }`}
      >
        <TopNavbar toggleSidebar={toggleSidebar} />
        <div className="main-content flex-1 p-4 md:p-6 overflow-x-hidden max-w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
