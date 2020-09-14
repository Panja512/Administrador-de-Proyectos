import {
    FORMULARIO_PROYECTO,
    SELECCIONAR_PROYECTO_ACTUAL,
    LISTA_PROYECTO,
    REGISTRAR_PROYECTO,
    MODIFICAR_PROYECTO,
    ELIMINAR_PROYECTO
  } from "../../types";
  
  export default (state, action) => {
    switch (action.type) {
      case FORMULARIO_PROYECTO:
        return {
          ...state,
          formulario_proyecto: true,
          lista_proyecto: false,
        };
      case REGISTRAR_PROYECTO:
        return {
          ...state,
          proyectos: [...state.proyectos, action.payload],
        };
      case MODIFICAR_PROYECTO:
        return {
          ...state,
          proyectos: state.proyectos.map(proyecto => proyecto._id === action.payload._id ?
          action.payload : proyecto),
        };
      case ELIMINAR_PROYECTO:
        return {
          ...state,
          /*     A PARTIR DE ESTE FILTRO SOLAMENTE NOS MOSTRARÁ TODOS LOS PROYECTOS MENOS
              EL QUE SELECCIONEMOS Y QUE COINCIDA CON EL ID */
          proyectos: state.proyectos.filter(
            (proyecto_seleccionado) => proyecto_seleccionado._id !== action.payload
          ),
        };
      case SELECCIONAR_PROYECTO_ACTUAL:
        return {
          ...state,
          /*                A PARTIR DE ESTE FILTRO SOLAMENTE NOS MOSTRARÁ EL PROYECTO QUE SELECCIONEMOS Y QUE 
                  COINCIDA CON EL ID */
          proyecto_seleccionado: state.proyectos.filter(
            (proyecto_seleccionado) => proyecto_seleccionado._id === action.payload
          ),
          lista_proyecto: false
        };
      case LISTA_PROYECTO:
        return {
          ...state,
          proyectos: action.payload,
          formulario_proyecto: false,
          proyecto_seleccionado: null,
          lista_proyecto: true,
        };
      default:
        return state;
    }
  };
  