import React, { Fragment } from "react";
import Cabecera from "../diseño/Cabecera.js";
import NuevoProyecto from "../proyectos/NuevoProyecto.js";
import ListaProyectos from "../proyectos/ListaProyectos.js";
import ListaTareas from "./ListaTareas.js";
import NuevaTarea from "./NuevaTarea.js";
const Proyectos = () => {
  return (
    <Fragment>
      <Cabecera />
      &nbsp;
      <ListaProyectos />
      <NuevoProyecto />
      <ListaTareas />
      <NuevaTarea />
      &nbsp;
    </Fragment>
  );
};

export default Proyectos;
