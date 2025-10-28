import React, { useState } from "react";
import "./App.css";
import VentasDashboard from "./pages/VentasDashboard";
import UsuariosDashboard from "./pages/UsuariosDashboard";
import UserSidebar from "./components/UserSidebar";
import Sidebar from "./components/Sidebar";
import { ChevronDown, Menu, User } from "lucide-react";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("ventas");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isUserSidebarOpen) setIsUserSidebarOpen(false);
  };

  const toggleUserSidebar = () => {
    setIsUserSidebarOpen(!isUserSidebarOpen);
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  // Función que renderiza el componente de contenido según el menú activo
  const renderContent = () => {
    switch (activeMenuItem) {
      case "ventas":
        return <VentasDashboard />;
      case "clientes":
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Sección: Clientes
            </h2>
            <p className="text-gray-600">
              Aquí irá la gestión de clientes y proveedores.
            </p>
          </div>
        );
      case "usuarios":
        return <UsuariosDashboard />;
      case "reportes":
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Sección: Reportes
            </h2>
            <p className="text-gray-600">
              Aquí se mostrarán los reportes analíticos de la abarrotera.
            </p>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold text-red-700 mb-4">Error 404</h2>
            <p className="text-gray-600">Página no encontrada.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar de Navegación */}

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeItem={activeMenuItem}
        setActiveItem={setActiveMenuItem}
      />

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col transition-all duration-300 md:ml-0">
        {/* Header/Top Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white shadow-md">
          {/* Botón de Hamburguesa para Móvil */}
          <button
            onClick={toggleSidebar}
            className="p-2 text-green-700 md:hidden rounded-lg hover:bg-green-100 transition"
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>

          {/* Título Desktop/Centro */}
          <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
            Dashboard
          </h1>

          {/* Botón de Perfil/Usuario */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 hidden sm:block">
              Usuario Neto
            </span>
            <button
              onClick={toggleUserSidebar}
              className="flex items-center space-x-1 p-2 bg-green-700 text-white rounded-full hover:bg-green-600 transition shadow-md"
              aria-label="Abrir menú de usuario"
            >
              <User size={20} />
              <ChevronDown size={16} className="hidden sm:block" />
            </button>
          </div>
        </header>

        {/* Área de Contenido Principal */}
        <div className="flex-1 p-4 md:p-8">
          {/* Contenido Dinámico según la selección del menú */}
          <div className="bg-white rounded-xl shadow-lg min-h-full">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Sidebar de Usuario (Overlay de derecha, siempre responsive) */}

      <UserSidebar
        isOpen={isUserSidebarOpen}
        toggleUserSidebar={toggleUserSidebar}
      />
    </div>
  );
};

export default App;
