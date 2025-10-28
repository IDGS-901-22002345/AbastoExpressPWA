import React from "react";
import { X, User, Settings, LogOut } from "lucide-react";

const UserSidebar = ({ isOpen, toggleUserSidebar }) => {
  const userMenuItems = [
    { name: "Perfil", icon: User, id: "profile" },
    { name: "Configuración", icon: Settings, id: "settings" },
    {
      name: "Cerrar Sesión",
      icon: LogOut,
      id: "logout",
      color: "text-red-400 hover:text-red-300",
    },
  ];

  return (
    <>
      {/* Overlay para bloquear la interacción fuera del menú */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleUserSidebar}
      ></div>

      {/* Sidebar de Usuario (Overlay derecho) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white text-gray-800 z-50 shadow-2xl transition-transform duration-300 ease-in-out 
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-xl font-semibold text-green-700">
            Menú de Usuario
          </h2>
          <button
            onClick={toggleUserSidebar}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition"
            aria-label="Cerrar menú de usuario"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 flex flex-col items-center border-b pb-4">
          <div className="h-16 w-16 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-2xl mb-2">
            UN
          </div>
          <p className="font-medium">Usuario Neto</p>
          <p className="text-sm text-gray-500">usuario.neto@abarrotera.com</p>
        </div>

        {/* Lista de Navegación de Usuario */}
        <div className="py-2">
          {userMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                // Aquí se manejaría la acción del usuario
                console.log("Acción:", item.name);
                toggleUserSidebar();
              }}
              className={`flex items-center w-full p-3 space-x-3 text-sm font-medium transition-colors hover:bg-gray-50 ${
                item.color || "text-gray-700 hover:text-green-700"
              }`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
export default UserSidebar;
