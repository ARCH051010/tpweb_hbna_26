export default function EventoTable({ eventos, onEliminar, cargando, onEditar }) {
  return (
    <section className="dashboard-card">
      <h2>Gestión de Eventos</h2>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Evento</th>
              <th>Lugar</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr><td colSpan="4" style={{ textAlign: 'center' }}>Cargando...</td></tr>
            ) : eventos.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center' }}>No hay eventos.</td></tr>
            ) : (
              eventos.map((e) => (
                <tr key={e.id}>
                  <td className="fw-semibold">{e.titulo}</td>

                  <td>{e.lugar}</td>

                  <td>{e.fecha_evento}</td>

                  <td>
                    <div className="table-actions">
                      <button onClick={() => onEditar(e)} className="btn-sm btn-outline-success">
                        Editar
                      </button>
                      <button onClick={() => onEliminar(e.id)} className="btn-sm btn-outline-danger">
                        Eliminar
                      </button>
                    </div>
                  </td>
                  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}