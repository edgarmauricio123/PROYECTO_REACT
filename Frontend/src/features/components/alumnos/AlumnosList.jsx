import { useState, useEffect } from "react";
import "../alumnos/AlumnosList.css";

const API = "http://localhost:8080/alumnos";

function AlumnosList({ refresh, onEditar }) {
  const [alumnos, setAlumnos] = useState([]);
  const [viewing, setViewing] = useState(null);
  const [eliminarConfirm, setEliminarConfirm] = useState(null);

  useEffect(() => {
    fetchAlumnos();
  }, [refresh]);

  const fetchAlumnos = async () => {
    const res = await fetch(`${API}/traer-alumnos`);
    const data = await res.json();
    setAlumnos(data);
  };

  const handleEliminar = async () => {
    const res = await fetch(`${API}/eliminar-alumnos/${eliminarConfirm}`, { method: "DELETE" });
    if (res.ok) {
      setEliminarConfirm(null);
      fetchAlumnos();
    } else {
      alert("Error al eliminar");
      setEliminarConfirm(null);
    }
  };

  return (
    <div className="contentdashboard">
      <table
        className="table"
        style={{ backgroundColor: "", borderRadius: "10px 20px 20px 20px" }}
      >
        <thead className="table-light">
          <tr>
            <th style={{ backgroundColor: "#6366f1" }} scope="col">No. Control</th>
            <th style={{ backgroundColor: "#6366f1" }} scope="col">Nombre</th>
            <th style={{ backgroundColor: "#6366f1" }} scope="col">Apellidos</th>
            <th style={{ backgroundColor: "#6366f1" }} scope="col">Email</th>
            <th style={{ backgroundColor: "#6366f1" }} scope="col">Teléfono</th>
            <th style={{ backgroundColor: "#6366f1" }} scope="col">Carrera</th>
            <th style={{ backgroundColor: "#6366f1" }} scope="col">Imagen</th>
            <th style={{ backgroundColor: "#6366f1" }} scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((a) => (
            <tr key={a.id}>
              <td>{a.numeroControl}</td>
              <td>{a.nombre}</td>
              <td>{a.apellido}</td>
              <td>{a.email}</td>
              <td>{a.telefono}</td>
              <td>{a.carrera}</td>
              <td>
                {a.imagenURL && (
                  <img src={a.imagenURL} alt={a.nombre} className="img-alumno" />
                )}
              </td>
              <td>
                <button className="btn btn-view" onClick={() => setViewing(a)} title="Ver">
                  <i className="bi bi-eye"></i>
                </button>
                <button className="btn btn-edit" onClick={() => onEditar(a)} title="Editar">
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-delete" onClick={() => setEliminarConfirm(a.id)} title="Eliminar">
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
            <h2>Detalles del Alumno</h2>
            <div className="modal-body">
              {viewing.imagenURL && (
                <img src={viewing.imagenURL} alt={viewing.nombre} className="modal-img" />
              )}
              <p><strong>Número de Control:</strong> {viewing.numeroControl}</p>
              <p><strong>Nombre:</strong> {viewing.nombre}</p>
              <p><strong>Apellidos:</strong> {viewing.apellido}</p>
              <p><strong>Email:</strong> {viewing.email}</p>
              <p><strong>Teléfono:</strong> {viewing.telefono}</p>
              <p><strong>Carrera:</strong> {viewing.carrera}</p>
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
            <h2>¿Eliminar alumno?</h2>
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

export default AlumnosList;
