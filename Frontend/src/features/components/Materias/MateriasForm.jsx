import { useState, useEffect, useRef } from "react";
import "../Materias/MateriasForm.css";

const API = "http://localhost:8080/materias";

function MateriasForm({ materiaEditar, onFinish, onCancel }) {
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    creditos: "",
    semestre: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    if (materiaEditar) {
      setForm({
        id: materiaEditar.id || "",
        nombre: materiaEditar.nombre || "",
        creditos: String(materiaEditar.creditos ?? ""),
        semestre: typeof materiaEditar.semestre === "object"
          ? (materiaEditar.semestre?.nombre ?? "")
          : String(materiaEditar.semestre ?? ""),
      });
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setForm({
        id: "",
        nombre: "",
        creditos: "",
        semestre: "",
      });
    }
  }, [materiaEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limpiarForm = () => {
    setForm({
      id: "",
      nombre: "",
      creditos: "",
      semestre: "",
    });
  };

  const isFormInvalid =
    !form.nombre.trim() ||
    !form.creditos.trim() ||
    !form.semestre;

  const validarForm = () => {
    const errors = [];
    if (!form.nombre.trim()) errors.push("Nombre");
    if (!form.creditos.trim()) {
      errors.push("Créditos");
    } else if (!/^\d{1,3}$/.test(form.creditos)) {
      errors.push("Créditos debe tener entre 1 y 3 dígitos numéricos");
    }
    if (!form.semestre) errors.push("Semestre");
    // Validar que semestre sea un número del 1 al 12
    const semestreNum = parseInt(form.semestre);
    if (form.semestre && (isNaN(semestreNum) || semestreNum < 1 || semestreNum > 12)) {
      errors.push("Semestre debe ser un número entre 1 y 12");
    }
    if (errors.length > 0) {
      alert(
        "Por favor completa los siguientes campos:\n- " + errors.join("\n- "),
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarForm()) return;
    if (materiaEditar) {
      setShowConfirm(true);
    } else {
      ejecutarCrear();
    }
  };

  const ejecutarCrear = async () => {
    try {
      // Enviar semestre como número para crear
      const semestreNum = parseInt(form.semestre);
      
      const body = {
        nombre: form.nombre,
        creditos: parseInt(form.creditos),
        semestre: semestreNum  // Cambiado: enviar número directamente
      };

      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSuccessMessage("Materia agregada exitosamente");
        setShowSuccess(true);
        limpiarForm();
        onFinish();
      } else {
        const errorData = await res.text();
        console.error("Error response:", errorData);
        alert("Error al guardar la materia");
      }
    } catch (error) {
      console.error("Error al crear materia:", error);
      alert("Error de conexión al guardar la materia");
    }
  };

  const ejecutarActualizar = async () => {
    setShowConfirm(false);
    try {
      const semestreNum = parseInt(form.semestre);
      
      const body = {
        id: materiaEditar.id,
        nombre: form.nombre,
        creditos: parseInt(form.creditos),
        semestre: semestreNum  // Cambiado: enviar número
      };

      const res = await fetch(`${API}/${materiaEditar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSuccessMessage("Se ha actualizado correctamente");
        setShowSuccess(true);
        limpiarForm();
        onFinish();
      } else {
        const errorData = await res.text();
        console.error("Error response:", errorData);
        alert("Error al actualizar");
      }
    } catch (error) {
      console.error("Error al actualizar materia:", error);
      alert("Error de conexión al actualizar");
    }
  };

  const handleCancel = () => {
    limpiarForm();
    if (onCancel) onCancel();
  };

  const isEditing = materiaEditar != null;

  return (
    <div className="materias-form-container" ref={formRef}>
      <div className="contentdashboard">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">
            {isEditing ? "Editar Materia" : "Registrar Materias"}
          </p>
          <div className="flex">
            <label>
              <input
                className="input"
                type="number"
                name="creditos"
                value={form.creditos}
                onChange={handleChange}
                required
                min="1"
                max="12"
              />
              <span>Creditos</span>
            </label>

            <label>
              <input
                className="input"
                type="number"
                name="semestre"
                value={form.semestre}
                onChange={handleChange}
                required
                min="1"
                max="12"
              />
              <span>Semestre</span>
            </label>
          </div>

          <label>
            <input
              className="input"
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <span>Nombre</span>
          </label>
          <button className="submit" type="submit" disabled={isFormInvalid}>
            {isEditing ? "Actualizar" : "Enviar"}
          </button>

          {isEditing && (
            <button className="btn-cancel-materia" type="button" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-confirm-icon">
              <i className="bi bi-pencil"></i>
            </div>
            <h2>¿Está seguro de actualizar?</h2>
            <p>Se actualizarán los datos de la materia seleccionada.</p>
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
            <p>{successMessage}</p>
            <button className="btn-modal btn-modal-ok" onClick={() => setShowSuccess(false)}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MateriasForm;