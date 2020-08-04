const express = require('express');
const router = express.Router();
const tareaControlador = require('./../controladores/tareaControlador.js');
const auth = require('../middleware/auth.js');
const { check } = require('express-validator');

//crear una tarea
// /api/tareas
router.post('/',
    auth,
    [
        //hacemos la validación de la información
        check('nombre','El nombre de la tarea es obligatorio').not().isEmpty(),
        check('duracion','Ingrese una duración válida').isInt()
    ],
    tareaControlador.crearTarea
);
//obtener tareas por proyectos
router.get('/',
    auth,
    tareaControlador.obtenerTareasPorProyecto    
);
//modificar una tarea
router.put('/:id',
    auth,
    tareaControlador.modificarTarea
);
module.exports = router;