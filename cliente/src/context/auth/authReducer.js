import {
    OBTENER_INFO_USUARIO,
    LOGIN_ERRONEO,
    LOGIN_EXITOSO,
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
        case LOGIN_ERRONEO:
            return{
                ...state,
                mensaje_login: action.payload,
                mensaje_registro: null,
                autenticado: false
            };
        case LOGIN_EXITOSO:
            return{

            };
        case REGISTRO_ERRONEO:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                mensaje_registro: action.payload,
                mensaje_login: null,
                autenticado: false
            };
        case REGISTRO_EXITOSO:
            //PASAREMOS EL TOKEN GENERADO EN EL LADO DEL SERVIDOR
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                autenticado: true
            };
        default:
            return state;
    }
};