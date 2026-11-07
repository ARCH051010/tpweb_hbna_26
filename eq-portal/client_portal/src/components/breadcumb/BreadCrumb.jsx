import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import "./bread-crumb.css";

export default function BreadCrumb() {
  const location = useLocation();
  
  // Convierte "/dashboard/usuarios/editores" en ["dashboard", "usuarios", "editores"]
  const pathnames = location.pathname.split('/').filter(x => x);

  // Diccionario para que las URLs se vean bonitas en español
  const nombresRutas = {
    dashboard: "Inicio",
    usuarios: "Usuarios",
    editores: "Editores",
    admins: "Administradores",
    noticias: "Noticias",
    eventos: "Eventos",
    estadisticas: "Estadísticas"
  };

  return (
    <nav className="breadcrumb-container" aria-label="breadcrumb">
      <ol className="breadcrumb-list">
        
        {/* Icono de la casita (siempre lleva al inicio del dashboard) */}
        <li className="breadcrumb-item">
          <Link to="/dashboard/estadisticas" className="breadcrumb-link home-icon">
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </li>

        {/* Generación automática de las migas */}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const esUltimo = index === pathnames.length - 1;
          
          // Ocultamos la palabra "dashboard" para que no se vea feo
          if (name === 'dashboard' && index === 0) return null; 

          return (
            <li key={name} className="breadcrumb-item">
              <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-separator" />
              
              {esUltimo ? (
                // El último elemento es texto plano (página actual)
                <span className="breadcrumb-active">
                  {nombresRutas[name] || name}
                </span>
              ) : (
                // Los anteriores son enlaces
                <Link to={routeTo} className="breadcrumb-link">
                  {nombresRutas[name] || name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}