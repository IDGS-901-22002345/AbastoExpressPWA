import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

const Registrar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const { nombre, email, password } = formData;
    if (!nombre || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si el correo ya existe
    if (storedUsers.find((u) => u.email === email)) {
      setError("El correo ya está registrado");
      return;
    }

    const newUser = { nombre, email, password };
    localStorage.setItem("usuarios", JSON.stringify([...storedUsers, newUser]));

    alert("Usuario registrado con éxito");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-700 to-green-900 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Crear Cuenta
        </h2>

        <form className="space-y-5" onSubmit={handleRegister}>
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Nombre Completo
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-600">
              <div className="px-3 text-green-700">
                <User size={20} />
              </div>
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-3 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Correo Electrónico
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-600">
              <div className="px-3 text-green-700">
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 focus:outline-none"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Contraseña
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-600">
              <div className="px-3 text-green-700">
                <Lock size={20} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-green-800 transition duration-300"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registrar;
