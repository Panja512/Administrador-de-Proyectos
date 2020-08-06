import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { REGISTRO_ERRONEO, REGISTRO_EXITOSO } from '../../types';
import clienteAxios from './../../config/axios';
const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: false,
        usuario_info: null,
        mensaje: null
    };
    const [ state, dispatch ] = useReducer(authReducer, initialState);

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
    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            autenticado: state.autenticado,
            usuario_info: state.usuario_info,
            mensaje: state.mensaje,
            registrarUsuario
        }}
        >{props.children}
        </AuthContext.Provider>
    )
};
export default AuthState;