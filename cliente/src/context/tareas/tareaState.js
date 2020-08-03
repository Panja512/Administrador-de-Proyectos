import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import {
  LISTA_TAREAS_POR_PROYECTO,
  FORMULARIO_TAREA,
  VALIDAR_FORMULARIO_TAREAS,
  SELECCIONAR_TAREA_ACTUAL,
  REGISTRAR_TAREA,
  MODIFICAR_TAREA,
  ELIMINAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareas: [
      {
        nombreTarea: "Diseño de interfaces",
        duracionTarea: "100",
        estado: true,
        id: 1,
        proyectoId: 1,
      },
      {
        nombreTarea: "Desarrollo de funcionalidad de registrar pago",
        duracionTarea: "250",
        estado: false,
        id: 2,
        proyectoId: 2,
      },
      {
        nombreTarea: "Prueba de funcionalidad",
        duracionTarea: "120",
        estado: false,
        id: 3,
        proyectoId: 3,
      },
      {
        nombreTarea: "Puesta en producción",
        duracionTarea: "100",
        estado: true,
        id: 4,
        proyectoId: 4,
      },
      {
        nombreTarea: "Diseño de interfaces",
        duracionTarea: "100",
        estado: true,
        id: 5,
        proyectoId: 2,
      },
      {
        nombreTarea: "Desarrollo de funcionalidad de registrar pago",
        duracionTarea: "250",
        estado: false,
        id: 6,
        proyectoId: 3,
      },
      {
        nombreTarea: "Prueba de funcionalidad",
        duracionTarea: "120",
        estado: false,
        id: 7,
        proyectoId: 1,
      },
      {
        nombreTarea: "Puesta en producción",
        duracionTarea: "100",
        estado: true,
        id: 8,
        proyectoId: 1,
      },
      {
        nombreTarea: "Diseño de interfaces",
        duracionTarea: "100",
        estado: true,
        id: 9,
        proyectoId: 3,
      },
      {
        nombreTarea: "Desarrollo de funcionalidad de registrar pago",
        duracionTarea: "250",
        estado: false,
        id: 10,
        proyectoId: 4,
      },
      {
        nombreTarea: "Prueba de funcionalidad",
        duracionTarea: "120",
        estado: false,
        id: 11,
        proyectoId: 2,
      },
      {
        nombreTarea: "Puesta en producción",
        duracionTarea: "100",
        estado: true,
        id: 12,
        proyectoId: 1,
      },
    ],
    tareasxproyecto: null,
    tarea_seleccionada: null,
    formulario_tarea: false,
    lista_tareas: false,
    error_formulario_tareas: false,
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //obtener tareas por proyecto
  const obtenerTareasPorProyecto = (proyectoId) => {
    dispatch({
      type: LISTA_TAREAS_POR_PROYECTO,
      payload: proyectoId,
    });
  };
  //mostrar Formulario de tareas
  const mostrarFormularioTareas = () => {
    dispatch({
      type: FORMULARIO_TAREA,
    });
  };
  //validar Formulario de tareas
  const mostrarErrorTareas = () => {
    dispatch({
      type: VALIDAR_FORMULARIO_TAREAS,
    });
  };
  // al seleccionar una tarea en la lista de tareas
  const seleccionarTarea = (tareaId) => {
    dispatch({
      type: SELECCIONAR_TAREA_ACTUAL,
      payload: tareaId
    });
  };
  //Registrar nueva tarea
  const registrarTarea = (tarea) => {
    tarea.id = uuid();
    //insertamos la tarea en el state
    dispatch({
      type: REGISTRAR_TAREA,
      payload: tarea,
    });
  };
  //Modificar tarea
  const modificarTarea = (tarea) => {
    //modificamos la tarea seleccionada
    dispatch({
      type: MODIFICAR_TAREA,
      payload: tarea
    });
  };
  const eliminarTarea = (id) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        formulario_tarea: state.formulario_tarea,
        lista_tareas: state.lista_tareas,
        tarea_seleccionada: state.tarea_seleccionada,
        tareasxproyecto: state.tareasxproyecto,
        error_formulario_tareas: state.error_formulario_tareas,
        obtenerTareasPorProyecto,
        mostrarFormularioTareas,
        mostrarErrorTareas,
        registrarTarea,
        seleccionarTarea,
        modificarTarea,
        eliminarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};
export default TareaState;
