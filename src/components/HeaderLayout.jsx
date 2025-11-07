import React, { useEffect, useState } from "react";
import { Menu, User, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 🧩 Decodifica tu token (base64 plano, no JWT)
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

const HeaderLayout = ({ toggleSidebar, toggleUserSidebar }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      setUserData(decoded);
    }
  }, []);

  // 🚪 Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioActivo");
    setUserData(null);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white shadow-md">
      {/* Botón de Hamburguesa para Móvil */}
      <button
        onClick={toggleSidebar}
        className="p-2 text-green-700 md:hidden rounded-lg hover:bg-green-100 transition"
        aria-label="Abrir menú"
      >
        <Menu size={24} />
      </button>

      {/* Título Desktop */}
      <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
        Tienda
      </h1>

      {/* Sección de usuario */}
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600 hidden sm:block">
          {userData?.nombre || userData?.email || "Usuario"}
        </span>

        {/* Botón de menú usuario */}
        <button
          onClick={toggleUserSidebar}
          className="flex items-center space-x-1 p-2 bg-green-700 text-white rounded-full hover:bg-green-600 transition shadow-md"
          aria-label="Abrir menú de usuario"
        >
          <User size={20} />
          <ChevronDown size={16} className="hidden sm:block" />
        </button>

        {/* 🔴 Botón de cerrar sesión */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-md"
          aria-label="Cerrar sesión"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default HeaderLayout;
