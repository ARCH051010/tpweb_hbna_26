import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import "./event-item.css";

export default function EventItem({ evento }) {
  
  // Formatear fecha
  const formatearFecha = (fechaString) => {
    if (!fechaString) return { dia: "--", mes: "---" };
    const fecha = new Date(fechaString);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    const mes = meses[fecha.getMonth()];
    return { dia, mes };
  };

  const { dia, mes } = formatearFecha(evento.fecha_evento);

  return (
    <div className="event-item">
      {/* Bloque de fecha (Izquierda) */}
      <div className="event-date-block">
        <span className="event-day">{dia}</span>
        <span className="event-month">{mes}</span>
      </div>
      
      {/* Detalles (Derecha) */}
      <div className="event-details">
        <h4 className="event-title">{evento.titulo}</h4>
        <div className="event-meta">
          <span><FontAwesomeIcon icon={faClock} /> Todo el día</span>
          <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {evento.lugar}</span>
        </div>
      </div>
    </div>
  );
}