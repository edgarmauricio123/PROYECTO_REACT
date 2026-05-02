import { useState, useEffect, useRef } from "react";
import "../alumnos/AlumnosForm.css";

const API = "http://localhost:8080/alumnos";

function AlumnosForm({ alumnoEditar, onFinish, onCancel }) {
  const [form, setForm] = useState({
    id: "",
    numeroControl: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    carrera: "",
    imagenURL: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    if (alumnoEditar) {
      setForm({
        id: alumnoEditar.id || "",
        numeroControl: alumnoEditar.numeroControl || "",
        nombre: alumnoEditar.nombre || "",
        apellido: alumnoEditar.apellido || "",
        telefono: alumnoEditar.telefono || "",
        email: alumnoEditar.email || "",
        carrera: alumnoEditar.carrera || "",
        imagenURL: alumnoEditar.imagenURL || "",
      });
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [alumnoEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarForm = () => {
    setForm({
      id: "",
      numeroControl: "",
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      carrera: "",
      imagenURL: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (alumnoEditar) {
      setShowConfirm(true);
    } else {
      ejecutarCrear();
    }
  };

  const ejecutarCrear = async () => {
    const res = await fetch(`${API}/insertar-alumnos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccessMsg("Alumno agregado correctamente");
      setShowSuccess(true);
      limpiarForm();
      onFinish();
    } else {
      alert("Error al guardar el alumno");
    }
  };

  const ejecutarActualizar = async () => {
    setShowConfirm(false);
    // const res = await fetch(`${API}/editar-alumnos/${alumnoEditar.id}`, {
        const res = await fetch(`${API}/editar-alumnos/${form.id}`, {

      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccessMsg("Se ha actualizado correctamente");
      setShowSuccess(true);
      limpiarForm();
      onFinish();
    } else {
      alert("Error al actualizar");
    }
  };

  const handleCancel = () => {
    limpiarForm();
    if (onCancel) onCancel();
  };

  const isEditing = alumnoEditar !== null;

  return (
    <div className="alumnos-form-container" ref={formRef}>
      <div className="alumnos-content">
        <div className="alumnos-text">
          {/* {isEditing ? "Registro de Alumnos" :"Editar Alumno" } */}
          {isEditing ? "Editar Alumno" : "Registro de Alumnos"}
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            <input
              required
              type="text"
              className="input"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
            <span>Nombre</span>
          </label>

          <label>
            <input
              required
              type="text"
              className="input"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
            />
            <span>Apellidos</span>
          </label>

          <label>
            <input
              required
              type="text"
              className="input"
              name="numeroControl"
              value={form.numeroControl}
              onChange={handleChange}
            />
            <span>Número de control</span>
          </label>

          <label>
            <input
              required
              type="tel"
              className="input"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
            />
            <span>Teléfono</span>
          </label>

          <label>
            <input
              required
              type="email"
              className="input"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <span>Email</span>
          </label>

          <label>
            <select
              required
              className="input"
              name="carrera"
              value={form.carrera}
              onChange={handleChange}
            >
              <option value="" disabled hidden></option>
              <option value="Ingeniería en Sistemas Computacionales">Ingeniería en Sistemas Computacionales</option>
              <option value="Ingeniería Civil">Ingeniería Civil</option>
              <option value="Ingeniería en Mecatrónica">Ingeniería en Mecatrónica</option>
              <option value="Ingeniería Industrial">Ingeniería Industrial</option>
              <option value="Licenciatura en Administración">Licenciatura en Administración</option>
              <option value="Licenciatura en Arquitectura">Licenciatura en Arquitectura</option>
              <option value="Licenciatura en Gestion Empresarial">Licenciatura en Gestion Empresarial</option>
            </select>
            <span>Carrera</span>
          </label>

          <label>
            <input
              type="text"
              className="input"
              name="imagenURL"
              value={form.imagenURL}
              onChange={handleChange}
            />
            <span>Imagen URL</span>
          </label>

          <div className="form-buttons">
            <button className="submit" type="submit">
              {isEditing ? "Actualizar" : "Registrar Alumno"}
            </button>
            {isEditing && (
              <button className="btn-cancel" type="button" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-confirm-icon">
              <i className="bi bi-pencil"></i>
            </div>
            <h2>¿Está seguro de actualizar?</h2>
            <p>Se actualizarán los datos del alumno seleccionado.</p>
            <div className="modal-confirm-buttons">
              <button className="btn-modal btn-modal-no" onClick={() => setShowConfirm(false)}>
                No
              </button>
              <button className="btn-modal btn-modal-yes" onClick={ejecutarActualizar}>
                Sí, actualizar
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="modal-overlay" onClick={() => setShowSuccess(false)}>
          <div className="modal-content modal-success" onClick={(e) => e.stopPropagation()}>
            <div className="modal-success-icon">
              <i className="bi bi-check-lg"></i>
            </div>
            <h2>¡Éxito!</h2>
            <p>{successMsg}</p>
            <button className="btn-modal btn-modal-ok" onClick={() => setShowSuccess(false)}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlumnosForm;
