import {
    LISTA_TAREAS_POR_PROYECTO,
    FORMULARIO_TAREA,
    VALIDAR_FORMULARIO_TAREAS,
    REGISTRAR_TAREA,
    SELECCIONAR_TAREA_ACTUAL,
    MODIFICAR_TAREA,
    ELIMINAR_TAREA,
  } from "../../types";
  
  export default (state, action) => {
    switch (action.type) {
      case LISTA_TAREAS_POR_PROYECTO:
        return {
          ...state,
          formulario_tarea: false,
          tareasxproyecto: state.tareas.filter(
            (tarea) => tarea.proyectoId === action.payload
          ),
          lista_tareas: true,
          tarea_seleccionada: null,
          error_formulario_tareas: false,
        };
      case FORMULARIO_TAREA:
        return {
          ...state,
          formulario_tarea: true,
          lista_tareas: false,
          error_formulario_tareas: false,
        };
      case VALIDAR_FORMULARIO_TAREAS:
        return {
          ...state,
          error_formulario_tareas: true,
        };
      case REGISTRAR_TAREA:
        return {
          ...state,
          tareas: [...state.tareas, action.payload],
          formulario_tarea: false,
          lista_tareas: true,
          error_formulario_tareas: false,
        };
      case SELECCIONAR_TAREA_ACTUAL:
        return {
          ...state,
          tarea_seleccionada: state.tareas.filter(
          (tarea_seleccionada) => tarea_seleccionada.id === action.payload
          ),
          lista_tareas: false
        }
      case MODIFICAR_TAREA:
        return {
          ...state,
          tareas: state.tareas.map(tarea => tarea.id === action.payload.id ?
          action.payload : tarea),
          lista_tareas: true,
        };
      case ELIMINAR_TAREA:
        return {
          ...state,
          /*     A PARTIR DE ESTE FILTRO SOLAMENTE NOS MOSTRARÁ TODAS LAS TAREAS MENOS
              LA QUE SELECCIONEMOS Y QUE COINCIDA CON EL ID */
  
          tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
        };
      default:
        return state;
    }
  };
  