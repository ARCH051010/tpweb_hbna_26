export default function NoticiaTable({ noticias, onEliminar, cargando, onEditar }) {
  return (
    <section className="dashboard-card">
      <h2>Gestión de Noticias</h2>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr><td colSpan="3" style={{ textAlign: 'center' }}>Cargando...</td></tr>
            ) : noticias.length === 0 ? (
              <tr><td colSpan="3" style={{ textAlign: 'center' }}>No hay noticias.</td></tr>
            ) : (
              noticias.map((n) => (
                <tr key={n.id}>
                  <td className="fw-semibold">{n.titulo}</td>
                  
                  <td>{n.fecha}</td>

                  <td>
                     <div className="table-actions">
                       <button onClick={() => onEditar(n)} className="btn-sm btn-outline-success">
                         Editar
                       </button>
                       <button onClick={() => onEliminar(n.id)} className="btn-sm btn-outline-danger">
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