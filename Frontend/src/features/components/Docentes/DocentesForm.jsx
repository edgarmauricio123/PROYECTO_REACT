import { useState } from "react";
import "../Docentes/DocentesForm.css";

function DocentesForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    especialidad: "",
    imagenURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del docente:", formData);
    alert("Docente registrado correctamente!");
  };

  return (
    <div className="docentes-form-container">
      <div className="docentes-content">
        <div className="docentes-text">Registro de Docentes</div>

        <form onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div className="docentes-field">
            <label className="docentes-label">Nombre</label>
            <input
              required
              type="text"
              className="docentes-input"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese su nombre"
            />
          </div>

          {/* Campo Apellido */}
          <div className="docentes-field">
            <label className="docentes-label">Apellido</label>
            <input
              required
              type="text"
              className="docentes-input"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ingrese su apellido"
            />
          </div>

          {/* Campo Teléfono */}
          <div className="docentes-field">
            <label className="docentes-label">Teléfono</label>
            <input
              required
              type="tel"
              className="docentes-input"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="1234567890"
            />
            <span className="docentes-help">Ej: 1234567890</span>
          </div>

          {/* Campo Email */}
          <div className="docentes-field">
            <label className="docentes-label">Email</label>
            <input
              required
              type="email"
              className="docentes-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@dominio.com"
            />
          </div>

          {/* Campo Especialidad */}
          <div className="docentes-field">
            <label className="docentes-label">Especialidad</label>
            <input
              required
              type="text"
              className="docentes-input"
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              placeholder="Ej: Matemáticas, Programación, etc."
            />
          </div>

          {/* Campo URL de Imagen */}
          <div className="docentes-field">
            <label className="docentes-label">URL de Imagen (opcional)</label>
            <input
              type="url"
              className="docentes-input"
              name="imagenURL"
              value={formData.imagenURL}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            <div className="docentes-link">
              <a href={formData.imagenURL || "#"} target="_blank" rel="noopener noreferrer">
              </a>
            </div>
          </div>

          <button type="submit" className="docentes-button">
            Registrar Docente
          </button>
        </form>
      </div>
    </div>
  );
}

export default DocentesForm;