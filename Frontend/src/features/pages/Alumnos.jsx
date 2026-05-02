// import { useEffect, useState } from "react";
// import AlumnosForm from "../components/alumnos/AlumnosForm";
// import AlumnosList from "../components/alumnos/AlumnosList";

// import { obtenerAlumnos, guardarAlumno } from "../../services/alumnoService";

// function Alumnos() {
//   const [alumnos, setAlumnos] = useState([]);

//   // Cargar alumnos al iniciar
//   useEffect(() => {
//     cargarAlumnos();
//   }, []);

//   const cargarAlumnos = () => {
//     obtenerAlumnos()
//       .then(res => setAlumnos(res.data))
//       .catch(err => console.error(err));
//   };

//   const agregarAlumno = (alumno) => {
//     guardarAlumno(alumno)
//       .then(() => cargarAlumnos()) // recarga tabla
//       .catch(err => console.error(err));
//   };

//   return (
//     <div>
//       <AlumnosForm onAgregar={agregarAlumno} />
//       <AlumnosList alumnos={alumnos} />
//     </div>
//   );
// }

// export default Alumnos;
import { useEffect, useState } from "react";
import AlumnosForm from "../components/alumnos/AlumnosForm";
import AlumnosList from "../components/alumnos/AlumnosList";

function Alumnos() {
  const [refresh, setRefresh] = useState(false);
  const [alumnoEditar, setAlumnoEditar] = useState(null);

  const recargar = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <AlumnosForm
        alumnoEditar={alumnoEditar}
        onFinish={() => {
          recargar();
          setAlumnoEditar(null); 
        }}
        onCancel={() => setAlumnoEditar(null)}
      />

      <AlumnosList
        refresh={refresh}
        onEditar={(alumno) => setAlumnoEditar(alumno)} // 🔥 esto llena el form
      />
    </div>
  );
}

export default Alumnos;