import { useState } from "react";
import AlumnosForm from "../components/alumnos/AlumnosForm";
import AlumnosList from "../components/alumnos/AlumnosList";

function Dashboard() {
  const [refresh, setRefresh] = useState(0);
  const [editingAlumno, setEditingAlumno] = useState(null);

  return (
    <div>
      <AlumnosForm
        alumnoEditar={editingAlumno}
        onFinish={() => {
          setRefresh((prev) => prev + 1);
          setEditingAlumno(null);
        }}
        onCancel={() => setEditingAlumno(null)}
      />
      <AlumnosList
        refresh={refresh}
        onEditar={(alumno) => {
          setEditingAlumno(alumno);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}

export default Dashboard;
