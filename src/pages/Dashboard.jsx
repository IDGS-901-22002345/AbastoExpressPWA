import React, { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Users, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usuarioActivo"));
    const token = localStorage.getItem("token");

    if (!userData || !token) {
      navigate("/login");
    } else {
      setUsuario(userData);
    }
  }, [navigate]);

  const stats = [
    {
      title: "Ventas Hoy",
      value: "$1,250.00",
      icon: DollarSign,
      color: "bg-green-600",
    },
    {
      title: "Pedidos",
      value: "45",
      icon: ShoppingCart,
      color: "bg-green-700",
    },
    {
      title: "Ganancia Neta",
      value: "$5,320.00",
      icon: BarChart2,
      color: "bg-green-800",
    },
    {
      title: "Clientes Nuevos",
      value: "12",
      icon: Users,
      color: "bg-gray-700",
    },
  ];

  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-green-800">
            ¡Bienvenido{usuario ? `, ${usuario.nombre}` : ""}!
          </h2>
          <p className="text-gray-600">Resumen general de tu actividad</p>
        </div>
      </header>

      {/* Tarjetas de estadísticas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-md flex justify-between items-center ${stat.color} text-white`}
          >
            <div>
              <p className="text-sm opacity-80">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
            <stat.icon size={36} className="opacity-80" />
          </div>
        ))}
      </section>

      {/* Sección principal */}
      <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4">
          Actividad Reciente
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
          <p>Aquí podrías mostrar un gráfico o tabla de actividad 📊</p>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
