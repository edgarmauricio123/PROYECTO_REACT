import axios from "axios";

const API_URL = "http://localhost:8080/alumnos";

export const obtenerAlumnos = () => {
  return axios.get(`${API_URL}/traer-alumnos`);
};

export const guardarAlumno = (alumno) => {
  return axios.post(`${API_URL}/insertar-alumnos`, alumno);
};

export const actualizarAlumno = (id, alumno) => {
  return axios.put(`${API_URL}/editar-alumnos/${id}`, alumno);
};

export const eliminarAlumno = (id) => {
  return axios.delete(`${API_URL}/eliminar-alumnos/${id}`);
};   