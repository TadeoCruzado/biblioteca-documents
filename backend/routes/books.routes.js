const express = require("express");
const bookController = require('../controllers/books.controllers.js');
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({    
    filename: (req, file, cb) =>{
        cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({
    storage
});

router.get('/book', bookController.getTasks); // Ver todos los libros: /libros
router.get('/book/:id', bookController.getTask); // Ver solo un libro por ID: /libros/id
router.post('/book',upload.fields([{name: 'url', maxCount:1 }, {name:'imagen', maxCount:1}]),bookController.createTask); // Crear: /nuevo
router.put('/book/:id',upload.fields([{name: 'url', maxCount:1 }, {name:'imagen', maxCount:1}]), bookController.updateTask);  //Editar: //editar
router.delete('/book/:id',bookController.deleteTask); // Eliminar
module.exports.router = router;
