import { createBrowserRouter } from "react-router-dom";
import VentasDashboard from "../pages/VentasDashboard";
import UsuariosDashboard from "../pages/UsuariosDashboard";
import Registrar from "../pages/Registrar";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../components/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registrar",
    element: <Registrar />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/usuarios",
        element: <UsuariosDashboard />,
      },
      {
        path: "/ventas",
        element: <VentasDashboard />,
      },
    ],
  },
]);
