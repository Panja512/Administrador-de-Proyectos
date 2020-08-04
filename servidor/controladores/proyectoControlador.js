const Proyecto = require('../modelos/Proyecto.js');
const { restart } = require('nodemon');
const { validationResult } = require('express-validator');
exports.crearProyecto = async(req,res) => {
    //revisamos si hay errores, en caso de que haya lo colocamos en un array que mostrará dichos errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()});
    }
    try {
        //creamos un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        //vamos a guardar el creador del proyecto
        proyecto.creador = req.usuario.id;
        proyecto.save();
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
//obtener todos los proyectos del usuario actual
exports.obtenerProyectosPorUsuario = async(req,res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id});
        res.json(proyectos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};