
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
    <div className="dashboard-container flex h-screen overflow-hidden">
      <div className={`dashboard-sidebar fixed h-screen z-40 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0 md:w-16'}`}>
        <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className={`dashboard-content flex flex-col w-full transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0 md:ml-16'}`}>
        <TopNavbar toggleSidebar={toggleSidebar} />
        <div className="main-content flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
