import axios from 'axios';

const API_URL = "http://localhost:8080/docentes";

export const obtenerDocentes = () => {
    return axios.get(`${API_URL}/traer-docentes`);
};

export const guardarDocente = (docente) => {
    return axios.post(`${API_URL}/insertar-docentes`, docente);
};

export const actualizarDocente = (id, docente) => {
    return axios.put(`${API_URL}/editar-docentes/${id}`, docente);
};

export const eliminarDocente = (id) => {
    return axios.delete(`${API_URL}/eliminar-docentes/${id}`);
};