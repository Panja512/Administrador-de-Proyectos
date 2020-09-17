import React,{useState, useContext, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import SendIcon from '@material-ui/icons/Send';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import {EstilosComun} from './../diseño/EstilosComun.js';
import {Copyright} from './../diseño/EstilosComun.js';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import AuthContext from './../../context/auth/authContext';
import swal from 'sweetalert';
import { Alert, AlertTitle } from '@material-ui/lab';

const CuentaNueva = (props) => {

  const estilos = EstilosComun();
  const copyright = Copyright();

const authContext = useContext(AuthContext);
const { registrarUsuario, mensaje_registro, borrarMensajes, registrado } = authContext;
/* state para iniciar sesión */
const [usuario, guardarUsuario] = useState({
  nombre: '',
  apellido: '',
  nombreUsuario: '',
  email: '',
  contraseña: '',
  rcontraseña: '',
});

useEffect(()=>{
  if(registrado){
    swal("Operación completada","Usuario registrado correctamente, ahora puede iniciar sesión.","success");
    props.history.push('');
  }
},[registrado,props.history]);

ValidatorForm.addValidationRule('contraseñasCoinciden', (value) => {
  if (value !== usuario.contraseña) {
      return false;
  }
  return true;
});
//funcion para borrar el contenido del formulario
const resetearFormUsuario = ()=>{
  guardarUsuario({
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    contraseña: '',
    rcontraseña: '',
    email: ''
  });
};
//extraemos los valores de los inputs
const {nombre, apellido, nombreUsuario, contraseña, rcontraseña, email} = usuario;

const onChange = (e)=>{
  guardarUsuario({
    ...usuario,
    [e.target.name] : e.target.value
  })
};
const onSubmitUsuario = (e) => {
  e.preventDefault();
    registrarUsuario({
      nombre,
      apellido,
      nombreUsuario,
      contraseña,
      email
    });
};

  return (
      <ValidatorForm onSubmit={onSubmitUsuario}>
      <Container component="main" maxWidth="sm">
        <Card className={estilos.cardInicio} variant="outlined">
      <CssBaseline />
      <div className={estilos.contenidoFormulario}>
        <Avatar className={estilos.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Crear una nueva cuenta
        </Typography>
        <form className={estilos.formulario}>
        <Typography component="h1" align="center" variant="h5">
          Datos del usuario        </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextValidator
              autoFocus
              variant="outlined"
              fullWidth
              margin="normal"
              id="nombre"
              label="Nombre"
              name="nombre"
              autoComplete="nombre"
              value={nombre}
              validators={['required', 'isString']}
              errorMessages={['Este campo es requerido', 'Solo letras']}
              onChange={onChange}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
              fullWidth
              variant="outlined"
              margin="normal"
              id="apellido"
              label="Apellido"
              name="apellido"
              value={apellido}
              validators={['required', 'isString']}
              errorMessages={['Este campo es requerido', 'Solo letras']}
              autoComplete="apellido"
              onChange={onChange}
            />
            </Grid>
          </Grid>
          <TextValidator
            fullWidth
            variant="outlined"
            margin="normal"
            id="nombreUsuario"
            label="Nombre de usuario"
            name="nombreUsuario"
            value={nombreUsuario}
            autoComplete="nombreUsuario"
            validators={['required']}
            errorMessages={['Este campo es requerido']}
            onChange={onChange}
            InputProps={{
              startAdornment:(
                <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
            }
            }
          />
            <TextValidator
            fullWidth
            variant="outlined"
            margin="normal"
            id="email"
            label="Correo electrónico"
            name="email"
            validators={['required', 'isEmail']}
            errorMessages={['Este campo es requerido', 'Ingrese un correo válido']}
            value={email}
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
          <TextValidator
            variant="outlined"
            type="password"
            margin="normal"
            fullWidth
            id="contraseña"
            label="Contraseña"
            name="contraseña"
            validators={['required', 'minStringLength:6']}
            errorMessages={['Este campo es requerido', 'La contraseña debe contener 6 carácteres como mínimo']}
            value={contraseña}
            onChange={onChange}
            InputProps={{
              startAdornment:(
                <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            ),
            }
            }
          />
          <TextValidator
            variant="outlined"
            type="password"
            margin="normal"
            fullWidth
            id="rcontraseña"
            label="Repita contraseña"
            name="rcontraseña"
            value={rcontraseña}
            validators={['required','contraseñasCoinciden']}
            errorMessages={['Este campo es requerido','Las contraseñas no coinciden']}
            onChange={onChange}
            InputProps={{
              startAdornment:(
                <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            ),
            }
            }
          />
          {mensaje_registro? 
              <Alert severity="info">
              <AlertTitle>Aviso</AlertTitle>
              {mensaje_registro} — <strong>Por favor, verifique sus datos</strong>
            </Alert>: null}
          <div className={estilos.root}>
          <Grid container spacing={3}>
              <Grid item xs={6}>
              <Button
            fullWidth
            type="submit"
            variant="contained"
            className={estilos.boton}
            color="primary"
          >
            <SendIcon/>
            Registrar
          </Button>
              </Grid>
              <Grid item xs={6}>
              <Link onClick={borrarMensajes} to={'/login'}>
              <Button
            fullWidth
            type="submit"
            variant="contained"
            className={estilos.boton}
            onClick={resetearFormUsuario}
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
      <Box mt={2}>
        {copyright}
      </Box>
      </Card>
    </Container>
    </ValidatorForm>
  );
}
export default CuentaNueva;
