import React, { Fragment, useContext, useEffect} from "react";
import Cabecera from "../diseño/Cabecera.js";
import NuevoProyecto from "../proyectos/NuevoProyecto.js";
import ListaProyectos from "../proyectos/ListaProyectos.js";
import ListaTareas from "./ListaTareas.js";
import NuevaTarea from "./NuevaTarea.js";
import AuthContext from './../../context/auth/authContext';

const Proyectos = () => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(()=>{
    usuarioAutenticado();
  },[]);

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
