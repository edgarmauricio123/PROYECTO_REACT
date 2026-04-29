import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Inicio from "./features/pages/Inicio";
import Dashboard from "../src/features/pages/Dashboard";
import Materias from "../src/features/pages/Materias";
import Docentes from "../src/features/pages/Docentes";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="sidebar">
        <Link to="/">
          <i className="bi bi-house-door me-2"></i> Inicio
        </Link>

        <Link to="/alumnos">
          <i className="bi bi-people me-2"></i> Alumnos
        </Link>

        <Link to="/docentes">
          <i className="bi bi-people me-2"></i> Docentes
        </Link>

        <Link to="/materias">
          <i className="bi bi-book me-2"></i> Materias
        </Link>
      </div>

      <div className="content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/alumnos" element={<Dashboard />} />
          <Route path="/docentes" element={<Docentes />} />
          <Route path="/materias" element={<Materias />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;