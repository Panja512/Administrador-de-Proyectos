import React, { useContext, Fragment } from "react";
import { EstilosComun } from "./../diseño/EstilosComun.js";
import { Copyright } from "./../diseño/EstilosComun.js";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import NavigateBeforeTwoToneIcon from "@material-ui/icons/NavigateBeforeTwoTone";
import ProyectoContext from "./../../context/proyectos/proyectoContext";
import TareaContext from "./../../context/tareas/tareaContext";
import Zoom from '@material-ui/core/Zoom';
import Tarea from "./Tarea.js";
const ListaTareas = () => {
  /* este componente permitirá listar las tareas de un proyecto que seleccionamos y 
 que tengamos registrados en la base de datos, discriminados por el usuario que se loguea */
  const estilos = EstilosComun();
  const copyright = Copyright();
  const proyectosContext = useContext(ProyectoContext);
  const tareasContext = useContext(TareaContext);
  const { mostrarListaProyectos, proyecto_seleccionado, formulario_proyecto} = proyectosContext;
  const {
    obtenerTareasPorProyecto,
    lista_tareas,
    tareasxproyecto,
    mostrarFormularioTareas,
  } = tareasContext;

  if (!proyecto_seleccionado) {
    return <h2></h2>;
  }
  // HAY QUE ACCEDER AL ARREGLO DE LOS PROYECTOS Y APLICAR ARRAY DESTRUCTURING
  const [proyectoActual] = proyecto_seleccionado;

  return (
    <Fragment>
      {obtenerTareasPorProyecto && lista_tareas && !formulario_proyecto ? (
        <Fragment>
          <Container component="main" maxwidth="sm" />
          <Card className={estilos.card} xs={12} md={12} align="left">
            <Grid>
              <Grid item>
                &nbsp;
                <Typography variant="h5" align="center">
                  Proyecto: {proyectoActual.nombre}
                </Typography>
                &nbsp; &nbsp; &nbsp;
                {/* SI NO HAY TAREAS REGISTRADAS EN EL ARREGLO, ENTONCES MUESTRA EL MENSAJE DE QUE NO
      HAY TAREAS REGISTRADAS */}
                {tareasxproyecto.length > 0 ? (
                <Zoom in={true} timeout={300}>
                  <List>
                      <Typography variant="h6" align="center">
                        Tareas registradas
                      </Typography>
                      {tareasxproyecto.map((tareasxproyecto) => (
                        <Tarea tarea={tareasxproyecto} key={tareasxproyecto.id} />
                      ))}
                    </List>
                </Zoom>
                ) : (
                  <Alert severity="warning">No hay tareas registradas</Alert>
                )}
              </Grid>
              <div className={estilos.contenidoFormulario}>
                <form className={estilos.formulario} noValidate>
                  <Grid container spacing={1} justify="center">
                    <Grid item sm={4} xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        className={estilos.boton}
                        color="primary"
                        onClick={() => mostrarFormularioTareas()}
                      >
                        <AddCircleOutlineTwoToneIcon />
                        Nueva tarea
                      </Button>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                        className={estilos.boton}
                        onClick={() => mostrarListaProyectos()}
                      >
                        <NavigateBeforeTwoToneIcon />
                        Volver a proyectos
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Grid>
            <div>{copyright}</div>
          </Card>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default ListaTareas;
