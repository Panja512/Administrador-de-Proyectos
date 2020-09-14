import React,{useState, useEffect, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import {EstilosComun} from './../diseño/EstilosComun.js';
import {Copyright} from './../diseño/EstilosComun.js';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import AuthContext from './../../context/auth/authContext';
import { Alert, AlertTitle } from '@material-ui/lab';

const Login = (props) => {

const authContext = useContext(AuthContext);
const { iniciarSesion, autenticado, mensaje_login, borrarMensajes } = authContext;
/* state para iniciar sesión */
const [usuario, guardarUsuario] = useState({
  email: '',
  contraseña: ''
});

//extraemos los valores de los inputs
const {email, contraseña} = usuario;

const onChange = (e)=>{
  guardarUsuario({
    ...usuario,
    [e.target.name] : e.target.value
  })
};
useEffect(()=>{
  if(autenticado){
    props.history.push('/proyectos');
  }
},[autenticado, props.history]);

const onSubmitIniciarSesion = (e) => {
  e.preventDefault();
    iniciarSesion({
      ...usuario
    });
};
  const estilos = EstilosComun();
  const copyright = Copyright();
  return (
    <ValidatorForm onSubmit={onSubmitIniciarSesion}>
      <Container component="main" maxWidth="sm">
        <Card className={estilos.cardInicio} variant="outlined">
      <CssBaseline />
      <div className={estilos.contenidoFormulario}>
        <Avatar className={estilos.avatar}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Inicia sesión
        </Typography>
        <form className={estilos.formulario}>
          <TextValidator
            margin="normal"
            variant="outlined"
            fullWidth
            id="usuario"
            label="Correo electrónico"
            name="email"
            value={email}
            validators={['required', 'isEmail']}
            errorMessages={['Este campo es requerido', 'Ingrese un correo válido']}
            autoComplete="email"
            autoFocus
            onChange={onChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextValidator
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            id="contraseña"
            label="Contraseña"
            name="contraseña"
            value={contraseña}
            validators={['required']}
            errorMessages={['Este campo es requerido']}
            onChange={onChange}
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
            
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordar"
          />
          {mensaje_login? 
            <Alert severity="info">
            <AlertTitle>Aviso</AlertTitle>
          {mensaje_login} — <strong>Por favor, verifique sus datos</strong>
          </Alert>: null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={estilos.boton}
          >
            <SendIcon/>
            Ingresar
          </Button>
          <Grid container align="center">
            <Grid item xs={12} sm={6}>
              <Link to={'/olvide-contraseña'} variant="body1">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link onClick={borrarMensajes} to={'/cuenta-nueva'} variant="body1">
                {"¿No tienes una cuenta? Regístrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        {copyright}
      </Box>
      </Card>
    </Container>
    </ValidatorForm>
  );
}
export default Login;
 
