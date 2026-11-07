import { useState, useEffect } from "react";
import EventoTable from "../../components/tablas/tablaEventos/EventoTable"; 
import { 
  obtenerEventos, 
  crearEventoAdmin, 
  eliminarEventoAdmin, 
  actualizarEventoAdmin 
} from "../../services/eventoService";
// import EventoModal from "../../../components/modales/EventoModal"; // 

export default function EventosPage() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [itemEditando, setItemEditando] = useState(null);
  
  // ESTADO PARA CONTROLAR EL MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cargarEventos = async () => {
    try {
      setCargando(true);
      const datos = await obtenerEventos();
      setEventos(datos);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const handleGuardar = async (formData) => {
    try {
      if (itemEditando) {
        // MODO EDICIÓN
        await actualizarEventoAdmin(itemEditando.id, formData);
      } else {
        // MODO CREACIÓN
        await crearEventoAdmin(formData);
      }
      
      setItemEditando(null);
      setIsModalOpen(false); // Cerramos el modal al guardar
      cargarEventos(); // Recargamos la tabla
      return true;
    } catch (error) {
      // Atrapamos el error de Django y lo mostramos
      let mensajeError = "Error al guardar el evento.";
      if (error.response?.data) {
        const primerCampo = Object.keys(error.response.data)[0];
        const detalleError = error.response.data[primerCampo];
        mensajeError = `Error en ${primerCampo}: ${Array.isArray(detalleError) ? detalleError[0] : detalleError}`;
      }
      alert(mensajeError);
      return false;
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este evento?")) return;
    
    try {
      await eliminarEventoAdmin(id);
      cargarEventos();
    } catch (error) {
      alert("No se pudo eliminar el evento.");
    }
  };

  const abrirModalCrear = () => {
    setItemEditando(null);
    setIsModalOpen(true);
  };

  const abrirModalEditar = (evento) => {
    setItemEditando(evento);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* CABECERA DE LA PÁGINA CON EL BOTÓN DE CREAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="dashboard-title" style={{ margin: 0 }}>Gestión de Eventos</h1>
        <button onClick={abrirModalCrear} className="btn-success">
          + Crear Evento
        </button>
      </div>

      {/* TABLA A TODO EL ANCHO */}
      <EventoTable 
        eventos={eventos} 
        onEliminar={handleEliminar} 
        onEditar={abrirModalEditar} 
        cargando={cargando} 
      />

      {/* AQUÍ IRÁ EL MODAL DE TUS COMPAÑEROS EN EL FUTURO */}
      {/* 
      <EventoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onGuardar={handleGuardar} 
        itemEditando={itemEditando} 
      /> 
      */}
    </>
  );
}