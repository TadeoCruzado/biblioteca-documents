import { Link } from 'react-router-dom'
import './styles/cardLibro.css'


export const CardLibros = ({imagen, sipnosis, ide,titulo, autor}) => {
  return (
    <div className='container-card'>
      <div className='card-pad'>
        <Link to={`/libros/${ide}`}>
          <div className='card-image-container'>
            <img src={imagen} alt='card-imagen'></img>  
          </div>           
        </Link>
        <div className="card-info-container">
          <span className='card-title'>{titulo}</span>
          <span className='card-autor'>{autor}</span>
          <span className='card-sipnosis'>{sipnosis}</span>
        </div>            
        <div className="interaccion">
          <button className='card-read-btn'>Leer</button>
          <Link to={`/libros/${ide}`}>
                <button className='card-info-btn'>Info</button>
            </Link>   
        </div>            
      </div>        
    </div>
  )
}
