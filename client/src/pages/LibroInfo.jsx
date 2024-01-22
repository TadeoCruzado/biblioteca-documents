import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { useBook } from '../context/LibroProvider'
import { useNavigate, useParams } from 'react-router-dom';

import {Footer} from '../components/Footer'

const LibroInfo = () => {
  const params = useParams();
  const {eliminarLibro, obtenerLibro} = useBook();
  const [libro, setLibro] = useState({})
  const [imagen, setImagen] = useState(null);
  const navegar = useNavigate();

  useEffect(()=>{
    const cargarLibro = async () =>{
      const libroCargado = await obtenerLibro(params.id);
      setLibro(libroCargado);
    }
    cargarLibro();   
    
  },[])
  const imgExsit = libro.nombre_nuevo ? () =>{
  return(
    <div className='img-container-view'>
      <img src={`https://ik.imagekit.io/ufvbh2clz/Image/${libro.nombre_nuevo}`}></img>
    </div>
  )
}: () =>{
  return (
    <div>Sin Imagen</div>
  )
}  
  return (
    <div>
        <Header/>
        <div className='view-book-page'>
          <div className="container">
            <div className='view-buttons'>
                <button className='view-btn-edit' onClick={()=>{
                  navegar(`/editar/${libro.id}`)
                }} type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"></path></svg>
                </button>
                <button className='view-btn-delete' onClick={()=>{
                  eliminarLibro(libro.id)
                  navegar('/libros')
                }} type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                  <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                </button>
            </div>            
            <div className='view-title-autor'>
              <h1>{libro.titulo}</h1>
              <h2>{libro.autor}</h2>
            </div>
            <div className='view-content'>
              <div className="view-content-img">
                {imgExsit()}
              </div>
              <div className='view-content-info'>
                <div className='view-info-container'>
                  <h2>Sipnosis</h2>
                  <span>{libro.sipnosis}</span>
                </div>
                <div className='view-info-container'>                  
                  <h2>Paginas</h2>
                  <span>{libro.paginas}</span>
                </div>              
                <div className='view-info-container'>
                  <h2>Tag</h2>
                  <span>{libro.genero}</span>
                </div>  
                <div className='view-info-container'>
                  <h2>Idioma</h2>
                  <span>{libro.idioma}</span>
                </div>
              </div>              
            </div>                      
          </div>        
        </div> 
        <Footer/>
    </div>
  )
}

export default LibroInfo
