import React from "react";
import { TrendingUp } from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, colorClass, trend }) => (
  <div
    className={`p-5 rounded-xl shadow-lg flex items-center justify-between transition duration-300 hover:shadow-xl ${colorClass}`}
  >
    <div>
      <p className="text-sm font-medium text-white opacity-80">{title}</p>
      <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
    <div className="flex flex-col items-end">
      <Icon size={32} className="text-white opacity-70" />
      <div
        className={`flex items-center text-xs mt-2 font-semibold ${
          trend.startsWith("+") ? "text-green-100" : "text-red-100"
        }`}
      >
        <TrendingUp size={14} className="mr-1" />
        {trend}
      </div>
    </div>
  </div>
);
export default StatsCard;
