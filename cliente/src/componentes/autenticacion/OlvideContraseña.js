import React,{useState, useContext, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LockIcon from '@material-ui/icons/Lock';
import SendIcon from '@material-ui/icons/Send';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import {EstilosComun} from '../diseño/EstilosComun.js';
import {Copyright} from '../diseño/EstilosComun.js';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import AuthContext from '../../context/auth/authContext';

//TODO: mostrar con sweet alert que el correo ha sido enviado.
const OlvideContraseña = () => {

const estilos = EstilosComun();
const copyright = Copyright();

const authContext = useContext(AuthContext);
const { borrarMensajes } = authContext;
/* state para controlar el contenido de los inputs */
const [usuario, guardarUsuario] = useState({
    email:''
});
/* state para controlar que se envía un mail para recuperar contraseña*/
const [mailRecuperarContraseña, enviarMail] = useState(false);

//extraemos los valores de los inputs
const {email} = usuario;

const onChange = (e)=>{
  guardarUsuario({
    ...usuario,
    [e.target.name] : e.target.value
  })
};
const onSubmitOlvideContraseña =(e) =>{
  e.preventDefault();
  enviarMail(true);
};

  return (
    !mailRecuperarContraseña ? 
    <ValidatorForm onSubmit={onSubmitOlvideContraseña}>
      <Container component="main" maxWidth="sm">
        <Card className={estilos.cardInicio} variant="outlined">
      <CssBaseline />
      <div className={estilos.contenidoFormulario}>
        <Avatar className={estilos.avatar}>
          <LockIcon />
        </Avatar>
        <Typography align="center" component="h1" variant="h6">
          Ingrese su correo para poder recuperar su contraseña
        </Typography>
        <form className={estilos.formulario} noValidate>
        <TextValidator
            variant="outlined"
            autoFocus
            fullWidth
            margin="normal"
            required
            id="email"
            label="Correo electrónico"
            name="email"
            value={email}
            validators={['required','isEmail']}
            errorMessages={['Este campo es requerido','Ingrese un correo electrónico válido']}
            autoComplete="email"
            onChange={onChange}
            InputProps={{
                startAdornment:(
                  <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
              }
              }
          />
        <div className={estilos.root}>
          <Grid container spacing={1}>
              <Grid item xs={6}>
              <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={estilos.boton}
          >
            <SendIcon/>
            Enviar
          </Button>
              </Grid>
              <Grid item xs={6}>
              <Link onClick={borrarMensajes} to={'/login'}>
              <Button
            fullWidth
            type="submit"
            variant="contained"
            className={estilos.boton}
          >
              <ArrowBackIosIcon/>
            Volver
            </Button>
              </Link>
              </Grid>
              <p align="center">
                Te enviaremos un correo para que puedas recuperar tu información.
                </p>
          </Grid>
          </div>
          
         
        </form>
      </div>
      <Box mt={5}>
        {copyright}
      </Box>
      </Card>
    </Container>
    </ValidatorForm>
    : <Container component="main" maxWidth="sm">
    <Card className={estilos.cardInicio} variant="outlined">
  <CssBaseline />
  <div className={estilos.contenidoFormulario}>
    <Avatar className={estilos.avatar}>
      <LockIcon />
    </Avatar>
    <p align="center" component="h1" variant="h6">
      Hemos enviado un correo a la dirección: <b>{email}</b>, por favor, revise su bandeja de entrada y siga los pasos para recuperar su contraseña.
    </p>

    <div className={estilos.root}>
      <Grid container spacing={3}>
          <Grid item xs={12}>
          <Link onClick={borrarMensajes} to={'/login'}>
          <Button
        fullWidth
        type="submit"
        variant="contained"
        className={estilos.boton}
      >
          <ArrowBackIosIcon/>
        Volver
        </Button>
          </Link>
          </Grid>
      </Grid>
      </div>
    </div>
  <Box mt={5}>
    {copyright}
  </Box>
  </Card>
</Container>
  );
}
export default OlvideContraseña;
 
