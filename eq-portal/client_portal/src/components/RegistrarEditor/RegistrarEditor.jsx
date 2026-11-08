//  Importo React y el "hook" useState para manejar los datos que cambian
import React, { useState } from 'react';
//  Importo los estilos CSS que le dan forma a la ventana
import './RegistrarEditor.css';

//  Declaramos el componente. Recibe 3 propiedades (props): isOpen, onClose, onGuardar
const RegistrarEditor = ({ isOpen, onClose, onGuardar }) => {
  
  //  Creamos una "caja de memoria" (estado) con los 4 campos vacíos. 
  // 'datos' guarda la información, 'setDatos' es la función para actualizarla.
  const [datos, setDatos] = useState({ ci: '', nombre: '', apellido: '', password: '' });

  //  Si la propiedad isOpen es falsa, el componente no dibuja nada (la ventana está cerrada)
  if (!isOpen) return null;

  //  Función que se ejecuta cada vez que el usuario escribe una letra en un campo
  const manejarCambio = (e) => {
    setDatos({
      ...datos, // Copia los datos que ya estaban
      [e.target.name]: e.target.value // Actualiza solo el campo que se está escribiendo
    });
  };

  //  Función que se ejecuta al presionar el botón "Registrar"
  const manejarEnvio = (e) => {
    e.preventDefault(); // Evita que la página web se recargue al enviar el formulario

    //  Validación: Si alguno de los 4 campos está vacío, muestra error y detiene el proceso
    if (!datos.ci || !datos.nombre || !datos.apellido || !datos.password) {
      alert("Error al publicar: Existen campos vacíos");
      return; // El 'return' hace que la función se detenga aquí
    }

    //  Si todo está lleno, envía los datos al componente padre y muestra éxito
    onGuardar(datos);
    alert("Guardado Satisfactoriamente");
    onClose(); // Cierra la ventana
  };

  // Aquí empieza lo que se ve en pantalla (JSX)
  return (
    <div className="modal-fondo">
      <div className="modal-contenido">
        <h2 className="modal-titulo">Registrar Nuevo Editor</h2>
        
        <form onSubmit={manejarEnvio}>
          {/* Campo CI */}
          <div className="form-grupo">
            <label>CI:</label>
            <input type="text" name="ci" value={datos.ci} onChange={manejarCambio} />
          </div>
          {/* Campo Nombre */}
          <div className="form-grupo">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={datos.nombre} onChange={manejarCambio} />
          </div>
          {/* Campo Apellido */}
          <div className="form-grupo">
            <label>Apellido:</label>
            <input type="text" name="apellido" value={datos.apellido} onChange={manejarCambio} />
          </div>
          {/* Campo Contraseña */}
          <div className="form-grupo">
            <label>Contraseña:</label>
            <input type="password" name="password" value={datos.password} onChange={manejarCambio} />
          </div>
          
          {/* Botones */}
          <div className="modal-botones">
            <button type="submit" className="btn-guardar">Registrar Editor</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarEditor; // Exporta el componente para que otros archivos puedan usarlo