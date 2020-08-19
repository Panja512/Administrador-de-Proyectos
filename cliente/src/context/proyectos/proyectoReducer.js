import {
    FORMULARIO_PROYECTO,
    VALIDAR_FORMULARIO_PROYECTO,
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
          error_formulario_proyecto: false,
        };
      case VALIDAR_FORMULARIO_PROYECTO:
        return {
          ...state,
          error_formulario_proyecto: true,
        };
      case REGISTRAR_PROYECTO:
        return {
          ...state,
          proyectos: [...state.proyectos, action.payload],
          formulario_proyecto: false,
          lista_proyecto: true,
          error_formulario_proyecto: false,
        };
      case MODIFICAR_PROYECTO:
        return {
          ...state,
          proyectos: state.proyectos.map(proyecto => proyecto.id === action.payload.id ?
          action.payload : proyecto),
          lista_proyecto: true,
        };
      case ELIMINAR_PROYECTO:
        return {
          ...state,
          /*     A PARTIR DE ESTE FILTRO SOLAMENTE NOS MOSTRARÁ TODOS LOS PROYECTOS MENOS
              EL QUE SELECCIONEMOS Y QUE COINCIDA CON EL ID */
          proyectos: state.proyectos.filter(
            (proyecto_seleccionado) => proyecto_seleccionado.id !== action.payload
          ),
        };
      case SELECCIONAR_PROYECTO_ACTUAL:
        return {
          ...state,
          /*                A PARTIR DE ESTE FILTRO SOLAMENTE NOS MOSTRARÁ EL PROYECTO QUE SELECCIONEMOS Y QUE 
                  COINCIDA CON EL ID */
          proyecto_seleccionado: state.proyectos.filter(
            (proyecto_seleccionado) => proyecto_seleccionado.id === action.payload
          ),
          lista_proyecto: false
        };
      case LISTA_PROYECTO:
        console.log(action.payload);
        return {
          ...state,
          proyectos: action.payload,
          formulario_proyecto: false,
          proyecto_seleccionado: null,
          lista_proyecto: true,
          error_formulario_proyecto: false,
        };
      default:
        return state;
    }
  };
  