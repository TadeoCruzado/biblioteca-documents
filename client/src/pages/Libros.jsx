import { Header } from '../components/Header'
import React, {useEffect } from 'react';
import {CardLibros} from '../components/CardLibros';
import { useBook } from '../context/LibroProvider';
import ImagenNotFound from '../img/no-image-icon.png';
import {Footer} from '../components/Footer'

export const Libros = () => {
    const {datos, cargarLibros} = useBook();

    useEffect(()=>{        
        cargarLibros();        
    }, [])

  return (
    <div>
        <Header/>
        <div className='page-books'>
            <div className="container">
                <div className="content">
                    <div className="cont">
                        <div className='container-librosAll'>
                            {datos.map(libro=>(
                                <CardLibros 
                                    ide={libro.id} 
                                    imagen={libro.nombre_nuevo == null ? ImagenNotFound: `https://ik.imagekit.io/ufvbh2clz/Image/${libro.nombre_nuevo}`} 
                                    key={libro.id} 
                                    titulo={libro.titulo} 
                                    autor={libro.autor}
                                    sipnosis={libro.sipnosis}/>
                            ))}
                        </div>
                    </div>
                </div>            
            </div>
        </div>        
        <Footer/>
    </div>
  )
}
