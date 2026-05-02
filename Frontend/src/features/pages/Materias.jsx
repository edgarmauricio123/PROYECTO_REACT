import { useState } from "react";
import MateriasForm from "../components/Materias/MateriasForm";
import MateriasList from "../components/Materias/MateriasList";

function Materias() {
  const [refresh, setRefresh] = useState(0);
  const [editingMateria, setEditingMateria] = useState(null);

  return (
    <div>
      <MateriasForm
        materiaEditar={editingMateria}
        onFinish={() => {
          setRefresh((prev) => prev + 1);
          setEditingMateria(null);
        }}
        onCancel={() => setEditingMateria(null)}
      />
      <MateriasList
        refresh={refresh}
        onEditar={(materia) => {
          setEditingMateria(materia);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}

export default Materias;
