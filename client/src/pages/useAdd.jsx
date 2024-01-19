import { useState,useCallback } from "react"
import {useDropzone} from 'react-dropzone'
import {useNavigate, useParams } from "react-router-dom";
import { useBook } from "../context/LibroProvider";

const useAdd = () => {
    const [datos, setDatos] = useState({
        imagen: '',
        url: '',
        titulo: '',
        autor: '',
        sipnosis: '',
        paginas: '',
        genero: 'fantasia',
        idioma: 'español',    
    });
    const [datosFiles, setDatosFiles] = useState({
      imagenFile: null,
      urlFile: null
    })
    const [fileImage, setFileImage] = useState(null);
    const[image, setImage] = useState(null)
    const [url, setURL] = useState(null);
    const [deleteImg, setDeleteImg] = useState(false);
    const {crearLibro, editarLibro, obtenerLibro } = useBook();
    const paramsId = useParams();
    const params = paramsId.id;
    const button = params == null;
    const navegar = useNavigate();
    
    const handleChange = event =>{
        const {name, value} = event.target;
        setDatos(prevDatos => ({
          ...prevDatos,
          [name]: value
        }))    
      }
      const cargarLibro = async () =>{
        const libroCargado = await obtenerLibro(params)
        console.log(libroCargado);
        setDatos({
          imagen: libroCargado.nombre_nuevo == null ? '':libroCargado.nombre_nuevo,
          url: libroCargado.nombre_archivo_url,
          titulo: libroCargado.titulo,
          autor: libroCargado.autor,
          sipnosis: libroCargado.sipnosis,
          paginas: libroCargado.paginas,
          genero: libroCargado.genero,
          idioma: libroCargado.idioma, 
        });
        setURL(libroCargado.nombre_archivo_url);
      }
      const [styleTituloRequiered, setStyleTituloRequiered] = useState();
      const [styleAutorRequiered, setStyleAutorRequiered] = useState();
      const [styleUrlRequiered, setStyleUrlRequiered] = useState();


    const handleSubmit = async event =>{
        event.preventDefault();
        console.log(datos.titulo);
        console.log(datos.autor);
        console.log(url);
        if(datos.titulo.trim() != '' && datos.autor.trim() != '' && url){
          const formData = new FormData();
          formData.append('imagen', datosFiles.imagenFile);
          formData.append('url', datosFiles.urlFile);
          formData.append('titulo', datos.titulo);
          formData.append('autor', datos.autor);
          formData.append('sipnosis', datos.sipnosis);
          formData.append('paginas', datos.paginas);
          formData.append('genero', datos.genero);
          formData.append('idioma', datos.idioma);
          formData.append('eliminarImg', deleteImg);
          if(params != null){      
              console.log(datos);
              editarLibro(params, formData);
          } else{  
            const respuesta = await crearLibro(formData);              
            console.log("IMAGEN\n"+datos.imagen);
            setDatos({
              imagen: '',
              url: '',
              titulo: '',
              autor: '',
              sipnosis: '',
              paginas: '',
              genero: 'fantasia',
              idioma: 'español', 
            })  
            if(respuesta)
              navegar(`/`);
          }     
           
        }  
        if(datos.titulo.trim() == ''){
          setStyleTituloRequiered('input-required');
        }else {
          setStyleTituloRequiered('');
        }
        if(datos.autor.trim() == ''){
          setStyleAutorRequiered('input-required');
        }else {
          setStyleAutorRequiered('');
        }
        if(url == null){
          setStyleUrlRequiered('input-required-url');
        }else {
          setStyleUrlRequiered('');
        } 
    }
    const onDropImage = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = ()=>{
          setFileImage(reader.result);
        }
        reader.readAsDataURL(file);
        setDatosFiles(prevDatos => ({
          ...prevDatos, imagenFile: file
        }));
        setDeleteImg(false);
      }, [])
    var acceptedFileItems = null;
    const onDropUrl = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setDatosFiles(prevDatos => ({
          ...prevDatos, urlFile: file
        }));
        acceptedFileItems = acceptedFiles.map(file => {
          setURL(file.path)
        });
      }, []);      
      const refreshFileImage = () => {
        setDeleteImg(false);
        setFileImage(null);
        setDatosFiles(prevDatos => ({
          ...prevDatos, imagenFile: null
        }));
      }
      const deleteFileImage = () => {
        setDeleteImg(true);
        setFileImage(null);
        setDatosFiles(prevDatos => ({
          ...prevDatos, imagenFile: null
        }));
      }

    return {cargarLibro,handleSubmit,handleChange, params, button, datos, onDropUrl, 
      onDropImage, fileImage, refreshFileImage, deleteFileImage, url, deleteImg,
      styleTituloRequiered, styleAutorRequiered, styleUrlRequiered};
}

export default useAdd;