import { useState, useEffect } from "react";
import UsuariosTable from "../../components/tablas/tablaUsuarios/tablaUsuario";
import { 
  obtenerEditores, crearEditor, eliminarEditor, actualizarEditor,
  obtenerAdministradores, crearAdministrador, eliminarAdministrador, actualizarAdministrador
} from "../../services/usuarioService";
import { useAuth } from "../../context/AuthContext";

export default function UsuariosPage({ tipo }) {
  const { user } = useAuth();
  const esEditor = tipo === 'editores';
  
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [itemEditando, setItemEditando] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const datos = esEditor ? await obtenerEditores() : await obtenerAdministradores();
      setUsuarios(datos);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarDatos(); }, [tipo]);

  const handleGuardar = async (formData) => {
    const { confirmPassword, ...datosLimpios } = formData;
    try {
      if (itemEditando) {
        if (esEditor) await actualizarEditor(itemEditando.ci, datosLimpios);
        else await actualizarAdministrador(itemEditando.ci, datosLimpios);
      } else {
        if (esEditor) await crearEditor(datosLimpios);
        else await crearAdministrador(datosLimpios);
      }
      setItemEditando(null);
      setIsModalOpen(false);
      cargarDatos();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleEliminar = async (ci) => {
    if (!window.confirm("¿Seguro que quieres eliminar a este usuario?")) return;
    try {
      if (esEditor) await eliminarEditor(ci);
      else await eliminarAdministrador(ci);
      cargarDatos();
    } catch (error) {
      alert("No se pudo eliminar.");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="dashboard-title" style={{ margin: 0 }}>
          Gestión de {esEditor ? 'Editores' : 'Administradores'}
        </h1>
        <button onClick={() => { setItemEditando(null); setIsModalOpen(true); }} className="btn-success">
          + Nuevo {esEditor ? 'Editor' : 'Admin'}
        </button>
      </div>

      <UsuariosTable 
        usuarios={usuarios} 
        vistaActual={tipo} 
        onEliminar={handleEliminar} 
        onEditar={(u) => { setItemEditando(u); setIsModalOpen(true); }} 
        currentUsername={user?.username} 
        cargando={cargando} 
      />

      {/* 
      <UsuarioModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onGuardar={handleGuardar} 
        itemEditando={itemEditando}
        tipo={tipo}
      /> 
      */}
    </div>
  );
}