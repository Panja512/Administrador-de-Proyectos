import React, { useState, useEffect, useContext, Fragment } from "react";
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
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import NavigateBeforeTwoToneIcon from "@material-ui/icons/NavigateBeforeTwoTone";
import EditIcon from '@material-ui/icons/Edit';
import ProyectoContext from "./../../context/proyectos/proyectoContext";
import swal from 'sweetalert';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const NuevoProyecto = () => {
  //obtener el state del formulario
  const proyectosContext = useContext(ProyectoContext);
  const {
    formulario_proyecto,
    proyecto_seleccionado,
    mostrarListaProyectos,
    registrarProyecto,
    modificarProyecto
  } = proyectosContext;

    /* use effect para detectar si hay un proyecto seleccionado y cargar los inputs*/
    useEffect(()=>{
      if (proyecto_seleccionado !== null) {
        guardarProyecto({
          ...proyecto_seleccionado[0]
        });
      } else {
        guardarProyecto({
          nombre: '',
          duracion: '',
        });
      }
    },[proyecto_seleccionado])

    /* state para controlar el contenido de los inputs */
    const [proyecto, guardarProyecto] = useState({
      nombre: "",
      duracion: "",
    });

    //iniciamos las variables para los inputs
    const {nombre, duracion} = proyecto;

    const actualizarState = (e) => {
      guardarProyecto({
        nombre,
        duracion,
        [e.target.name]: e.target.value,
      });
    };
    // para registrar el formulario y volver a mostrar la lista de los proyectos
    const resetearFormProyecto = () => {
      guardarProyecto({
        nombre: "",
        duracion: "",
      });
    };

    const onSubmitProyecto = (e) => {
      e.preventDefault();
      if (proyecto_seleccionado === null) {
        registrarProyecto(proyecto);
      } else {
        proyecto._id = proyecto_seleccionado[0]._id
        proyecto.creador = proyecto_seleccionado[0].creador
        modificarProyecto(proyecto);
      }
      if (proyecto_seleccionado) {
        swal("Operación completada","Proyecto modificado correctamente","success");

      } else {
        swal("Operación completada","Proyecto registrado correctamente","success");
      }
      //reseteamos el formulario
      resetearFormProyecto();
    };

    const estilos = EstilosComun();
    const copyright = Copyright();
  
  return (
    <ValidatorForm onSubmit={onSubmitProyecto}>
      {formulario_proyecto ? (
        <Fragment>
          <Container component="main" maxwidth="sm" />
          <Card className={estilos.card}>
            <div className={estilos.contenidoFormulario}>
              <form className={estilos.formulario} noValidate>
                <CardHeader
                  align="center"
                  title={proyecto_seleccionado ? "Modificar proyecto":
                  "Registrar nuevo proyecto"}
                ></CardHeader>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      autoFocus
                      variant="outlined"
                      fullWidth
                      validators={['required']}
                      errorMessages={['Ingrese el nombre del proyecto']}
                      margin="normal"
                      id="nombre"
                      label="Nombre del proyecto"
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
                      variant="outlined"
                      margin="normal"
                      validators={['required', 'isNumber']}
                      errorMessages={['Ingrese la duración del proyecto','Sólo números!']}
                      required
                      id="duracion"
                      label="Duración del proyecto"
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
                      variant={proyecto_seleccionado ? "contained":"outlined"}
                      type="submit"
                      className={estilos.boton}
                      color="primary"
                    >
                       {proyecto_seleccionado ? <EditIcon />
                      : <PlaylistAddCheckIcon/>}
                      {proyecto_seleccionado ? "MODIFICAR":
                      "REGISTRAR"}
                    </Button>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      className={estilos.boton}
                      onClick={mostrarListaProyectos}
                    >
                      <NavigateBeforeTwoToneIcon />
                      Volver a proyectos
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

export default NuevoProyecto;
