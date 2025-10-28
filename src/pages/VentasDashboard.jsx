import React from "react";
import { ShoppingCart, Users, BarChart2, DollarSign } from "lucide-react";
import StatsCard from "../components/StatsCard";

const VentasDashboard = () => {
  const stats = [
    {
      title: "Ventas Hoy",
      value: "$1,250.00",
      icon: DollarSign,
      colorClass: "bg-green-600",
      trend: "+12.5%",
    },
    {
      title: "Transacciones",
      value: "45",
      icon: ShoppingCart,
      colorClass: "bg-green-700",
      trend: "+3.1%",
    },
    {
      title: "Ticket Promedio",
      value: "$27.78",
      icon: BarChart2,
      colorClass: "bg-green-800",
      trend: "-0.5%",
    },
    {
      title: "Clientes Registrados",
      value: "320",
      icon: Users,
      colorClass: "bg-gray-600",
      trend: "+1.0%",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6 border-b pb-2">
        Resumen de Ventas
      </h2>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Sección de Gráfico (Placeholder) */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-green-700 mb-4">
          Ventas por Hora (Hoy)
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-lg p-4"></div>
      </div>
    </div>
  );
};

export default VentasDashboard;
