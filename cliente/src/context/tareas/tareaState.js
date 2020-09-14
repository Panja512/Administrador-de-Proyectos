import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import clienteAxios from './../../config/axios';

import {
  LISTA_TAREAS_POR_PROYECTO,
  FORMULARIO_TAREA,
  SELECCIONAR_TAREA_ACTUAL,
  REGISTRAR_TAREA,
  MODIFICAR_TAREA,
  ELIMINAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareasxproyecto: [],
    tarea_seleccionada: null,
    formulario_tarea: false,
    lista_tareas: false,
    error_formulario_tareas: false,
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //obtener tareas por proyecto
  const obtenerTareasPorProyecto = async(proyecto) => {
    try {
      const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
      dispatch({
        type: LISTA_TAREAS_POR_PROYECTO,
        payload: resultado.data.tareasxproyecto,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //mostrar Formulario de tareas
  const mostrarFormularioTareas = () => {
    dispatch({
      type: FORMULARIO_TAREA,
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
  const registrarTarea = async (tarea) => {
    try {
      //insertamos la tarea en el state
      const resultado = await clienteAxios.post('/api/tareas', tarea);
      dispatch({
        type: REGISTRAR_TAREA,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Modificar tarea
  const modificarTarea = async (tarea) => {
    const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
    try {
    //modificamos la tarea seleccionada
    dispatch({
      type: MODIFICAR_TAREA,
      payload: resultado.data
    });
    } catch (error) {
      console.log(error);
    }

  };
  //Eliminar tarea
  const eliminarTarea = async (id, proyecto) => {
    await clienteAxios.delete(`/api/tareas/${id}`, { params: {proyecto}});
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        formulario_tarea: state.formulario_tarea,
        lista_tareas: state.lista_tareas,
        tarea_seleccionada: state.tarea_seleccionada,
        tareasxproyecto: state.tareasxproyecto,
        obtenerTareasPorProyecto,
        mostrarFormularioTareas,
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
