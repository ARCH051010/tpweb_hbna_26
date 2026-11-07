import { useState, useEffect } from "react";
import { obtenerEstadisticas } from "../../services/statsService";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts';
import "./dashboard-stats.css";

import { useAuth } from "../../context/AuthContext";

export default function StatsDashboard() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);

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
        <div className="kpi-card">
          <h3>Total de Noticias</h3>
          <p className="kpi-number">{datos.kpis.total_noticias}</p>
        </div>
        <div className="kpi-card">
          <h3>Total de Eventos</h3>
          <p className="kpi-number">{datos.kpis.total_eventos}</p>
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="stats-charts">
        {/* Gráfico de Líneas: Noticias por Mes */}
        <div className="chart-container">
          <h3>Tendencia de Publicaciones</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datos.noticias_por_mes} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="mes" tick={{fontSize: 12}} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}