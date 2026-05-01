import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Inicio from "./features/pages/Inicio";
import Dashboard from "../src/features/pages/Dashboard";
import Materias from "../src/features/pages/Materias";
import Docentes from "../src/features/pages/Docentes";
import { useState } from "react";

import "./App.css";

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <Router>
      <div className="app-container">
        <div className={`sidebar ${isSidebarVisible ? "expanded" : "collapsed"}`}>
          <div className="sidebar-header" onClick={toggleSidebar}>
            <i className="bi bi-list toggle-icon"></i>
            <span className="logo-text">SISTEMA</span>
          </div>

          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}> 
            <i className="bi bi-house-door"></i> <span>Inicio</span>
          </NavLink>

          <NavLink to="/alumnos" className={({ isActive }) => (isActive ? "active" : "")}> 
            <i className="bi bi-person-badge"></i> <span>Alumnos</span>
          </NavLink>

          <NavLink to="/docentes" className={({ isActive }) => (isActive ? "active" : "")}> 
            <i className="bi bi-people"></i> <span>Docentes</span>
          </NavLink>

          <NavLink to="/materias" className={({ isActive }) => (isActive ? "active" : "")}> 
            <i className="bi bi-book"></i> <span>Materias</span>
          </NavLink>
        </div>

        <div className="content">
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/alumnos" element={<Dashboard />} />
              <Route path="/docentes" element={<Docentes />} />
              <Route path="/materias" element={<Materias />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;