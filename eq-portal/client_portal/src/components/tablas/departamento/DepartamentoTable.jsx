export default function DepartamentoTable({ datos, onEditar, onEliminar, cargando }) {
  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Departamento</th>
            <th>Jefe</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cargando ? (
            <tr><td colSpan="3" style={{ textAlign: 'center' }}>Cargando...</td></tr>
          ) : datos.length === 0 ? (
            <tr><td colSpan="3" style={{ textAlign: 'center' }}>No hay departamentos.</td></tr>
          ) : (
            datos.map((d) => (
              <tr key={d.id}>
                <td className="fw-semibold">{d.nombre}</td>
                <td>{d.jefe}</td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => onEditar(d)} className="btn-sm btn-outline-success">Editar</button>
                    <button onClick={() => onEliminar(d.id)} className="btn-sm btn-outline-danger">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}