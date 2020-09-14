import React, { useState, useContext } from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListIcon from "@material-ui/icons/List";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import TareaContext from "./../../context/tareas/tareaContext";
import ProyectoContext from "./../../context/proyectos/proyectoContext";
import swal from 'sweetalert';
/* este componente permite manejar el nombre y la fecha de inicio de las tareas de un proyecto, se vincula
directamente con ListaTareas.js*/
const Tarea = ({ tarea }) => {
  const tareasContext = useContext(TareaContext);
  const proyectosContext = useContext(ProyectoContext);
  const { eliminarTarea, seleccionarTarea, mostrarFormularioTareas, obtenerTareasPorProyecto } = tareasContext;
  const { proyecto_seleccionado } = proyectosContext;
  const [deshabilitado, deshabilitarCheck] = useState(false);

  if (!proyecto_seleccionado) {
    return <h2></h2>;
  }
  // HAY QUE ACCEDER AL ARREGLO DE LOS PROYECTOS Y APLICAR ARRAY DESTRUCTURING
  const [proyectoActual] = proyecto_seleccionado;

  const onCheckClick = () => {
    deshabilitarCheck(!deshabilitado);
    tarea.estado = true;
    obtenerTareasPorProyecto(proyectoActual._id);
  };
  const seleccionarTareaModificar = (id) => {
    seleccionarTarea(id);
    mostrarFormularioTareas();
  }
  //eliminamos una tarea y se actualiza la lista de tareas
  const eliminarTareaActualizarLista = (id) => {
    swal({
      title: "¿Está seguro?",
      text: "Una vez que elimine, no podrá recuperar la tarea seleccionada",
      icon: "warning",
      buttons: ["Cancelar","Confirmar"],
      dangerMode: true,
    })
    .then((eliminar) => {
      if (eliminar) {
        eliminarTarea(id, proyectoActual._id);
        swal("Operación completada","La tarea ha sido eliminada","success");
        obtenerTareasPorProyecto(proyectoActual._id);
      } else {
        swal("Operación cancelada");
      }
    }); 
  };

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ListIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={tarea.nombre}
          secondary={
            <>
              <Typography>Duración en horas: {tarea.duracion}</Typography>
            </>
          }
        />
        <Container>
          <ListItemSecondaryAction>
            {tarea.estado ? (
              <FormControlLabel
                control={
                  <Switch color="primary" checked={!deshabilitado} disabled />
                }
                label="Completa"
              />
            ) : (
              <FormControlLabel
                control={<Switch color="secondary" onChange={onCheckClick} />}
                label="Incompleta"
              />
            )}
            <Tooltip title="Modificar tarea">
              <IconButton
              color="inherit"
              edge="end"
              onClick={() => seleccionarTareaModificar(tarea._id)}
              >
                <EditTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar tarea">
              <IconButton
                color="secondary"
                edge="end"
                aria-label="delete"
                onClick={() => eliminarTareaActualizarLista(tarea._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </Container>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default Tarea;
