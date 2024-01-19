const express = require("express"); 
const puerto = require("./config.js")
const bookRoutes = require('../routes/books.routes.js')
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, '../dbimages')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bookRoutes.router);
app.listen(puerto.PORT);
console.log(`runnin in port:${puerto.PORT}`);