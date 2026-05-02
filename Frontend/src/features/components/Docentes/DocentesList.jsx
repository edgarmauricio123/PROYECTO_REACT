import { useState, useEffect } from "react";
import "../Docentes/DocentesList.css";

const API = "http://localhost:8080/docentes";

function DocentesList({ refresh, onEditar }) {
  const [docentes, setDocentes] = useState([]);
  const [viewing, setViewing] = useState(null);
  const [eliminarConfirm, setEliminarConfirm] = useState(null);

  useEffect(() => {
    fetchDocentes();
  }, [refresh]);

  const fetchDocentes = async () => {
    const res = await fetch(`${API}/traer-docentes`);
    const data = await res.json();
    setDocentes(data);
  };

  const handleEliminar = async () => {
    const res = await fetch(`${API}/eliminar-docentes/${eliminarConfirm}`, { method: "DELETE" });
    if (res.ok) {
      setEliminarConfirm(null);
      fetchDocentes();
    } else {
      alert("Error al eliminar");
      setEliminarConfirm(null);
    }
  };

  return (
    <div className="contentdashboard">
      <table
        className="table"
        style={{  borderRadius: "20px 20px 20px 20px" }}
      >
        <thead className="table-light">
          <tr>
            <th style={{backgroundColor: "#6366f1"}} scope="col">Nombre</th>
            <th style={{backgroundColor: "#6366f1"}} scope="col">Apellido</th>
            <th style={{backgroundColor: "#6366f1"}} scope="col">Teléfono</th>
            <th style={{backgroundColor: "#6366f1"}} scope="col">Email</th>
            <th style={{backgroundColor: "#6366f1"}} scope="col">Especialidad</th>
            <th style={{backgroundColor: "#6366f1"}} scope="col">Imagen</th>
            <th style={{backgroundColor: "#6366f1"}} scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {docentes.map((d) => (
            <tr key={d.id}>
              <td>{d.nombre}</td>
              <td>{d.apellido}</td>
              <td>{d.telefono}</td>
              <td>{d.email}</td>
              <td>{d.especialidad}</td>
              <td>
                {d.imagenURL && (
                  <img src={d.imagenURL} alt={d.nombre} className="img-docente" />
                )}
              </td>
              <td>
                <button className="btn btn-view" onClick={() => setViewing(d)} title="Ver">
                  <i className="bi bi-eye"></i>
                </button>
                <button className="btn btn-edit" onClick={() => onEditar(d)} title="Editar">
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-delete" onClick={() => setEliminarConfirm(d.id)} title="Eliminar">
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewing && (
        <div className="modal-overlay" onClick={() => setViewing(null)}>
          <div className="modal-content modal-view" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setViewing(null)}>
              <i className="bi bi-x-lg"></i>
            </button>
            <h2>Detalles del Docente</h2>
            <div className="modal-body">
              {viewing.imagenURL && (
                <img src={viewing.imagenURL} alt={viewing.nombre} className="modal-img" />
              )}
              <p><strong>Nombre:</strong> {viewing.nombre}</p>
              <p><strong>Apellido:</strong> {viewing.apellido}</p>
              <p><strong>Email:</strong> {viewing.email}</p>
              <p><strong>Teléfono:</strong> {viewing.telefono}</p>
              <p><strong>Especialidad:</strong> {viewing.especialidad}</p>
            </div>
          </div>
        </div>
      )}

      {eliminarConfirm && (
        <div className="modal-overlay" onClick={() => setEliminarConfirm(null)}>
          <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-confirm-icon">
              <i className="bi bi-trash"></i>
            </div>
            <h2>¿Eliminar docente?</h2>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-confirm-buttons">
              <button className="btn-modal btn-modal-no" onClick={() => setEliminarConfirm(null)}>
                No
              </button>
              <button className="btn-modal btn-modal-yes" onClick={handleEliminar}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocentesList;
