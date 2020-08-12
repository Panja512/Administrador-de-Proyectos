import {
    OBTENER_INFO_USUARIO,
    LOGIN_ERRONEO,
    LOGIN_EXITOSO,
    BORRAR_MENSAJES,
    REGISTRO_ERRONEO,
    REGISTRO_EXITOSO
} from './../../types/index.js';

export default (state, action) => {
    switch(action.type){
        case OBTENER_INFO_USUARIO:
            return{
                ...state,
                usuario_info: action.payload
            };
        case BORRAR_MENSAJES:
            return{
                mensaje_login: null,
                mensaje_registro: null
        };
        case LOGIN_ERRONEO:
            return{
                ...state,
                mensaje_login: action.payload,
                autenticado: false,
            };
        case LOGIN_EXITOSO:
            //PASAREMOS EL TOKEN GENERADO EN EL LADO DEL SERVIDOR
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                autenticado: true
            };
        case REGISTRO_ERRONEO:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                mensaje_registro: action.payload,
                autenticado: false
            };
        case REGISTRO_EXITOSO:
            return{
                ...state,
                registrado: true
            };
        default:
            return state;
    }
};