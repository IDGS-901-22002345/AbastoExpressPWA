import React, { useState } from "react";
import Sidebar from "./Sidebar";
import HeaderLayout from "./HeaderLayout";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleUserSidebar = () => setIsUserSidebarOpen(!isUserSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeItem="ventas"
        setActiveItem={() => {}}
      />

      <main className="flex-1 flex flex-col">
        <HeaderLayout
          toggleSidebar={toggleSidebar}
          toggleUserSidebar={toggleUserSidebar}
        />

        <div className="flex-1 p-6">
          {" "}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
