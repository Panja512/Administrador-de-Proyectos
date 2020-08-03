const express = require('express');
const conectarBaseDeDatos = require ('./config/db.js');
//creamos el servidor
const app = express();

//conectamos a la bd
conectarBaseDeDatos();

//para leer datos que ingrese el usuario
app.use(express.json({ extended: true}));

//puerto de APP
const PORT = process.env.PORT || 4000;

// Importamos rutas
app.use('/api/usuarios', require('./routes/usuarios.js'));
app.use('/api/auth', require('./routes/auth.js'));
//usamos API por si decidimos crear el proyecto web sin usar REST API. 
//arrancamos la app
app.listen(PORT,()=>{
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});