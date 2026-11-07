import { useState, useEffect } from "react";
import { obtenerEstadisticas } from "../../services/statsService";

import { 
  faNewspaper, faCalendarAlt, faUsers, faEye 
} from '@fortawesome/free-solid-svg-icons';

// Componentes
import KpiCard from "../cards/KpiCards";
import AreaChartCard from "../graphic/AreaChartCard";
import PieChartCard from "../graphic/PieChartCard";
import UpcomingEventsCard from "../Evento/UpcomignEvents";

// Estilos
import "./dashboard-stats.css";

import { useAuth } from "../../context/AuthContext";

export default function StatsDashboard() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  
  // Colores institucionales para el gráfico de pastel
  const COLORS = ['#0b6b4b', '#a35725ff'];

  const { user } = useAuth();

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await obtenerEstadisticas();
        setDatos(res);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  if (cargando) return <div className="stats-loading">Cargando estadísticas...</div>;
  if (!datos) return <div className="stats-error">No se pudieron cargar los datos.</div>;

  return (
    <div className="stats-dashboard">
        <div>
            <p className="dashboard-eyebrow">Administración</p>
            <p className="dashboard-subtitle">
              Bienvenido, <strong>{user?.username || 'Usuario'}</strong>.
            </p>    
        </div> 
      
      {/* TARJETAS KPI */}
      <div className="stats-kpis">
        <KpiCard 
          title="Total de noticias" 
          value={datos.kpis.total_noticias} 
          icon={faNewspaper} 
          trendText="+8.3% frente al mes anterior"
        />
        
        <KpiCard 
          title="Eventos próximos" 
          value={datos.kpis.total_eventos} 
          icon={faCalendarAlt} 
          trendText="2 esta semana en los próximos 30 días"
          trendType="neutral"
        />
        
        <KpiCard 
          title="Total Usuarios" 
          value={datos.kpis.total_usuarios} 
          icon={faUsers} 
          trendText="+12.6% frente a octubre"
        />

        <KpiCard 
          title="Visitas este mes" 
          value="6.2K" 
          icon={faEye} 
          trendText="+12.6% frente a octubre"
        />
      </div>

      {/* CONTENEDOR DE LOS GRÁFICOS */}
      <div className="stats-graphics-container">
        
         <AreaChartCard 
          title="Publicaciones mensuales"
          subtitle="Noticias publicadas en los últimos seis meses."
          badgeText="Jun — Nov"
          data={datos.noticias_por_mes}
          dataKeyX="mes"
          dataKeyY="total"
        />

        {/* Gráfico Modular de Pastel */}
        <PieChartCard 
          title="Distribución de Usuarios"
          subtitle="Roles asignados en el sistema."
          data={datos.usuarios_pastel}
          colors={COLORS}
        />
       
      </div>

      {/* Próximos eventos */}
      <div className="full-width-card">
         <UpcomingEventsCard eventos={datos.proximos_eventos} />
      </div>

    </div>
  );
}