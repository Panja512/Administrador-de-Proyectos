const Tarea = require('./../modelos/Tarea.js');
const Proyecto = require('./../modelos/Proyecto.js');
const { validationResult } = require('express-validator');
//creamos una nueva tarea
exports.crearTarea = async(req,res) => {
    //revisamos si hay errores, en caso de que haya lo colocamos en un array que mostrará dichos errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()});
    }
    try {
    //Extraemos el proyecto y vemos si existe o no
        const { proyecto } = req.body;
        // le pasamos como parámetro el proyecto que extrajimos
        const existeProyecto = await Proyecto.findById(proyecto);

        if (!existeProyecto){
            return res.status(404).json({mensaje: 'Proyecto no encontrado'});
        }
        //también debemos verificar que el proyecto pertenezca al usuario que está autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({mensaje: 'Usuario no autorizado'});
        }
        //creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({mensaje:'La tarea ha sido agregada correctamente'});
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
exports.obtenerTareasPorProyecto = async (req,res) => {
    //revisamos si hay errores, en caso de que haya lo colocamos en un array que mostrará dichos errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()});
    }
    try {
    //Extraemos el proyecto y vemos si existe o no
        const { proyecto } = req.body;
        // le pasamos como parámetro el proyecto que extrajimos
        const existeProyecto = await Proyecto.findById(proyecto);

        if (!existeProyecto){
            return res.status(404).json({mensaje: 'Proyecto no encontrado'});
        }
        //también debemos verificar que el proyecto pertenezca al usuario que está autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({mensaje: 'Usuario no autorizado'});
        }
        //obtenemos las tareas del proyecto asociado
        const tareasxproyecto = await Tarea.find({ proyecto });
        res.json({ tareasxproyecto });
    }
    catch (error){
        console.log(error);
        res.status(500).send('Hubo un error al obtener las tareas');
    }
};
exports.modificarTarea = async (req,res) => {
    //revisamos si hay errores, en caso de que haya lo colocamos en un array que mostrará dichos errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()});
    }
    //array destructuring para sacar información de la tarea
    const { nombre, duracion, estado, proyecto} = req.body;
    const nuevaTarea = {};
    if(nombre){
        nuevaTarea.nombre = nombre;
    }
    if(duracion){
        nuevaTarea.duracion = duracion;
    }
    if(estado){
        nuevaTarea.estado = estado;
    }
    try {
        //revisamos el ID del proyecto
        let tarea = await Tarea.findById(req.params.id);
        //revisamos si el proyecto existe o no
        if(!tarea){
            return res.status(404).json({mensaje:'Tarea no encontrada'});
        }
        //guardamos en una variable el proyecto perteneciente a la tarea
        const existeProyecto = await Proyecto.findById(proyecto);
        //el proyecto existe, entonces debemos verificar que pertenezca a un usuario
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({mensaje:'Usuario no autorizado'});
        }
        //modificamos la tarea (le tenemos que pasar el id y definir el nuevo valor)
        tarea = await Tarea.findByIdAndUpdate({_id: req.params.id}, { $set: nuevaTarea},
        { new: true});
        res.json({mensaje: 'La tarea ha sido modificada correctamente'});
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar la tarea');
    }
};
