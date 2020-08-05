import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SendIcon from '@material-ui/icons/Send';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import {EstilosComun} from './../diseño/EstilosComun.js';
import {Copyright} from './../diseño/EstilosComun.js';
const Login = () => {


/* state para iniciar sesión */
const [infoUsuario, guardarUsuario] = useState({
  usuario: '',
  contraseña: ''
});
//extraemos los valores de los inputs
const {usuario, contraseña} = infoUsuario;
const onChange = (e)=>{
  guardarUsuario({
    ...infoUsuario,
    [e.target.name] : e.target.value
  })
}
  const estilos = EstilosComun();
  const copyright = Copyright();
  return (
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
        <form className={estilos.formulario} noValidate>
          <TextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            id="usuario"
            label="Nombre de Usuario o correo electrónico"
            name="usuario"
            value={usuario}
            autoComplete="usuario"
            autoFocus
            onChange={onChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="contraseña"
            label="Contraseña"
            name="contraseña"
            value={contraseña}
            onChange={onChange}
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
              <Link to={'/olvidecontraseña'} variant="body1">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link to={'/cuentanueva'} variant="body1">
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
  );
}
export default Login;
 
