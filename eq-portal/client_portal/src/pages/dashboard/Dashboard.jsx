// Componentes
import DashboardTabs from "../dashboard/DashBoardTabs";
import UsuarioForm from "../../components/formularios/UsuarioForm";
import UsuariosTable from "../../components/tablas/tablaUsuarios/tablaUsuario";
import NoticiaForm from "../../components/formularios/NoticiForm";
import NoticiaTable from "../../components/tablas/tablasNoticias/NoticiaTable";
import EventoForm from "../../components/formularios/Evento";
import EventoTable from "../../components/tablas/tablaEventos/EventoTable";
import Sidebar from "../dashboard/SideBar";

// Estilos
import "./dashboard.css";

// Contexto y hooks de react
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

// Servicios para obtener, crear y eliminar usuarios (editores y administradores)
import { 
  obtenerEditores, crearEditor, eliminarEditor,
  obtenerAdministradores, crearAdministrador, eliminarAdministrador
} from "../../services/usuarioService";

import { 
  obtenerNoticias, 
  crearNoticiaAdmin, 
  eliminarNoticiaAdmin 
} from "../../services/noticiaService";

import {
  obtenerEventos, 
  crearEventoAdmin, 
  eliminarEventoAdmin 
} from "../../services/eventoService";

export default function Dashboard() {
  
  // Contexto de autenticación para obtener el usuario actual
  const { user } = useAuth();

  // Si es admin, inicia en 'editores'. Si es editor, inicia en 'noticias'.
  const [vistaActual, setVistaActual] = useState(user?.rol === 'admin' ? 'editores' : 'noticias');

  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [itemEditando, setItemEditando] = useState(null);

  // Función genérica para cargar datos según la vista
    const cargarDatos = async () => {
    try {
      setCargando(true);
      setErrorMsg("");
      let resultado = [];
      
      if (vistaActual === 'editores') {
        resultado = await obtenerEditores();
      } else if (vistaActual === 'admins') {
        resultado = await obtenerAdministradores(); 
      } else if (vistaActual === 'noticias') {
        const resNoticias = await obtenerNoticias(1);
        resultado = resNoticias.noticias;
      } else if (vistaActual === 'eventos') {
        resultado = await obtenerEventos();
      }
      
      setDatos(resultado);
    } catch (error) {
      setErrorMsg("Error al cargar los datos.");
    } finally {
      setCargando(false);
    }
  };

  // Cargar datos cada vez que cambia la vista actual
  useEffect(() => {
    cargarDatos();
  }, [vistaActual]);

  // Manejar Creación
  const handleGuardar = async (formData, archivoImagen = null) => {
    setErrorMsg("");
    try {
      // 🚨 LIMPIAMOS EL CONFIRM PASSWORD SIEMPRE
      const { confirmPassword, ...datosLimpios } = formData;

      if (itemEditando) {
        // MODO EDICIÓN
        if (vistaActual === 'editores') {
          await actualizarEditor(itemEditando.ci, datosLimpios);
        } else if (vistaActual === 'admins') {
          await actualizarAdministrador(itemEditando.ci, datosLimpios);
        } else if (vistaActual === 'noticias') {
          await actualizarNoticiaAdmin(itemEditando.id, datosLimpios, archivoImagen);
        } else if (vistaActual === 'eventos') {
          await actualizarEventoAdmin(itemEditando.id, datosLimpios);
        }
      } else {
        // MODO CREACIÓN
        if (vistaActual === 'editores') {
          await crearEditor(datosLimpios); // <-- Enviamos los datos limpios
        } else if (vistaActual === 'admins') {
          await crearAdministrador(datosLimpios); // <-- Enviamos los datos limpios
        } else if (vistaActual === 'noticias') {
          await crearNoticiaAdmin(datosLimpios, archivoImagen);
        } else if (vistaActual === 'eventos') {
          await crearEventoAdmin(datosLimpios);
        }
      }
      
      setItemEditando(null); 
      cargarDatos(); 
      return true;
    } catch (error) {
      // 🚨 IMPRIMIMOS EL ERROR REAL DE DJANGO EN LA CONSOLA
      console.error("Detalle del error 400:", error.response?.data);
      
      let mensajeError = "Error al guardar.";
      if (error.response?.data) {
        const primerCampo = Object.keys(error.response.data)[0];
        const detalleError = error.response.data[primerCampo];
        mensajeError = `Error en ${primerCampo}: ${Array.isArray(detalleError) ? detalleError[0] : detalleError}`;
      }
      setErrorMsg(mensajeError);
      return false;
    }
  };

  // Función para cancelar la edición
  const cancelarEdicion = () => {
    setItemEditando(null);
  };

  // Al cambiar de pestaña, cancelamos cualquier edición en curso
  const handleCambiarVista = (nuevaVista) => {
    setVistaActual(nuevaVista);
    setItemEditando(null);
  };


  // Manejar Eliminación
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este registro?")) return;
    try {
      if (vistaActual === 'usuarios') {
        await eliminarEditor(id); // Aquí id es el CI
      } else if (vistaActual === 'noticias') {
        await eliminarNoticiaAdmin(id);
      } else if (vistaActual === 'eventos') {
        await eliminarEventoAdmin(id);
      }
      cargarDatos();
    } catch (error) {
      alert("No se pudo eliminar.");
    }
  };

  // Función para renderizar el formulario correspondiente según la vista actual
  const renderizarFormulario = () => {
    if (vistaActual === 'editores' || vistaActual === 'admins') {
      return <UsuarioForm vistaActual={vistaActual} onGuardar={handleGuardar} itemEditando={itemEditando} onCancelar={cancelarEdicion} />;
    }
    if (vistaActual === 'noticias') return <NoticiaForm onGuardar={handleGuardar} itemEditando={itemEditando} onCancelar={cancelarEdicion} />;
    if (vistaActual === 'eventos') return <EventoForm onGuardar={handleGuardar} itemEditando={itemEditando} onCancelar={cancelarEdicion} />;
  };

  // función para renderizar la tabla
  const renderizarTabla = () => {
    if (vistaActual === 'editores' || vistaActual === 'admins') {
      return <UsuariosTable usuarios={datos} vistaActual={vistaActual} onEliminar={handleEliminar} onEditar={setItemEditando} currentUsername={user?.username} cargando={cargando} />;
    }
    if (vistaActual === 'noticias') return <NoticiaTable noticias={datos} onEliminar={handleEliminar} onEditar={setItemEditando} cargando={cargando} />;
    if (vistaActual === 'eventos') return <EventoTable eventos={datos} onEliminar={handleEliminar} onEditar={setItemEditando} cargando={cargando} />;
  };

  return (
    <div className="dashboard-layout">
      {/* BARRA LATERAL */}
      <Sidebar />

      {/* CONTENIDO PRINCIPAL */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          
          <header className="dashboard-header">
            <p className="dashboard-eyebrow">Administración</p>
            <h1 className="dashboard-title">Panel de Administración</h1>
            <p className="dashboard-subtitle">
              Bienvenido de nuevo, <strong>{user?.username || 'Usuario'}</strong>.
            </p>
          </header>

          {errorMsg && <div style={{ color: 'red', marginBottom: '1rem', fontWeight: 'bold' }}>{errorMsg}</div>}

          <DashboardTabs vistaActual={vistaActual} onChangeVista={handleCambiarVista} />

          <div className="dashboard-grid">
            {renderizarFormulario()}
            {renderizarTabla()}
          </div>
        </div>
      </main>
    </div>
  );
}