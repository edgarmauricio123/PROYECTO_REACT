import { useState, useEffect } from "react";
import "../Materias/MateriasList.css";

const API = "http://localhost:8080/materias";

function MateriasList({ refresh, onEditar }) {
  const [materias, setMaterias] = useState([]);
  const [viewing, setViewing] = useState(null);
  const [eliminarConfirm, setEliminarConfirm] = useState(null);

  useEffect(() => {
    fetchMaterias();
  }, [refresh]);

  const fetchMaterias = async () => {
    try {
      const res = await fetch(`${API}`);
      if (res.ok) {
        const data = await res.json();
        setMaterias(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error al cargar materias:", error);
    }
  };

  const handleEliminar = async () => {
    try {
      const res = await fetch(`${API}/${eliminarConfirm}`, { method: "DELETE" });
      if (res.ok) {
        setEliminarConfirm(null);
        fetchMaterias();
      } else {
        alert("Error al eliminar");
        setEliminarConfirm(null);
      }
    } catch (error) {
      console.error("Error al eliminar materia:", error);
      setEliminarConfirm(null);
    }
  };

  return (
    <div className="contentdashboard">
      <table
        className="table"
        style={{ backgroundColor: "#6366f1", borderRadius: "10px 20px 0 0" }}
      >
        <thead className="table-light">
          <tr>
            <th style={{ backgroundColor: "#6366f1" }} scope="col">Créditos</th>
            <th style={{ backgroundColor: "#6366f1" }} scope="col">Semestre</th>
            <th style={{ backgroundColor: "#6366f1" }} scope="col">Nombre</th>
            <th style={{ backgroundColor: "#6366f1" }} scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((m) => (
            <tr key={m.id}>
              <td>{m.creditos}</td>
              <td>{m.semestre ?? "N/A"}</td>
              <td>{m.nombre}</td>
              <td>
                <button className="btn btn-view" onClick={() => setViewing(m)} title="Ver">
                  <i className="bi bi-eye"></i>
                </button>
                <button className="btn btn-edit" onClick={() => onEditar(m)} title="Editar">
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-delete" onClick={() => setEliminarConfirm(m.id)} title="Eliminar">
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
            <h2>Detalles de la Materia</h2>
            <div className="modal-body">
              <p><strong>Id:</strong> {viewing.id}</p>
              <p><strong>Nombre:</strong> {viewing.nombre}</p>
              <p><strong>Créditos:</strong> {viewing.creditos}</p>
              <p><strong>Semestre:</strong> {viewing.semestre ?? "N/A"}</p>
              {viewing.docente && <p><strong>Docente:</strong> {viewing.docente.nombre}</p>}
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
            <h2>¿Eliminar materia?</h2>
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

export default MateriasList;
