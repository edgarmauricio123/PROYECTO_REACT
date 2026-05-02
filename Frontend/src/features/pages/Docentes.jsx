import { useState } from "react";
import DocentesForm from "../components/Docentes/DocentesForm";
import DocentesList from "../components/Docentes/DocentesList";

function Docentes() {
  const [refresh, setRefresh] = useState(0);
  const [editingDocente, setEditingDocente] = useState(null);

  return (
    <div>
      <DocentesForm
        docenteEditar={editingDocente}
        onFinish={() => {
          setRefresh((prev) => prev + 1);
          setEditingDocente(null);
        }}
        onCancel={() => setEditingDocente(null)}
      />
      <DocentesList
        refresh={refresh}
        onEditar={(docente) => {
          setEditingDocente(docente);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}

export default Docentes;
