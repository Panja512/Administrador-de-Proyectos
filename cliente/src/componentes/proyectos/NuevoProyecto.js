import React, { useState, useEffect, useContext, Fragment } from "react";
import { EstilosComun } from "./../diseño/EstilosComun.js";
import { Copyright } from "./../diseño/EstilosComun.js";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AssignmentIcon from "@material-ui/icons/Assignment";
import TimerIcon from "@material-ui/icons/Timer";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import NavigateBeforeTwoToneIcon from "@material-ui/icons/NavigateBeforeTwoTone";
import EditIcon from '@material-ui/icons/Edit';
import ProyectoContext from "./../../context/proyectos/proyectoContext";
import swal from 'sweetalert';

const NuevoProyecto = () => {
  //obtener el state del formulario
  const proyectosContext = useContext(ProyectoContext);

  const {
    formulario_proyecto,
    proyecto_seleccionado,
    mostrarErrorProyecto,
    mostrarListaProyectos,
    registrarProyecto,
    modificarProyecto
  } = proyectosContext;

  /* use effect para detectar si hay un proyecto seleccionado */
  useEffect(()=>{
    if (proyecto_seleccionado !== null) {
      guardarProyecto({
        ...proyecto_seleccionado[0]
      });
    } else {
      guardarProyecto({
        nombre: '',
        duracion: '',
        fechaInicioProyecto: '',
        fechaFinProyecto: ''
      })
    }
  },[proyecto_seleccionado])

  /* state para controlar el contenido de los inputs */
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
    duracion: "",
    fechaInicioProyecto: "",
    fechaFinProyecto: "",
  });
  const { nombre, duracion, fechaInicioProyecto, fechaFinProyecto } = proyecto;
  const actualizarState = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };
  // para registrar el formulario y volver a mostrar la lista de los proyectos
  const resetearFormProyecto = () => {
    guardarProyecto({
      nombre: "",
      duracion: "",
      fechaInicioProyecto: "",
      fechaFinProyecto: "",
    });
    mostrarListaProyectos();
  };

  const onSubmitProyecto = (e) => {
    e.preventDefault();
    //validamos el proyecto
    if (
      nombre.trim() === "" ||
      duracion.trim() === "" ||
      fechaInicioProyecto.trim() === "" ||
      fechaFinProyecto.trim() === ""
    ) {
      mostrarErrorProyecto();
      swal("Atención!","Debe completar todos los campos para continuar","warning");
      return;
    }
    else{
      if (proyecto_seleccionado) {
        swal("Operación completada","Proyecto modificado correctamente","success");

      } else {
        swal("Operación completada","Proyecto registrado correctamente","success");
      }
    }
   /*  para distinguir registro de modificación, si no hay un proyecto seleccionado registramos,
    sino modificamos */
    if (proyecto_seleccionado === null) {
    //agregamos al state
      registrarProyecto(proyecto);
    } else {
      modificarProyecto(proyecto);
    }
    //reseteamos el formulario
    resetearFormProyecto();
  };
  const estilos = EstilosComun();
  const copyright = Copyright();
  return (
    <Fragment>
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
                    <TextField
                      autoFocus
                      variant="outlined"
                      fullWidth
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
                    <TextField
                      fullWidth
                      type="number"
                      variant="outlined"
                      margin="normal"
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      margin="normal"
                      id="fechaInicio"
                      label="Fecha de inicio"
                      name="fechaInicioProyecto"
                      value={fechaInicioProyecto}
                      onChange={actualizarState}
                      onKeyDown={(e) => e.preventDefault()}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                        inputProps: {
                          min: new Date().toISOString().split("T")[0],
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      margin="normal"
                      id="fechaFin"
                      label="Fecha aproximada de finalización"
                      name="fechaFinProyecto"
                      value={fechaFinProyecto}
                      onChange={actualizarState}
                      onKeyDown={(e) => e.preventDefault()}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                        inputProps: {
                          min: new Date().toISOString().split("T")[0],
                        },
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
                      onClick={onSubmitProyecto}
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
                      onClick={() => resetearFormProyecto()}
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
    </Fragment>
  );
};

export default NuevoProyecto;
