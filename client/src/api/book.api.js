import axios from 'axios';

const link  = 'https://localhost:3000'

export const obtenerDatos = async() =>
    await axios.get(`https://localhost:3000/book`);

export const createBook = async(book) => 
    await axios.post(`https://localhost:3000/book`, book);

export const unSoloDatos = async (id) =>
    await axios.get(`https://localhost:3000/book/${id}`);

export const eliminarDato = async(id) =>
    await axios.delete(`https://localhost:3000/book/${id}`);

export const editarDato = async (id, libroEdit) =>
    await axios.put(`https://localhost:3000/book/${id}`, libroEdit);