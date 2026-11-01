import { useState } from "react";

export default function UsuariosTable({ usuarios, vistaActual, onEliminar, currentUsername, cargando, onEditar }) {
  const [search, setSearch] = useState("");

  // Filtrado interno
  const filteredUsers = usuarios.filter((u) => {
    const text = `${u.username} ${u.email} ${u.ci}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <section className="dashboard-card">
      <div className="table-header">
        <div>
          <h2>Lista de {vistaActual === 'editores' ? 'Editores' : 'Administradores'}</h2>
          <p className="dashboard-subtitle" style={{ fontSize: '0.85rem' }}>
            {cargando ? 'Cargando...' : `Mostrando ${filteredUsers.length} registros`}
          </p>
        </div>
        
        <div className="search-input">
          <input 
            type="search" placeholder="Buscar por nombre o CI..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="form-control" 
          />
        </div>
      </div>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>CI</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr><td colSpan="4" style={{ textAlign: 'center' }}>Cargando datos...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center' }}>No hay registros.</td></tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.ci}>
                  <td className="fw-semibold">{u.username}</td>

                  <td>{u.email}</td>

                  <td><span className="badge badge-success">{u.ci}</span></td>

                  <td>
                    <div className="table-actions">
                      <button onClick={() => onEditar(u)} className="btn-sm btn-outline-success">
                        Editar
                      </button>
                      <button onClick={() => onEliminar(u.id)} className="btn-sm btn-outline-danger">
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