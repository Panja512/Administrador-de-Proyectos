import React, { useState, useEffect, Fragment, useContext } from "react";
import { EstilosComun } from "./../diseño/EstilosComun.js";
import { Copyright } from "./../diseño/EstilosComun.js";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import AssignmentIcon from "@material-ui/icons/Assignment";
import TimerIcon from "@material-ui/icons/Timer";
import EditIcon from '@material-ui/icons/Edit';
import NavigateBeforeTwoToneIcon from "@material-ui/icons/NavigateBeforeTwoTone";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import TareaContext from "./../../context/tareas/tareaContext";
import ProyectoContext from "./../../context/proyectos/proyectoContext";
import swal from 'sweetalert';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const NuevaTarea = () => {
  const tareasContext = useContext(TareaContext);
  const proyectosContext = useContext(ProyectoContext);
  const { proyecto_seleccionado } = proyectosContext;
  const {
    formulario_tarea,
    tarea_seleccionada,
    obtenerTareasPorProyecto,
    registrarTarea,
    modificarTarea
  } = tareasContext;
  /* use effect para detectar si hay una tarea seleccionada */
  useEffect(()=>{
    if (tarea_seleccionada !== null) {
      guardarTarea({
        ...tarea_seleccionada[0]
      });
    } else {
      guardarTarea({
        nombre: '',
        duracion: '',
      });
    }
  },[tarea_seleccionada]);

  /* state para controlar el contenido de los inputs */
  const [tarea, guardarTarea] = useState({
    nombre: "",
    duracion: "",
  });

  //extraemos los valores
  const { nombre, duracion } = tarea;
  //leer valores formulario
  const actualizarState = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const resetearFormTarea = () => {
    guardarTarea({
      nombre: "",
      duracion: "",
    });
    obtenerTareasPorProyecto(proyectoActual._id);
  };

  const onSubmitTareas = (e) => {
    e.preventDefault();
    if (tarea_seleccionada){
      swal("Operación completada","Tarea modificada correctamente","success");
    }
    else {
      swal("Operación completada","Tarea agregada correctamente","success");
    }
    if (tarea_seleccionada === null) {
      //a la nueva tarea debemos agregarle el id del proyecto y el estado
      //es tarea.proyecto debido a que en el backend definimos un atributo proyecto para tarea
      tarea.proyecto = proyectoActual._id;
      registrarTarea(tarea);
    } else {
      modificarTarea(tarea);
    }
    resetearFormTarea();
  };

  const estilos = EstilosComun();
  const copyright = Copyright();

  if (!proyecto_seleccionado) {
    return <h2></h2>;
  }
  // HAY QUE ACCEDER AL ARREGLO DE LOS PROYECTOS Y APLICAR ARRAY DESTRUCTURING
  const [proyectoActual] = proyecto_seleccionado;
  return (
    <ValidatorForm onSubmit={onSubmitTareas}>
      {formulario_tarea ? (
        <Fragment>
          <Container component="main" maxwidth="sm" />
          <Card className={estilos.card}>
            <div className={estilos.contenidoFormulario}>
              <form className={estilos.formulario} noValidate>
                <CardHeader align="center" title={tarea_seleccionada ? "Modificar tarea"
                :"Agregar tarea"}></CardHeader>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      autoFocus
                      variant="outlined"
                      fullWidth
                      validators={['required']}
                      errorMessages={['Ingrese el nombre de la tarea']}
                      margin="normal"
                      required
                      id="nombre"
                      label="Nombre de la tarea"
                      name="nombre"
                      value={nombre}
                      onChange={actualizarState}
                      autoComplete="nombre"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AssignmentIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      fullWidth
                      type="number"
                      variant="outlined"
                      margin="normal"
                      validators={['required', 'isNumber']}
                      errorMessages={['Ingrese la duración de la tarea','Sólo números!']}
                      required
                      id="duracion"
                      label="Duración aproximada de la tarea"
                      name="duracion"
                      value={duracion}
                      onChange={actualizarState}
                      autoComplete="duracion"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TimerIcon />
                          </InputAdornment>
                        ),
                        endAdornment: "hs",
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} justify="center">
                  <Grid item sm={4} xs={12}>
                    <Button
                      fullWidth
                      variant={tarea_seleccionada ? "contained": "outlined"}
                      type="submit"
                      className={estilos.boton}
                      color="primary"
                    >
                      {tarea_seleccionada ? <EditIcon />
                      : <PlaylistAddCheckIcon/>}
                      {tarea_seleccionada ? "MODIFICAR":
                      "REGISTRAR"}
                    </Button>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => resetearFormTarea()}
                      className={estilos.boton}
                    >
                      <NavigateBeforeTwoToneIcon />
                      Volver a tareas
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
            <div>{copyright}</div>
          </Card>
        </Fragment>
      ) : null}
    </ValidatorForm>
  );
};

export default NuevaTarea;
