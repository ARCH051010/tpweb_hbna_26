import { useState, useEffect } from "react";
import NoticiaTable from "../../components/tablas/tablasNoticias/NoticiaTable";
import { obtenerNoticias, crearNoticiaAdmin, eliminarNoticiaAdmin, actualizarNoticiaAdmin } from "../../services/noticiaService";
// import NoticiaModal from "../../../components/modales/NoticiaModal"; // <-- Lo importarán tus compañeros

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [itemEditando, setItemEditando] = useState(null);
  
  // ESTADO PARA CONTROLAR EL MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cargarNoticias = async () => {
    try {
      setCargando(true);
      const res = await obtenerNoticias(1);
      setNoticias(res.noticias);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarNoticias(); }, []);

  const handleGuardar = async (formData, imagen) => {
    const { confirmPassword, ...datosLimpios } = formData;
    try {
      if (itemEditando) {
        await actualizarNoticiaAdmin(itemEditando.id, datosLimpios, imagen);
      } else {
        await crearNoticiaAdmin(datosLimpios, imagen);
      }
      setItemEditando(null);
      setIsModalOpen(false); // Cerramos el modal al guardar
      cargarNoticias();
      return true;
    } catch (error) {
      return false;
    }
  };

  const abrirModalCrear = () => {
    setItemEditando(null);
    setIsModalOpen(true);
  };

  const abrirModalEditar = (noticia) => {
    setItemEditando(noticia);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* CABECERA DE LA PÁGINA CON EL BOTÓN DE CREAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="dashboard-title" style={{ margin: 0 }}>Gestión de Noticias</h1>
        <button onClick={abrirModalCrear} className="btn-success">
          + Publicar Noticia
        </button>
      </div>

      {/* TABLA A TODO EL ANCHO */}
      <NoticiaTable 
        noticias={noticias} 
        onEliminar={eliminarNoticiaAdmin} 
        onEditar={abrirModalEditar} 
        cargando={cargando} 
      />

      {/* AQUÍ IRÁ EL MODAL DE TUS COMPAÑEROS EN EL FUTURO */}
      {/* 
      <NoticiaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onGuardar={handleGuardar} 
        itemEditando={itemEditando} 
      /> 
      */}
    </>
  );
}