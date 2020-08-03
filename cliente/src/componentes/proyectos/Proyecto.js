import React, { useContext } from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import Divider from "@material-ui/core/Divider";
import ProyectoContext from "./../../context/proyectos/proyectoContext";
import TareaContext from "./../../context/tareas/tareaContext";
import swal from 'sweetalert';
/* este componente permite manejar el nombre y la fecha de inicio de los proyectos, se vincula
directamente con ListaProyectos.js*/
const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(ProyectoContext);
  const tareasContext = useContext(TareaContext);
  const {
    seleccionarProyecto,
    eliminarProyecto,
    mostrarFormularioProyectos
  } = proyectosContext;
  const { obtenerTareasPorProyecto } = tareasContext;
  //funcion que permite tanto seleccionar el proyecto y mostrar las tareas asociadas
  const seleccionarProyectoMostrarTareas = (id) => {
    seleccionarProyecto(id); //filtra el proyecto actual
    obtenerTareasPorProyecto(id); //muestra las tareas asociadas
  };
  //funcion que permite tanto seleccionar el proyecto y poder modificarlo
  const seleccionarProyectoModificar = (id) => {
    seleccionarProyecto(id); //filtra el proyecto actual
    mostrarFormularioProyectos();
  };
  const eliminarProyectoSeleccionado = (id) => {
    swal({
      title: "¿Está seguro?",
      text: "Una vez que elimine, no podrá recuperar la información del proyecto ni sus tareas asociadas.",
      icon: "warning",
      buttons: ["Cancelar","Confirmar"],
      dangerMode: true,
    })
    .then((eliminar) => {
      if (eliminar) {
        eliminarProyecto(id);
        swal("Operación completada","El proyecto ha sido eliminado","success");
      } else {
        swal("Operación cancelada");
      }
    });  }
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AssignmentIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={proyecto.nombre}
          secondary={
            <>
              <Typography>Inicio: {proyecto.fechaInicioProyecto}</Typography>
              <Typography>Duración en horas: {proyecto.duracion}</Typography>
              <Typography>Fin: {proyecto.fechaFinProyecto}</Typography>
            </>
          }
        />
        <ListItemSecondaryAction>
          <Tooltip title="Ver tareas">
            <IconButton
              color="primary"
              edge="end"
              onClick={() => seleccionarProyectoMostrarTareas(proyecto.id)}
            >
              <FormatListNumberedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Modificar proyecto">
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => seleccionarProyectoModificar(proyecto.id)}
            >
              <EditTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar proyecto">
            <IconButton
              color="secondary"
              edge="end"
              aria-label="delete"
              onClick={() => eliminarProyectoSeleccionado(proyecto.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default Proyecto;
