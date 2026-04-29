import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MateriasForm from "../components/Materias/MateriasForm";
import MateriasList from "../components/Materias/MateriasList";
function Materias() {
  return (
    <div>
      <MateriasForm />
      <MateriasList />
    </div>
  );
}

export default Materias;
