const express = require('express');
const router = express.Router();
const proyectoControlador = require('./../controladores/proyectoControlador.js');
const auth = require('../middleware/auth.js');
const { check } = require('express-validator');
//Crea proyectos
//api/proyectos (endpoint o URL)
router.post('/',
    //lo primero que hacemos es autenticar si hay un usuario logueado
    auth,
    [
    //hacemos la validación de la información
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty(),
        check('fechaInicio','Ingrese una fecha de inicio válida').isDate(),
        check('fechaFin','Ingrese una fecha de fin válida').isDate(),
        check('duracion','Ingrese una duración válida').isInt()
    ],
    //llamamos a la función creada en el Controlador
    proyectoControlador.crearProyecto
);
//trae proyectos por usuario
router.get('/',
    auth,
    proyectoControlador.obtenerProyectosPorUsuario
);
//modificar un proyecto
router.put('/:id',
    auth,
    proyectoControlador.modificarProyecto
);
module.exports = router;