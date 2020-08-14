import {
    OBTENER_INFO_USUARIO,
    LOGIN_ERRONEO,
    LOGIN_EXITOSO,
    CERRAR_SESION,
    BORRAR_MENSAJES,
    REGISTRO_ERRONEO,
    REGISTRO_EXITOSO
} from './../../types/index.js';

export default (state, action) => {
    switch(action.type){
        case OBTENER_INFO_USUARIO:
            return{
                ...state,
                usuario_info: action.payload,
                autenticado: true,
                cargando: false
            };
        case BORRAR_MENSAJES:
            return{
                mensaje_login: null,
                mensaje_registro: null,
                cargando: false
        };
        case LOGIN_ERRONEO:
            return{
                ...state,
                mensaje_login: action.payload,
                autenticado: false,
                cargando: false
            };
        case LOGIN_EXITOSO:
            //PASAREMOS EL TOKEN GENERADO EN EL LADO DEL SERVIDOR
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                token: localStorage.getItem('token'),
                autenticado: true,
                registrado: false,
                mensaje_login: null,
                cargando: false
            };
        case REGISTRO_ERRONEO:
            return{
                ...state,
                mensaje_registro: action.payload,
                registrado: false,
                cargando:false
            };
        case REGISTRO_EXITOSO:
            return{
                ...state,
                registrado: true,
                mensaje_registro: null,
                cargando:false
            };
        case CERRAR_SESION:
            return{
                autenticado: false,
                token: null,
                registrado: false,
                usuario_info: null,
                mensaje_registro: null,
                mensaje_login: null,
                cargando: false
            }
        default:
            return state;
    }
};