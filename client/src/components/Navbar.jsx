import './styles/navbar.css'

const Navbar = () => {
  return (
    <div className='titulo-info-contenedor'>
        <div className='titulo-info'>
            <span className='subtitulo sub1'>Biblioteca</span>
            <span className='subtitulo sub2'>Virtual.</span>
            <p>Encuentra aqui todos los libros que quieras </p>
            <button className='boton-ver'>
                <span> Ver Documentos </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
              </button>           
        </div>                
    </div>
  )
}

export default Navbar