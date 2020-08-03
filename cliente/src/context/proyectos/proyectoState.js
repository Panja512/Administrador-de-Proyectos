import React, { useReducer } from "react";
import ProyectoContext from "./proyectoContext";
import ProyectoReducer from "./proyectoReducer";
import { v4 as uuid } from "uuid";

import {
  FORMULARIO_PROYECTO,
  LISTA_PROYECTO,
  VALIDAR_FORMULARIO_PROYECTO,
  SELECCIONAR_PROYECTO_ACTUAL,
  REGISTRAR_PROYECTO,
  MODIFICAR_PROYECTO,
  ELIMINAR_PROYECTO,
} from "../../types";

const ProyectoState = (props) => {
  const initialState = {
    proyectos: [
      {
        nombre: "Sistema de control de stock",
        duracion: "2000",
        fechaInicioProyecto: "2020-07-25",
        fechaFinProyecto: "2020-10-22",
        id: 1,
      },
      {
        nombre: "Sistema contable",
        duracion: "2500",
        fechaInicioProyecto: "2020-08-25",
        fechaFinProyecto: "2020-11-10",
        id: 2,
      },
      {
        nombre: "E-commerce",
        duracion: "2000",
        fechaInicioProyecto: "2020-09-25",
        fechaFinProyecto: "2020-12-09",
        id: 3,
      },
    ],
    proyecto_seleccionado: null,
    formulario_proyecto: false,
    error_formulario_proyecto: false,
    lista_proyecto: true,
  };

  //dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(ProyectoReducer, initialState);
  //funciones para CRUD
  //mostrar Formulario de proyectos
  const mostrarFormularioProyectos = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };
  //mostrar proyectos
  const mostrarListaProyectos = () => {
    dispatch({
      type: LISTA_PROYECTO,
    });
  };
  //al seleccionar un proyecto en la lista de proyectos
  const seleccionarProyecto = (proyectoId) => {
    dispatch({
      type: SELECCIONAR_PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };
  //Registrar nuevo proyecto
  const registrarProyecto = (proyecto) => {
    proyecto.id = uuid();
    //insertamos el proyecto en el state
    dispatch({
      type: REGISTRAR_PROYECTO,
      payload: proyecto,
    });
  };
  //Modificar un proyecto seleccionado
  const modificarProyecto = (proyecto) => {
    //modificamos el proyecto seleccionado
    dispatch({
      type: MODIFICAR_PROYECTO,
      payload: proyecto,
    });
  };
  //Eliminar un proyecto desde la lista de proyectos
  const eliminarProyecto = (proyectoId) => {
    dispatch({
      type: ELIMINAR_PROYECTO,
      payload: proyectoId,
    });
  };
  //validaciones de error
  const mostrarErrorProyecto = () => {
    dispatch({
      type: VALIDAR_FORMULARIO_PROYECTO,
    });
  };
  return (
    <ProyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario_proyecto: state.formulario_proyecto,
        proyecto_seleccionado: state.proyecto_seleccionado,
        error_formulario_proyecto: state.error_formulario_proyecto,
        lista_proyecto: state.lista_proyecto,
        registrarProyecto,
        modificarProyecto,
        eliminarProyecto,
        seleccionarProyecto,
        mostrarFormularioProyectos,
        mostrarErrorProyecto,
        mostrarListaProyectos,
      }}
    >
      {/* todo lo que se tenga en este componente proyectoContext se pasará a cada uno de los nodos
            hijos */}
      {props.children}
    </ProyectoContext.Provider>
  );
};
export default ProyectoState;
