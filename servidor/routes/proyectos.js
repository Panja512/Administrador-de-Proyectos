const express = require('express');
const router = express.Router();
const proyectoControlador = require('./../controladores/proyectoControlador.js');
const auth = require('../middleware/auth.js');
const { check } = require('express-validator');
//Crea proyectos
//api/proyectos (endpoint o URL)
router.post('/',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty(),
        check('fechaInicio','Ingrese una fecha de inicio válida').isDate(),
        check('fechaFin','Ingrese una fecha de fin válida').isDate(),
        check('duracion','Ingrese una duración válida').isInt()
    ],
    proyectoControlador.crearProyecto
);
router.get('/',
    auth,
    proyectoControlador.obtenerProyectosPorUsuario
);
module.exports = router;