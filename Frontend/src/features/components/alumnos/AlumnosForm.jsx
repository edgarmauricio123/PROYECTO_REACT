import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../alumnos/AlumnosForm.css";
function AlumnosForm() {
  return (
    <div className="contentdashboard">
      <form class="form">
        <p class="title">Formulario de Alumnos </p>

        <label>
          <input required="" placeholder="" type="text" className="input" />
          <span>Nombre</span>
        </label>
        <label>
          <input required="" placeholder="" type="text" className="input" />
          <span>Apellidos</span>
        </label>

        <label>
          <input required="" placeholder="" type="number" className="input" />
          <span>Telefono</span>
        </label>
        <label >
            <input required="" placeholder="" type="text" className="input" />
            <span>Carrera</span>
        </label>

        <label>
          <input required="" placeholder="" type="text" className="input" />
          <span>ImagenURL</span>
        </label>
        <button className="submit">Submit</button>
      </form>
    </div>
  );
}

export default AlumnosForm;
