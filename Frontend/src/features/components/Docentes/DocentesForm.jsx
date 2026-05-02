import { useState, useEffect, useRef } from "react";
import "../Docentes/DocentesForm.css";

const API = "http://localhost:8080/docentes";

function DocentesForm({ docenteEditar, onFinish, onCancel }) {
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    especialidad: "",
    imagenURL: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    if (docenteEditar) {
      setForm({
        id: docenteEditar.id || "",
        nombre: docenteEditar.nombre || "",
        apellido: docenteEditar.apellido || "",
        telefono: docenteEditar.telefono || "",
        email: docenteEditar.email || "",
        especialidad: docenteEditar.especialidad || "",
        imagenURL: docenteEditar.imagenURL || "",
      });
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setForm({
        id: "",
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        especialidad: "",
        imagenURL: "",
      });
    }
  }, [docenteEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarForm = () => {
    setForm({
      id: "",
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      especialidad: "",
      imagenURL: "",
    });
  };
const isFormInvalid =
  !form.nombre.trim() ||
  !form.apellido.trim() ||
  !form.telefono.trim() ||
  !form.email.trim() ||
  !form.especialidad;

  const validarForm = () => {
    const errores = [];
    if (!form.nombre.trim()) errores.push("Nombre");
    if (!form.apellido.trim()) errores.push("Apellido");
    if (!form.telefono.trim()) {
      errores.push("Teléfono");
    } else if (!/^\d{10}$/.test(form.telefono)) {
      errores.push("Teléfono debe tener 10 dígitos numéricos");
    }
    if (!form.email.trim()) {
      errores.push("Email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errores.push("Email inválido");
    }
    if (!form.especialidad) errores.push("Especialidad");
    if (!form.imagenURL.trim()) errores.push("URL de Imagen");

    if (errores.length > 0) {
      alert(
        "Por favor completa los siguientes campos:\n- " + errores.join("\n- "),
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarForm()) return;
    if (docenteEditar) {
      setShowConfirm(true);
    } else {
      ejecutarCrear();
    }
  };

  const ejecutarCrear = async () => {
    const res = await fetch(`${API}/insertar-docentes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccessMsg("Docente agregado correctamente");
      setShowSuccess(true);
      limpiarForm();
      onFinish();
    } else {
      alert("Error al guardar el docente");
    }
  };

  const ejecutarActualizar = async () => {
    setShowConfirm(false);
    const res = await fetch(`${API}/editar-docentes/${docenteEditar.id}`, {
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

  const isEditing = docenteEditar !== null;

  return (
    <div className="docentes-form-container" ref={formRef}>
      <div className="docentes-content">
        <div className="docentes-text">
          {isEditing ? "Editar Docente" : "Registro de Docentes"}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="docentes-field">
            <label className="docentes-label">Nombre</label>
            <input
              required
              type="text"
              className="docentes-input"
              name="nombre"
              value={form.nombre}
              onChange={(e) => {
                const value = e.target.value.replace(
                  /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                  "",
                );
                setForm({ ...form, nombre: value });
              }}
              placeholder="Ingrese su nombre"
            />
          </div>

          <div className="docentes-field">
            <label className="docentes-label">Apellido</label>
            <input
              required
              type="text"
              className="docentes-input"
              name="apellido"
              value={form.apellido}
              onChange={(e) => {
                const value = e.target.value.replace(
                  /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                  "",
                );
                setForm({ ...form, apellido: value });
              }}
              placeholder="Ingrese su apellido"
            />
          </div>

          <div className="docentes-field">
            <label className="docentes-label">Teléfono</label>
            <input
              required
              type="number"
              maxLength={10}
              pattern="\d{10}"
              className="docentes-input"
              name="telefono"
              value={form.telefono}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // solo números
                setForm({ ...form, telefono: value });
              }}
              placeholder="1234567890"
            />
            <span className="docentes-help">Ej: 1234567890</span>
          </div>

          <div className="docentes-field">
            <label className="docentes-label">Email</label>
            <input
              required
              type="email"
              className="docentes-input"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ejemplo@dominio.com"
            />
          </div>

          <div className="docentes-field">
            <label className="docentes-label">Especialidad</label>
            <select
              required
              className="docentes-input"
              name="especialidad"
              value={form.especialidad}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Seleccione una especialidad
              </option>
              <option value="Ingeniería en Sistemas Computacionales">
                Ingeniería en Sistemas Computacionales
              </option>
              <option value="Inteligencia Artificial y Ciencia de Datos">
                Inteligencia Artificial y Ciencia de Datos
              </option>
              <option value="Matemáticas Aplicadas">
                Matemáticas Aplicadas
              </option>
              <option value="Física y Ciencias Naturales">
                Física y Ciencias Naturales
              </option>
              <option value="Administración de Empresas">
                Administración de Empresas
              </option>
              <option value="Contaduría y Finanzas">
                Contaduría y Finanzas
              </option>
              <option value="Derecho y Ciencias Jurídicas">
                Derecho y Ciencias Jurídicas
              </option>
              <option value="Ingeniería Civil y Construcción">
                Ingeniería Civil y Construcción
              </option>
              <option value="Arquitectura y Urbanismo">
                Arquitectura y Urbanismo
              </option>
              <option value="Psicología y Desarrollo Humano">
                Psicología y Desarrollo Humano
              </option>
              <option value="Educación y Pedagogía">
                Educación y Pedagogía
              </option>
              <option value="Comunicación y Medios">
                Comunicación y Medios
              </option>
              <option value="Ingeniería Industrial">
                Ingeniería Industrial
              </option>
              <option value="Mecatrónica y Robótica">
                Mecatrónica y Robótica
              </option>
              <option value="Ciencias Sociales y Humanidades">
                Ciencias Sociales y Humanidades
              </option>
            </select>
          </div>

          <div className="docentes-field">
            <label className="docentes-label">URL de Imagen (opcional)</label>
            <input
              type="url"
              className="docentes-input"
              name="imagenURL"
              value={form.imagenURL}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <button type="submit" className="docentes-button"  disabled={isFormInvalid}>
            {isEditing ? "Actualizar" : "Registrar Docente"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="docentes-button btn-cancel-docente"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div
            className="modal-content modal-confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-confirm-icon">
              <i className="bi bi-pencil"></i>
            </div>
            <h2>¿Está seguro de actualizar?</h2>
            <p>Se actualizarán los datos del docente seleccionado.</p>
            <div className="modal-confirm-buttons">
              <button
                className="btn-modal btn-modal-no"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
              <button
                className="btn-modal btn-modal-yes"
                onClick={ejecutarActualizar}
              >
                Sí, actualizar
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="modal-overlay" onClick={() => setShowSuccess(false)}>
          <div
            className="modal-content modal-success"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-success-icon">
              <i className="bi bi-check-lg"></i>
            </div>
            <h2>¡Éxito!</h2>
            <p>{successMsg}</p>
            <button
              className="btn-modal btn-modal-ok"
              onClick={() => setShowSuccess(false)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocentesForm;
