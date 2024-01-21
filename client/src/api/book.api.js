import axios from 'axios';

export const obtenerDatos = async() =>
    await axios.get('https://biblioteca-full.onrender.com/book');

export const createBook = async(book) => 
    await axios.post('https://biblioteca-full.onrender.com/book', book);

export const unSoloDatos = async (id) =>
    await axios.get(`https://biblioteca-full.onrender.com/book/${id}`);

export const eliminarDato = async(id) =>
    await axios.delete(`https://biblioteca-full.onrender.com/book/${id}`);

export const editarDato = async (id, libroEdit) =>
    await axios.put(`https://biblioteca-full.onrender.com/${id}`, libroEdit);