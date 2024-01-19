import React, { useEffect, useState,useCallback } from 'react'
import { Header } from '../components/Header'
import '../components/styles/agregar.css'
import {Footer} from '../components/Footer'
import {useDropzone} from 'react-dropzone'
import notImage from '../img/no-image-icon.png'
import useAdd from './useAdd'


const Agregar = () => {
  const {cargarLibro, handleSubmit,handleChange,params, button,datos, 
    onDropUrl, onDropImage, fileImage, refreshFileImage, deleteFileImage, 
    url, deleteImg, styleTituloRequiered, styleAutorRequiered, styleUrlRequiered} = useAdd();
  useEffect(()=>{    
    window.scrollTo(0,0);
    if(params != null){
      console.log('cargando datos')
      cargarLibro();
    }
  },[])

  const {
    getRootProps: getRootPropsImage, 
    getInputProps: getInputPropsImage
  } = useDropzone({
    onDrop: onDropImage,
    accept: {
      'image/*': ['.jpeg', '.png']
    }
  })
  const {
    getRootProps: getRootPropsUrl, 
    getInputProps: getInputPropsUrl,
    isDragActive: isDragActiveUrl
  } = useDropzone({
    onDrop: onDropUrl,
    accept: 'application/pdf'
  })

  const urlActive = isDragActiveUrl ? ()=>{
    return(
      <div className='form-drdasop-url'>
        <span>URL</span>
        <p>Suelte su archivo aqui...</p>
        <span className='obligatorio'>Obligatorio*</span>
      </div>
    )
  }:()=>{
    return(
      <div className='form-ddsarop-url'>
        <span>URL</span>
        <p>Arrastre su archivo aqui...</p>
        <span className='obligatorio'>Obligatorio*</span>
      </div>
    )
  }

  const imageFull =deleteImg ?() => {
    return(
      <div  className="img-muestra">
        <img src={notImage} alt="" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
        <p>Add image</p>
      </div>        
    )
  } :fileImage ? () => {
    return(
      <div  className="img-muestra">
        <img src={fileImage} alt="" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
          <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
        </svg>
        <p>Cambiar Imagen</p>
      </div>
      
    )
  }: datos.imagen ?() =>{
    return(
      <div  className="img-muestra">
        <img src={`https://ik.imagekit.io/ufvbh2clz/Image/${datos.imagen}`} alt="" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
          <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
        </svg>
        <p>Cambiar Imagen</p>
      </div>      
    )
  }:() => {
      return(
        <div  className="img-muestra">
          <img src={notImage} alt="" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
          <p>Add image</p>
        </div>        
      )
  }

  const urlFull = url || datos.url || null;

  

  return (
    <div className='add-page'>
      <Header/>
      <div className="container">
        <div className="intro-add">
          <h1>Libro</h1>
          <p>Agrega un libro que tienes guardado en tu ordenador. 
          Lo podras ver luego en la seccion Libros</p>
        </div>
        <hr />
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="form-img form-element">
            <div className='side'>
              <label htmlFor="imagen-agregar">Imagen:</label>
              <div {...getRootPropsImage()} className='img-container-add'>
                  {imageFull()}
                <input {...getInputPropsImage()} defaultValue={datos.img}/>
              </div>
              <button type='button' form='null' className='btn-img btn-img-refresh' onClick={refreshFileImage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path></svg>
              </button>
              <button type='button' form='null' className='btn-img btn-img-delete' onClick={deleteFileImage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
                </svg>
              </button>
            </div>            
          </div>
          <div className="form-list">
            <div className='side'>
              <div className='form-titulo form-element'>
                <div {...getRootPropsUrl()} className={`form-drop-url ${styleUrlRequiered}`}>
                  <input {...getInputPropsUrl()} defaultValue={datos.url}/>
                  {urlActive()}
                </div>              
              </div>
              <div className='load-filename'>
                    <h4>Nombre del archivo:</h4>
                    <span>{urlFull || "---"}</span>
              </div>
              <div className={`form-titulo form-element ${styleTituloRequiered}`}>
                <label htmlFor="titulo-agregar">
                  <span>Título:</span>
                  <span className='obligatorio'>Obligatorio*</span>
                </label>
                <input  
                value={datos.titulo}
                onChange={handleChange}
                id='titulo-agregar' type='text' name='titulo'></input>
              </div>            
              <div className={`form-titulo form-element ${styleAutorRequiered}`}>
                <label htmlFor="autor-agregar">
                  <span>Autor:</span>
                  <span className='obligatorio'>Obligatorio*</span>
                </label>
                <input 
                value={datos.autor}
                onChange={handleChange}
                id='autor-agregar' type='text' name='autor'></input>
              </div>            
              <div className="form-sipnosis form-element">  
                <label htmlFor="sinopsis">Sipnosis:</label>
                <textarea 
                value={datos.sipnosis}
                onChange={handleChange} 
                id='sipnosis-agregar' name='sipnosis'></textarea>
              </div>
              <div className="form-pag form-element">
                  <label htmlFor="paginas-agregar">Paginas:</label>
                  <input
                  value={datos.paginas}
                  onChange={handleChange}
                  id='paginas-agregar' type='number' name='paginas'></input>
              </div>
              <div className="form-genero form-element">  
                  <label htmlFor="genero-agregar">Género:</label>
                  <select value={datos.genero}
                    onChange={handleChange}
                    id="genero-agregar" name="genero">
                      <option value="programacion">Programacion</option>
                  </select>
              </div>
              <div className="form-idioma form-element">
                  <label htmlFor="idioma-agregar">Lenguaje:</label>
                  <select 
                  value={datos.idioma}
                  onChange={handleChange}
                  id="idioma-agregar" name="idioma">
                      <option value="español">Español</option>
                      <option value="ingles">Ingles</option>
                  </select>
              </div>
              <div className="form-submit">
                <input type="submit" value={button ? 'Agregar' : 'Editar'} />  
              </div>
            </div>
          </div>
        </form>
        <hr/>
      </div>        
      <Footer/>
    </div>
  )
}

export default Agregar