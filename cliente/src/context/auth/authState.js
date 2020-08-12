import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { REGISTRO_ERRONEO, REGISTRO_EXITOSO, LOGIN_ERRONEO, BORRAR_MENSAJES, LOGIN_EXITOSO, OBTENER_INFO_USUARIO } from '../../types';
import clienteAxios from './../../config/axios';
import tokenAuth from './../../config/token';
const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: false,
        registrado: false,
        usuario_info: null,
        mensaje_registro: null,
        mensaje_login: null
    };
    const [ state, dispatch ] = useReducer(authReducer, initialState);
    const borrarMensajes = () => {
        dispatch({
            type: BORRAR_MENSAJES
        });
    };
    //Funciones
    const registrarUsuario = async (datos) => {
        try {
/* nos debemos comunicar con el servidor (en este caso es una operacion POST para poder autenticar el usuario)
en index.js del lado del servidor, pusimos la ruta /api/usuarios, entonces debemos mandar dicha ruta con los
datos del registro del usuario
*/
        const respuesta = await clienteAxios.post('/api/usuarios', datos);
        console.log(respuesta);
        dispatch({
            type:REGISTRO_EXITOSO,
            payload: respuesta.data
        });
        } catch (error) {
        console.log(error.response.data.mensaje);
            dispatch({
                type: REGISTRO_ERRONEO,
                payload: error.response.data.mensaje
            });
        }
    };
    //retorna el usuario autenticado, nos servirá tanto al momento del registro como del logueo
    const usuarioAutenticado = async ()=>{
        //leemos en el local storage si hay un token
        const token = localStorage.getItem('token');
        if (token) {
            // funcion para enviar el token por headers
            tokenAuth(token);
        }
        try {
            //obtenemos la respuesta de la peticion a la base de datos, para obtener info del usuario
            const respuesta = await clienteAxios.get('/api/auth');
            console.log(respuesta);
            dispatch({
                type: OBTENER_INFO_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERRONEO
            });
        }
    };
    //cuando el usuario inicia sesión
    const iniciarSesion = async(datos) =>{
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            console.log(respuesta);
            dispatch({
                type:LOGIN_EXITOSO,
                payload: respuesta.data
            });
            usuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.mensaje);
            dispatch({
                type: LOGIN_ERRONEO,
                payload: error.response.data.mensaje
            });
        }
    };
    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            autenticado: state.autenticado,
            registrado: state.registrado,
            usuario_info: state.usuario_info,
            mensaje_login: state.mensaje_login,
            mensaje_registro: state.mensaje_registro,
            registrarUsuario,
            usuarioAutenticado,
            iniciarSesion,
            borrarMensajes
        }}
        >{props.children}
        </AuthContext.Provider>
    )
};
export default AuthState;