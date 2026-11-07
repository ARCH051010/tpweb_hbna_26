import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { faUniversity } from '@fortawesome/free-solid-svg-icons';

// Contextos
import { useAuth } from "../../context/AuthContext";

// Estilos
import "./side-bar.css";

// Componentes
import Logo from "../../components/logo/Logo";

// Servicios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartPie, faUsers, faNewspaper, faCalendarAlt, 
  faGlobe, faSignOutAlt, faChevronDown, faChevronUp 
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({vistaActual, setVistaActual}) {
  const { user, logout } = useAuth();
  const [openUsers, setOpenUsers] = useState(false);
  const navigate = useNavigate();
  const [openInstitucional, setOpenInstitucional] = useState(false);

  return (
    <aside className="sidebar">

      {/* Logo */}
      <Link to={"/"} className="sidebar-brand">
        <Logo size={85} />
        {/* <span>Panel de Administración</span> */}
      </Link>

      {/* Enlaces de Navegación */}
      <nav className="sidebar-nav">
         {/* Escritorio */}
        <NavLink to="/dashboard/estadisticas" className={({ isActive }) => `sidebar-link ${isActive ? 'activo' : ''}`}>
          <FontAwesomeIcon icon={faChartPie} className="sidebar-icon" />
          Estadísitcas
        </NavLink>

        {/* Usuarios (Solo Admin) */}
        {user?.rol === 'admin' && (
          <div className="sidebar-dropdown-container">
            <button className="sidebar-link" onClick={() => setOpenUsers(!openUsers)}>
              <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
              Usuarios
              <FontAwesomeIcon icon={openUsers ? faChevronUp : faChevronDown} className="sidebar-chevron" />
            </button>
            
            {openUsers && (
              <div className="sidebar-dropdown-menu">
                <NavLink to="/dashboard/usuarios/editores" className={({ isActive }) => `sidebar-sublink ${isActive ? 'activo-sub' : ''}`}>
                  Editores
                </NavLink>
                <NavLink to="/dashboard/usuarios/admins" className={({ isActive }) => `sidebar-sublink ${isActive ? 'activo-sub' : ''}`}>
                  Administradores
                </NavLink>
              </div>
            )}
          </div>
        )}

        {/* Noticias */}
        <NavLink to="/dashboard/noticias" className={({ isActive }) => `sidebar-link ${isActive ? 'activo' : ''}`}>
          <FontAwesomeIcon icon={faNewspaper} className="sidebar-icon" />
          Noticias
        </NavLink>

        {/* Eventos */}
        <NavLink to="/dashboard/eventos" className={({ isActive }) => `sidebar-link ${isActive ? 'activo' : ''}`}>
          <FontAwesomeIcon icon={faCalendarAlt} className="sidebar-icon" />
          Eventos
        </NavLink> 

        <div className="sidebar-dropdown-container">
        <button className="sidebar-link" onClick={() => setOpenInstitucional(!openInstitucional)}>
          <FontAwesomeIcon icon={faUniversity} className="sidebar-icon" />
          Institucional
          <FontAwesomeIcon icon={openInstitucional ? faChevronUp : faChevronDown} className="sidebar-chevron" />
        </button>

        {openInstitucional && (
          <div className="sidebar-dropdown-menu">
            <NavLink to="/dashboard/institucional/departamentos" className={({ isActive }) => `sidebar-sublink ${isActive ? 'activo-sub' : ''}`}>
              Departamentos
            </NavLink>
            <NavLink to="/dashboard/institucional/consejo" className={({ isActive }) => `sidebar-sublink ${isActive ? 'activo-sub' : ''}`}>
              Consejo de Dirección
            </NavLink>
            {/* Aquí agregarás Centros y FEU cuando las crees */}
          </div>
        )}
      </div>

      </nav>

      {/* Perfil del Usuario y Logout */}
      <div className="sidebar-footer">
        <div className="sidebar-usuario">
          <div className="avatar">{user?.username?.charAt(0).toUpperCase() || 'U'}</div>
          <div className="info">
            <span className="nombre">{user?.username || 'Usuario'}</span>
            <span className="rol">{user?.rol === 'admin' ? 'Administrador' : 'Editor'}</span>
          </div>
        </div>
        
        <button className="btn-logout-sidebar" onClick={() => { logout(); navigate('/login'); }}>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}