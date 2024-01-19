import './styles/main.css'
import { LibroHome } from './LibroHome'
import { Link } from 'react-router-dom'
import { useEffect, useState} from 'react'
import { useBook } from '../context/LibroProvider'
import ImagenNotFound from '../img/no-image-icon.png'

const Main = () => {

  const {datos, cargarLibros} = useBook()

  useEffect(()=>{
    cargarLibros();
  },[])

  const mostrarLibros = datos.length != 0 ? () => (
    <div className='book-list'>
      {
        datos.slice(0,4).map(libro => (
          <LibroHome 
          key={libro.id} 
          ide={libro.id}
          link = {`https://ik.imagekit.io/ufvbh2clz/Libros/${libro.nombre_nuevo_url}`}
          imagen={libro.nombre_nuevo == null ? ImagenNotFound: `https://ik.imagekit.io/ufvbh2clz/Image/${libro.nombre_nuevo}`} 
          titulo={libro.titulo} 
          autor={libro.autor} 
          sipnosis={libro.sipnosis ?  libro.sipnosis : 'Sin Sipnosis'}
          />
        ))
      }        
      </div>    
  ) : () => (
      <div className='noBooks'>
        <span>Sin libros guardados</span>
      </div>
    ); 

    const mostrarBoton = datos.length > 4 ? () => (
      <div className='more-books-btn'>
        <Link to='/libros'>
          <button>Ver mas libros</button>
        </Link>
        </div>    
    ) : () => null;

  return (
    <div className='container'>        
      <div className='content'>
        <div className='cont'>
            <button className='agregarLibro'>
                <span>
                  <Link className='btn-agregar' to="/agregar"> Agregar</Link>
                </span>
                <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                    <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                </svg>
            </button>
        </div>
        <div className='superior-content'>
          <span>Libros: </span>
        </div>      
        {mostrarLibros()}   
        {mostrarBoton()}
      </div>        
    </div>
  )
}

export default Main