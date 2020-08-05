import React,{useState} from 'react';
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
import {EstilosComun} from './../diseño/EstilosComun.js';
import {Copyright} from './../diseño/EstilosComun.js';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const Contraseña = () => {

  const estilos = EstilosComun();
  const copyright = Copyright();

/* state para iniciar sesión */
const [usuario, guardarUsuario] = useState({
    email:''
});
//extraemos los valores de los inputs
const {email} = usuario;
const onChange = (e)=>{
  guardarUsuario({
    ...usuario,
    [e.target.name] : e.target.value
  })
};

  return (
    <ValidatorForm>
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
          <Grid container spacing={3}>
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
              <Link to={'/login'}>
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
export default Contraseña;
 
