import { useContext, useState } from "react";
import { LibroContext } from "./LibroContext";
import { createBook, editarDato, eliminarDato, 
    obtenerDatos, unSoloDatos } from "../api/book.api";



export const useBook = () =>{
    const context = useContext(LibroContext);
    if (!context ){
        throw new Error('Use Task must be used ...')
    }
    return context
}

export const LibroContextProvider = ({children}) =>{
    const [datos, setDatos] = useState([]);
    
    async function cargarLibros(){
        const respuesta = await obtenerDatos();
        setDatos(respuesta.data);
        console.log(datos);            
    }

    const crearLibro = async (datoCrear) =>{
        try {
            const respuesta = await createBook(datoCrear);
            console.log(respuesta);
            return respuesta;
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerLibro = async (id)=>{
        try {
            const respuesta = await unSoloDatos(id);
            console.log("RESPUESTA")
            console.log(respuesta.data)
            return respuesta.data
        } catch (error) {
            console.log(error)
        }
    }  

    const eliminarLibro = async (id)  =>{
        try {
            const respuesta = await eliminarDato(id);
            setDatos(datos.filter(dato => dato.id !== id))
            console.log(respuesta)
        } catch (error) {
            console.log(error)
        }
    }
    const editarLibro = async (id, datos) => {
        try {
            const respuesta = await editarDato(id, datos);
            console.log(respuesta);
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <LibroContext.Provider value={{datos, cargarLibros, 
        crearLibro, obtenerLibro,eliminarLibro, editarLibro}}>
            {children}
        </LibroContext.Provider>
    )    
}