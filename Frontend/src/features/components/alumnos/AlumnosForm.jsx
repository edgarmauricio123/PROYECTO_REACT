import "../alumnos/AlumnosForm.css";

function AlumnosForm() {
  return (
    <div className="alumnos-form-container">
      <div className="alumnos-content">
        <div className="alumnos-text">Registro de Alumnos</div>

        <form className="form">
          <label>
            <input required placeholder="" type="text" className="input" />
            <span>Nombre</span>
          </label>

          <label>
            <input required placeholder="" type="text" className="input" />
            <span>Apellidos</span>
          </label>

          <label>
            <input required placeholder="" type="number" className="input" />
            <span>Telefono</span>
          </label>

          <label>
            <input required placeholder="" type="text" className="input" />
            <span>Carrera</span>
          </label>

          <label>
            <input required placeholder="" type="text" className="input" />
            <span>ImagenURL</span>
          </label>

          <button className="submit">Registrar Alumno</button>
        </form>
      </div>
    </div>
  );
}

export default AlumnosForm;
