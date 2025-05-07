
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
    <div className="dashboard-container">
      <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="dashboard-content w-full">
        <TopNavbar toggleSidebar={toggleSidebar} />
        <div className="main-content pb-12 pt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
