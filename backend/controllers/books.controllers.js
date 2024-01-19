const path = require('path');
const poolServer = require('../server/db.js')
const pool = poolServer.pool;
const fs = require('fs');
const Imagekit = require('imagekit');
const { v4: uuidv4 } = require('uuid');

var imagekit = new Imagekit({
    publicKey: 'public_IkhgLFhkIOCqxX9BpsYlPTUkKBk=',
    privateKey: 'private_NV8iRTYf8XlR7IWvBmlG0+TC1KI=',
    urlEndpoint: 'https://ik.imagekit.io/ufvbh2clz/'
})

//OBTENER TODOS LOS LIBROS
const getTasks = async (req, res) =>{    
    try {
        const [datos] = await pool.query('select * from libros left join archivos on libros.url_id = archivos.id_url left join imagenes on libros.imagen_id= imagenes.id_imagen')
        console.log(datos);
        res.json(datos);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }    
}

//OBTENER LOS DATOS DE SOLO UN LIBRO
const getTask =  async (req, res) =>{
    try {
        //console.log(req.params['id']);
        const [datos] = await pool.query(
            'select * from libros left join archivos on libros.url_id = archivos.id_url left join imagenes on libros.imagen_id= imagenes.id_imagen WHERE id = ?',
             [req.params.id] )
        //console.log(datos[0]);
        if(datos.length == 0) {
            return res.status(404).json({message: 'book not found'});
        }
        res.json(datos[0]);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }    
}

//CREAR UN LIBRO
const createTask = async (req, res) =>{
    try {
        const {titulo, autor, sipnosis, paginas, genero, idioma} = req.body;
        var responseImagen = null;    
        //SUBIR IMAGENES=============================================================    
        if(req.files['imagen']){            
            const imgBuffer = fs.readFileSync(req.files['imagen'][0].path);
            responseImagen = await imagekit.upload({
                file: imgBuffer,
                fileName: 'imgBE.jpg',
                folder: 'Image' 
            });
            if(responseImagen.status == 200) console.log(responseImagen)
            else {
                console.log(responseImagen.status);
                console.log(responseImagen.error);
            };            
        } 
        //=============================================================       
        const urlBuffer = fs.readFileSync(req.files['url'][0].path);
        const responseUrl = await imagekit.upload({
            file: urlBuffer,
            fileName: 'libro.pdf',
            folder: 'Libros' 
        });
        if(responseUrl.status == 200) console.log(responseUrl)
        else {
            console.log(responseUrl.status);
            console.log(responseUrl.error);
        }
        console.log(responseUrl);
        let linkUrl = responseUrl.url;
        /*Subiendo los datos a la base de datos*/ 
        //====================================================================================
        let imagenBD = null;
        let respuestImagenBD =  null;
        let query;
        let datosQuery;
        if(responseImagen){
            const imagenBD_id = responseImagen.fileId;
            const imagenBD_name = responseImagen.name;
            const imagenBD_original = req.files['imagen'][0].originalname;
            query = "INSERT INTO imagenes(id_imagen,nombre_nuevo, nombre_archivo) values(?,?,?)";
            datosQuery = [imagenBD_id, imagenBD_name, imagenBD_original];
            imagenBD = imagenBD_id;
        }else {
            query = "INSERT INTO imagenes(id_imagen) values (?)";
            const id_null = 'null-'+ uuidv4().replace(/-/g, '').slice(0, 15)
            datosQuery = [id_null];
            imagenBD = id_null;
        }
        const imagenBDQuery = await pool.query(query, datosQuery);
        //====================================================================================
        const urlBD_id = responseUrl.fileId;
        const urlBD_name = responseUrl.name;
        const urlBD_original = req.files['url'][0].originalname;
        const urlBD = urlBD_id;
        const respuestArchivosBD = await pool.query("INSERT INTO archivos(id_url,nombre_nuevo_url, nombre_archivo_url, link_url) values(?,?,?,?)",
        [urlBD_id,urlBD_name,urlBD_original, linkUrl]);
        //====================================================================================        
        const respuestLibrosBD  = await pool.query(
            "INSERT INTO libros(imagen_id, url_id, titulo, autor,sipnosis, paginas, genero, idioma) VALUES (?,?,?,?,?,?,?,?)",
            [imagenBD,urlBD ,titulo, autor, sipnosis, paginas, genero, idioma]);        
        //====================================================================================    
        const respuesta = {
            'libro': respuestLibrosBD,
            'imagenes': imagenBDQuery,
            'archivos': respuestArchivosBD,
        }
        console.log(respuesta);
        res.json(respuesta);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }    
}

//EDITAR UN LIBRO
const updateTask = async (req, res) =>{
    console.log("-----------------------------------------------------");
    console.log(req.body);
    console.log("=============================");
    console.log(req.files);
    console.log("=============================");    
    console.log(req.body.eliminarImg);    
    console.log("============================="); 
    try {        
        const [queryIDImagen] = await pool.query(`SELECT imagen_id FROM libros WHERE id = ?`,[req.params.id]);
        const idImagenGet =  queryIDImagen[0].imagen_id;  
        var responseImagen = null;        
        var responseUrl = null;
        if(req.files['imagen']){ 
            console.log("***********************************");
            const imgBuffer = fs.readFileSync(req.files['imagen'][0].path);
            const responseImagenDelete = await imagekit.deleteFile(idImagenGet);
            responseImagen = await imagekit.upload({
                file: imgBuffer,
                fileName: 'prueba1.jpg',
                folder: 'Image' 
            });
            if(responseImagen.status == 200) console.log(responseImagen)
            else {
                console.log(responseImagen.status);
                console.log(responseImagen.error);
            };
        }
        if(req.files['url']){
            const urlBuffer = fs.readFileSync(req.files['url'][0].path);
            responseUrl = await imagekit.upload({
                file: urlBuffer,
                fileName: 'libro.pdf',
                folder: 'Libros' 
            });
            if(responseUrl.status == 200) console.log(responseUrl)
            else {
                console.log(responseUrl.status);
                console.log(responseUrl.error);
            }
        }
        let imagenBD_id = null;
        let imagenBD_name = null;
        let imagenBD_original = null;
        let query = '';
        let datosQuery = [];
        
        console.log('===========////////==============')
        console.log(queryIDImagen[0].imagen_id)
        console.log('===========////////==============')
        console.log(responseImagen)
        
        let queryImagen;
        if(responseImagen){            
            imagenBD_id = responseImagen.fileId;
            imagenBD_name = responseImagen.name;
            imagenBD_original = req.files['imagen'][0].originalname;            
            query = 'UPDATE imagenes SET id_imagen = ?, nombre_nuevo= ? ,  nombre_archivo = ? WHERE id_imagen = ?'
            datosQuery = [imagenBD_id, imagenBD_name, imagenBD_original, idImagenGet]  
            queryImagen = await pool.query(query, datosQuery);
        }else if(req.body.eliminarImg == 'true') {
            console.log("***********************************"); 
            console.log("entrooooooo");   
            query = 'UPDATE imagenes SET id_imagen = ?, nombre_nuevo= ? ,  nombre_archivo = ? WHERE id_imagen = ?';
            const idImagenNull = 'null-'+ uuidv4().replace(/-/g, '').slice(0, 15);
            datosQuery = [idImagenNull, null, null,idImagenGet ];
            queryImagen = await pool.query(query, datosQuery);
        }
        
        if(responseUrl){
            const [queryIDUrl] = await pool.query(`SELECT url_id FROM libros WHERE id = ?`,[req.params.id])
            const urlBD_id = responseUrl.fileId;
            const urlBD_name = responseUrl.name;
            const urlBD_original = req.files['url'][0].originalname;
            const [queryUrl] = await pool.query(`UPDATE archivos SET id_url = ?, nombre_nuevo_url= ?, nombre_archivo_url = ? WHERE id_url = ?`,
            [
                urlBD_id,
                urlBD_name,
                urlBD_original,
                queryIDUrl[0].url_id
            ])
        }
        /*Subiendo los archivos a ImageKit para optimizar */
        const [queryDTLibros] = await pool.query(`SELECT * FROM libros WHERE id = ?`,[req.params.id]);
        const titulo = queryDTLibros[0].titulo == req.body.titulo ? queryDTLibros[0].titulo : req.body.titulo;
        const autor = queryDTLibros[0].autor == req.body.autor ? queryDTLibros[0].autor : req.body.autor;
        const sipnosis = queryDTLibros[0].sipnosis == req.body.sipnosis ? queryDTLibros[0].sipnosis : req.body.sipnosis;
        const paginas = queryDTLibros[0].paginas == req.body.paginas ? queryDTLibros[0].paginas : req.body.paginas;
        const genero = queryDTLibros[0].genero == req.body.genero ? queryDTLibros[0].genero : req.body.genero;
        const idioma = queryDTLibros[0].idioma == req.body.idioma ? queryDTLibros[0].idioma : req.body.idioma;
        const [datos] = await pool.query(
            `UPDATE libros SET
            titulo = ?, 
            autor = ?, 
            sipnosis = ?, 
            paginas = ?,
            genero = ?,
            idioma = ? WHERE id = ?`,             
            [
            titulo,
            autor,
            sipnosis,
            paginas,
            genero,
            idioma,
            req.params.id
        ]);
        const respuest = {
            'imagen': queryImagen
        }
        console.log("=======RESPUESTA======");
        console.log(respuest);
        res.json(datos);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }    
}

//ELIMINAR UN LIBRO
const deleteTask =  async (req, res) =>{
    try {
        const [queryIDImagen] = await pool.query(`SELECT imagen_id FROM libros WHERE id = ?`,[req.params.id]);
        const [queryIDUrl] = await pool.query(`SELECT url_id FROM libros WHERE id = ?`,[req.params.id]);
        const idImagenGet =  queryIDImagen[0].imagen_id;  
        const idUrlGet =  queryIDUrl[0].url_id;  
        const [deleteImagen] = await pool.query('DELETE FROM imagenes WHERE id_imagen = ?', [idImagenGet]);
        const [deleteUrl] = await pool.query('DELETE FROM archivos WHERE id_url = ?', [idUrlGet]);
        const responseImagenDelete = await imagekit.deleteFile(idImagenGet);
        const responseUrlDelete = await imagekit.deleteFile(idUrlGet);
        if(deleteImagen.affectedRows === 0 ){
            return res.status(404).json({message: 'book not found'});
        }
        if(deleteUrl.affectedRows === 0 ){
            return res.status(404).json({message: 'book not found'});
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }    
}

module.exports = {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask
}