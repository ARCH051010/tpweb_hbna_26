import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import EventItem from './EventCard'; 
import "./upcoming-events.css";

export default function UpcomingEventsCard({ eventos }) {
  return (
    <div className="chart-card events-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Próximos eventos</h3>
          <p className="chart-subtitle">Actividades programadas para la comunidad.</p>
        </div>
        <div className="events-header-icon">
          <FontAwesomeIcon icon={faCalendarAlt} />
        </div>
      </div>

      <div className="events-list">
        {!eventos || eventos.length === 0 ? (
          <p className="no-events">No hay eventos próximos programados.</p>
        ) : (
          // Renderizamos el componente EventItem por cada evento
          eventos.map((evento) => (
            <EventItem key={evento.id} evento={evento} />
          ))
        )}
      </div>
    </div>
  );
}