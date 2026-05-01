import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../alumnos/AlumnosList.css";
function AlumnosList() {
  return (
    <div className="contentdashboard">
      <table
        className="table"
        style={{ backgroundColor: "#6366f1", borderRadius: "20px 20px 20px 20px" }}
      >
        {" "}
        <thead className="table-light">
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Carrera</th>
          <th scope="col">telefono</th>
          <th scope="col">imagen</th>
          <th scope="col">Acciones</th>
        </thead>
        <tbody>...</tbody>
      </table>
    </div>
  );
}

export default AlumnosList;
