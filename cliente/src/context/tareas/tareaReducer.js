import {
    LISTA_TAREAS_POR_PROYECTO,
    FORMULARIO_TAREA,
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
          tareasxproyecto: action.payload,
          lista_tareas: true,
          tarea_seleccionada: null,
        };
      case FORMULARIO_TAREA:
        return {
          ...state,
          formulario_tarea: true,
          lista_tareas: false,
        };
      case REGISTRAR_TAREA:
        return {
          ...state,
          tareasxproyecto: [...state.tareasxproyecto, action.payload],
        };
      case SELECCIONAR_TAREA_ACTUAL:
        return {
          ...state,
          tarea_seleccionada: state.tareasxproyecto.filter(
          (tarea_seleccionada) => tarea_seleccionada._id === action.payload
          ),
          lista_tareas: false
        }
      case MODIFICAR_TAREA:
        return {
          ...state,
          tareasxproyecto: state.tareasxproyecto.map(tarea => tarea._id === action.payload._id ?
          action.payload : tarea),
        };
      case ELIMINAR_TAREA:
        return {
          ...state,
          /*     A PARTIR DE ESTE FILTRO SOLAMENTE NOS MOSTRARÁ TODAS LAS TAREAS MENOS
              LA QUE SELECCIONEMOS Y QUE COINCIDA CON EL ID */
          tareasxproyecto: state.tareasxproyecto.filter((tarea) => tarea._id !== action.payload),
        };
      default:
        return state;
    }
  };
  