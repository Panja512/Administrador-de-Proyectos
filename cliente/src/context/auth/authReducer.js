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

            };
        case LOGIN_ERRONEO:
            return{

            };
        case LOGIN_EXITOSO:
            return{

            };
        case REGISTRO_ERRONEO:
            return{
                ...state,
                token: null,
                mensaje: action.payload
            };
        case REGISTRO_EXITOSO:
            //PASAREMOS EL TOKEN GENERADO EN EL LADO DEL SERVIDOR
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                autenticado: true,
                mensaje: null
            };
        default:
            return state;
    }
};