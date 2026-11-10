import { useState, useEffect } from "react";
import { obtenerFEU, crearFEU, actualizarFEU, eliminarFEU } from "../../services/institucionalService";
import FeuForm from "../../components/feu-form/feu-form"; 

export default function FeuAdminPage() {
  const [miembros, setMiembros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);

  
  useEffect(() => {
    let activo = true; 

    const traerDatos = async () => {
      try {
        const datos = await obtenerFEU();
        if (activo) {
          setMiembros(Array.isArray(datos) ? datos : []);
        }
      } catch (error) {
        console.error("Error al cargar FEU", error);
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    traerDatos();

    return () => {
      activo = false;
    };
  }, []);

  //  Función para recargar la tabla cuando guardamos o eliminamos
  const recargarTabla = async () => {
    try {
      const datos = await obtenerFEU();
      setMiembros(Array.isArray(datos) ? datos : []);
    } catch (error) {
      console.error("Error al recargar", error);
    }
  };

  // Función para guardar
  const handleGuardar = async (datos) => {
    try {
      if (itemEditando) {
        await actualizarFEU(itemEditando.id, datos);
      } else {
        await crearFEU(datos);
      }
      setItemEditando(null);
      setIsModalOpen(false);
      recargarTabla(); 
      return true;
    } catch (error) {
      console.error("Error al guardar", error);
      alert("Error al guardar el miembro de la FEU");
      return false;
    }
  };

  //  Función para eliminar
  const handleEliminar = async (id) => {
    if (window.confirm("¿Desea realmente eliminar a este miembro de la FEU?")) {
      try {
        await eliminarFEU(id);
        recargarTabla(); // Usamos la nueva función
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 className="dashboard-title">Gestión de Miembros de la FEU</h1>
        <button 
          onClick={() => { setItemEditando(null); setIsModalOpen(true); }}
          style={{ padding: '10px 20px', backgroundColor: '#007a3d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Nuevo Miembro
        </button>
      </div>

      {cargando ? <p>Cargando datos...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'left' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #ccc' }}>Nombre Completo</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ccc' }}>Cargo</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #ccc' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {miembros.length === 0 ? (
              <tr><td colSpan="3" style={{ padding: '20px', textAlign: 'center' }}>No hay miembros registrados.</td></tr>
            ) : (
              miembros.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{m.nombre} {m.apellidos}</td>
                  <td style={{ padding: '12px' }}>{m.cargo}</td>
                  <td style={{ padding: '12px' }}>
                    <button 
                      onClick={() => { setItemEditando(m); setIsModalOpen(true); }} 
                      style={{ marginRight: '10px', cursor: 'pointer', padding: '5px 10px' }}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleEliminar(m.id)} 
                      style={{ color: 'white', backgroundColor: '#d32f2f', padding: '5px 10px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <h2 className="modal-titulo">{itemEditando ? "Modificar Miembro" : "Registrar Miembro"}</h2>
            <FeuForm 
              onGuardar={handleGuardar} 
              onCancelar={() => setIsModalOpen(false)} 
              itemEditando={itemEditando} 
            />
          </div>
        </div>
      )}
    </div>
  );
}