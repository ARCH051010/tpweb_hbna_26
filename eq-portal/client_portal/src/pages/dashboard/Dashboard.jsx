import { Outlet } from "react-router-dom";

// Componentes
import Sidebar from "./SideBar";
import BreadCrumb from "../../components/breadcumb/BreadCrumb";

// Estilos
import "./dashboard.css";

export default function DashboardLayout() {

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        <div className="dashboard-container">
          
        <BreadCrumb />

        {/* AQUÍ SE RENDERIZARÁN LAS PÁGINAS HIJAS */}
        <Outlet />
        </div>
      </main>
    </div>
  );
}