import React from "react";
import {
  X,
  ShoppingCart,
  Users,
  Package,
  BarChart2,
  User,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Definimos los elementos del menú
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, id: "/dashboard" },
    { name: "Ventas", icon: ShoppingCart, path: "/ventas" },
    { name: "Inventario", icon: Package, path: "/inventario" },
    { name: "Clientes", icon: Users, path: "/clientes" },
    { name: "Usuarios", icon: User, path: "/usuarios" },
    { name: "Reportes", icon: BarChart2, path: "/reportes" },
  ];

  return (
    <>
      {/* Overlay para móviles */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar principal */}
      <nav
        className={`fixed top-0 left-0 w-64 bg-green-800 text-white z-50 shadow-2xl transition-transform duration-300 ease-in-out 
              md:relative md:translate-x-0 md:flex-shrink-0 md:shadow-lg md:z-auto 
              ${isOpen ? "translate-x-0" : "-translate-x-full"}
              h-screen`}
      >
        {/* Encabezado del Sidebar */}
        <div className="p-4 flex items-center justify-between border-b border-green-700">
          <h1 className="text-2xl font-bold text-green-100">
            Abasto <span className="text-green-300">Express</span>
          </h1>
          {/* Botón de cierre solo en móvil */}
          <button
            onClick={toggleSidebar}
            className="text-green-200 hover:text-white md:hidden p-1 rounded-full hover:bg-green-700 transition"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        {/* Lista de Navegación */}
        <div className="py-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  if (isOpen) toggleSidebar(); // Cierra en móvil
                }}
                className={`flex items-center w-full p-4 space-x-3 text-sm font-medium transition-all duration-200 
                  ${
                    isActive
                      ? "bg-green-600 text-white border-l-4 border-green-300"
                      : "text-green-200 hover:bg-green-700 hover:text-white"
                  }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Footer o Espacio para Logo Adicional */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-green-700">
          <p className="text-xs text-green-400">
            © {new Date().getFullYear()} Sistema de Gestión
          </p>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
