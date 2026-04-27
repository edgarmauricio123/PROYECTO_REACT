import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from '../features/pages/Inicio';

function Dashboard() {
  return (
    <Router>
      <div className="sidebar">
        <Link to="/">
          <i className="bi bi-house-door me-2"></i> Inicio
        </Link>
        {/* <Link to="/alumnos"> */}
          <i className="bi bi-people me-2"></i> Alumnos
        {/* </Link> */}
        {/* <Link to="/docentes"> */}
          <i className="bi bi-people me-2"></i> Docentes
        {/* </Link> */}
        {/* <Link to="/materias"> */}
          <i className="bi bi-book me-2"></i> Materias
        {/* </Link> */}
      </div>

      <div className="content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          {/* Agrega más rutas aquí si es necesario */}
        </Routes>
      </div>
    </Router>
  );
}

export default Dashboard;
