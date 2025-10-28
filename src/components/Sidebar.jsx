import React from "react";
import { X, ShoppingCart, Users, Package, BarChart2, User } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar, activeItem, setActiveItem }) => {
  // Definimos los elementos del menú
  const menuItems = [
    { name: "Ventas", icon: ShoppingCart, id: "ventas" },
    { name: "Inventario", icon: Package, id: "inventario" },
    { name: "Clientes", icon: Users, id: "clientes" },
    { name: "Usuarios", icon: User, id: "usuarios" },
    { name: "Reportes", icon: BarChart2, id: "reportes" },
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
              
              /* ¡CAMBIO AQUÍ! Reemplazar h-full por h-screen */
              h-screen
              `}
      >
        {/* Encabezado del Sidebar */}
        <div className="p-4 flex items-center justify-between border-b border-green-700">
          <h1 className="text-2xl font-bold text-green-100">
            Abarrotera <span className="text-green-300">Neto</span>
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
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  if (isOpen) toggleSidebar(); // Cierra en móvil al seleccionar
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
