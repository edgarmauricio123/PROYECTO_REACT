import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inicio from "./features/pages/Inicio";
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
        <i class="bi bi-people me-2"></i> Docentes
        </Link>
        <Link to="/materias">
        <i class="bi bi-book me-2"></i> Materias
        </Link>
      </div>

      

      <div className="content">
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
