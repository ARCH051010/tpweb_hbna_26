import { useAuth } from "../../context/AuthContext";

export default function DashboardTabs({ vistaActual, onChangeVista }) {

  const { user } = useAuth();

  // Para saber si es admin 
  const esAdmin = user?.rol === 'admin';

  return (
    <div className="dashboard-tabs">
      {/* Solo los administradores pueden ver las pestañas de gestión de usuarios */}
      {esAdmin && (
        <>
          <button 
            className={`btn-tab ${vistaActual === 'editores' ? 'activo' : ''}`} 
            onClick={() => onChangeVista('editores')}
          >
            Gestionar Editores
          </button>
          <button 
            className={`btn-tab ${vistaActual === 'admins' ? 'activo' : ''}`} 
            onClick={() => onChangeVista('admins')}
          >
            Gestionar Administradores
          </button>
        </>
      )}

      {/* Todos (Admin y Editor) pueden gestionar contenido */}
      <button 
        className={`btn-tab ${vistaActual === 'noticias' ? 'activo' : ''}`} 
        onClick={() => onChangeVista('noticias')}
      >
        Noticias
      </button>
      <button 
        className={`btn-tab ${vistaActual === 'eventos' ? 'activo' : ''}`} 
        onClick={() => onChangeVista('eventos')}
      >
        Eventos
      </button>
    </div>
  );
}