import axios from 'axios';

const LINK = "https://biblioteca-full.onrender.com"

export const obtenerDatos = async() =>
    await axios.get(`${LINK}/book`);

export const createBook = async(book) => 
    await axios.post(`${LINK}/book`, book);

export const unSoloDatos = async (id) =>
    await axios.get(`${LINK}/book/${id}`);

export const eliminarDato = async(id) =>
    await axios.delete(`${LINK}/book/${id}`);

export const editarDato = async (id, libroEdit) =>
    await axios.put(`${LINK}/book/${id}`, libroEdit);