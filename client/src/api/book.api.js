import axios from 'axios';

export const obtenerDatos = async() =>
    await axios.get('http://localhost:3000/book');

export const createBook = async(book) => 
    await axios.post('http://localhost:3000/book', book);

export const unSoloDatos = async (id) =>
    await axios.get(`http://localhost:3000/book/${id}`);

export const eliminarDato = async(id) =>
    await axios.delete(`http://localhost:3000/book/${id}`);

export const editarDato = async (id, libroEdit) =>
    await axios.put(`http://localhost:3000/book/${id}`, libroEdit);