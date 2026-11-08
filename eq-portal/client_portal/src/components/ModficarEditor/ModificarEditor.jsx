import React, { useState } from 'react';
import './ModificarEditor.css';

const ModificarEditor = ({ isOpen, onClose, onGuardar, datosIniciales = {} }) => {
  //  si vienen "datosIniciales" (de la tabla), los usa. Si no, deja vacío.
  const [datos, setDatos] = useState({
    ci: datosIniciales.ci || '',
    nombre: datosIniciales.nombre || '',
    apellido: datosIniciales.apellido || '',
    password: datosIniciales.password || ''
  });

  if (!isOpen) return null;

  const manejarCambio = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault(); 

    if (!datos.ci || !datos.nombre || !datos.apellido || !datos.password) {
      alert("Error al publicar: Existen campos vacíos");
      return; 
    }

    onGuardar(datos);
    alert("Guardado Satisfactoriamente");
    onClose(); 
  };

  return (
    <div className="modal-fondo">
      <div className="modal-contenido">
        <h2 className="modal-titulo">Modificar Editor</h2>
        
        <form onSubmit={manejarEnvio}>
          <div className="form-grupo">
            <label>CI:</label>
            <input type="text" name="ci" value={datos.ci} onChange={manejarCambio} />
          </div>
          <div className="form-grupo">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={datos.nombre} onChange={manejarCambio} />
          </div>
          <div className="form-grupo">
            <label>Apellido:</label>
            <input type="text" name="apellido" value={datos.apellido} onChange={manejarCambio} />
          </div>
          <div className="form-grupo">
            <label>Contraseña:</label>
            <input type="password" name="password" value={datos.password} onChange={manejarCambio} />
          </div>
          
          <div className="modal-botones">
            <button type="submit" className="btn-guardar">Guardar Cambios</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModificarEditor;