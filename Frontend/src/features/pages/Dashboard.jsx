import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AlumnosForm from "../components/alumnos/AlumnosForm";
import AlumnosList from "../components/alumnos/AlumnosList";
function Dashboard() {
  return (
    <div>
      <AlumnosForm />
      <AlumnosList />
    </div>
  );
}

export default Dashboard;
