import axios from "axios";

const API_URL = "http://localhost:8080/materias";

// GET todas
export const obtenerMaterias = () => {
  return axios.get(API_URL);
};

// GET por ID
export const obtenerMateriaPorId = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// POST
export const guardarMateria = (materia) => {
  return axios.post(API_URL, materia);
};

// PUT
export const actualizarMateria = (id, materia) => {
  return axios.put(`${API_URL}/${id}`, materia);
};

// DELETE
export const eliminarMateria = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};