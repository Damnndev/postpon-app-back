// Configuramos express

const express = require('express');
const { dbConnect } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// Creamos el servidor de express
const app = express();


// Base de datos
dbConnect();

/*  MIDDLEWARES */

// CORS
app.use(cors());

// Directorio Público
app.use(express.static('public'));

// Lectura y parseado del body
app.use(express.json());

/* Rutas */

// rutas relacionadas autenticación(crear user, login, renew token)
// Indicamos todo lo que tenga el archivo auth lo exporte a la ruta definida
app.use('/api/auth', require('./routes/auth'));

// rutas CRUD: eventos(insertar, borrar, etc)
app.use('/api/events', require('./routes/events'));

// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});