// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authControlador = require('./../controladores/authControlador.js');
//autenticar usuario
//api/auth (endpoint o URL)
/* de esta forma nos comunicamos con el controlador, con una función en particular (es por eso que no usamos
arrow function) */
router.post('/', 
    [
        check('email','Ingrese un email válido').isEmail(),
        check('contraseña','La contraseña debe contener 6 carácteres como mínimo').isLength({min:6}),
    ],
    authControlador.autenticarUsuario);
module.exports = router;