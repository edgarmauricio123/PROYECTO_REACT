import axios from "axios";

const API_URL ="http://localhost:8080/materias";


export const obtenerMaterias = () => {
  return axios.get(`${API_URL}/traer-materias`);
};

export const guardarMateria = (materia) =>{
    return axios.post(`${API_URL}/insertar-materias`, materia);
};

export const actualizarMateria = (id, materia) => {
  return axios.put(`${API_URL}/editar-materias/${id}`, materia);
};

export const eliminarMateria = (id) => {
  return axios.delete(`${API_URL}/eliminar-materias/${id}`);
};
