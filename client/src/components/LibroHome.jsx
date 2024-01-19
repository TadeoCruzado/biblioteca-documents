import { useState } from 'react'
import './styles/libroHome.css'
import { Link } from 'react-router-dom'


export const LibroHome = ({ide,link, titulo, autor, sipnosis, imagen}) => {
    return (
    <div className='section-libro'> {/*todo*/}
        <div className='container-libro'>{/*carta contenedor*/}
            <div className='view-libro'>{/**carta */}
                <div className='img-libro'> {/**imagen */}
                    <img src={imagen}
                        alt='q'></img>
                    <div className='filter'></div>
                </div>
                <div className='description-libro'> {/**datos */}
                    <span className='titulo-libro'>
                        {titulo}
                    </span>             
                    <span className='autor-libro'>
                        {autor}
                    </span>
                    <span className='sipnosis-libro'>
                        Sipnosis
                        <div className='sipnosis'><p>{sipnosis}
                            </p></div>
                    </span>  
                    <div className='botones-libro'>
                        <a href={link}>
                            <button className='card-read-btn'>
                                <a href={`${link}`} target="_blank" rel="noopener noreferrer">Leer</a>
                                 </button>
                        </a>                        
                        <Link to={`/libros/${ide}`}>
                            <button className='card-info-btn'>Info</button>
                        </Link>                        
                    </div>
                </div>
            </div>
        </div>
    </div>  
  )
}
