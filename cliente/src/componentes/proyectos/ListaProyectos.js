import React, { useContext, Fragment, useEffect } from "react";
import { EstilosComun } from "./../diseño/EstilosComun.js";
import { Copyright } from "./../diseño/EstilosComun.js";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Proyecto from "./Proyecto.js";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import ProyectoContext from "./../../context/proyectos/proyectoContext";
import Zoom from '@material-ui/core/Zoom';
/* este componente permitirá listar los proyectos que tengamos registrados en la base de datos, 
discriminados por el usuario que se loguea, se vincula directamente con Proyecto.js*/
const ListaProyectos = () => {
  const estilos = EstilosComun();
  const copyright = Copyright();
  const proyectosContext = useContext(ProyectoContext);
  const {
    proyectos,
    lista_proyecto,
    mostrarListaProyectos,
    mostrarFormularioProyectos,
  } = proyectosContext;
  useEffect(()=>{
    mostrarListaProyectos();
  },[]);
  return (
    <Fragment>
      {lista_proyecto ? (
        <Fragment>
          <Container component="main" maxwidth="sm" />
          <Card className={estilos.card} xs={12} md={6}>
            <Grid container spacing={2} justify="center">
              <Grid item xs={12}>
                &nbsp;
                {proyectos.length > 0 ? (
                  <Zoom in={true} timeout={300}>
                    <List>
                      <Typography variant="h5" align="center">
                        Proyectos registrados
                      </Typography>
                      {/* RECORREMOS EL ARREGLO QUE CREAMOS ARRIBA CON EL OPERADOR MAP, PARA PODER MANDARLO
                  HACIA EL COMPONENTE PROYECTO.JS, ENTONCES MANDAREMOS TODOS LOS OBJETOS QUE FORMAN
                  PARTE DEL ARREGLO PARA QUE EL OTRO COMPONENTE LOS MUESTRE*/}
                      {proyectos.map((proyecto) => (
                            <Proyecto key={proyecto._id} proyecto={proyecto}/>
                          ))}
                  </List>
                  </Zoom>
                ) : (
                  <Alert severity="info">
                    No hay proyectos registrados—{" "}
                    <strong>Registre uno para continuar</strong>
                  </Alert>
                )}
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  className={estilos.boton}
                  color="primary"
                  onClick={() => mostrarFormularioProyectos()}
                >
                  <AddCircleOutlineTwoToneIcon />
                  Nuevo proyecto
                </Button>
              </Grid>
            </Grid>
            <div>{copyright}</div>
          </Card>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default ListaProyectos;