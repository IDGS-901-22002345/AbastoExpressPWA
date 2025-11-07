import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
    const user = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    // Generar token falso
    const fakeToken = btoa(
      JSON.stringify({
        nombre: user.nombre,
        email: user.email,
        time: Date.now(),
      })
    );
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("usuarioActivo", JSON.stringify(user));

    alert(`Bienvenido, ${user.nombre}!`);
    navigate("/"); // redirige al dashboard o donde desees
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-700 to-green-900 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Inicia Sesión
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
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
                placeholder="ejemplo@gmail.com"
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
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/registrar"
            className="text-green-700 font-semibold hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
