import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
const CuentaNueva = () => {

  const estilos = EstilosComun();
  const copyright = Copyright();

/* state para iniciar sesión */
const [usuario, guardarUsuario] = useState({
  nombre: '',
  apellido: '',
  nombreUsuario: '',
  email: '',
  contraseña: '',
  rcontraseña: '',
});
//funcion para borrar el contenido del formulario
const borrarFormulario = ()=>{
  guardarUsuario()
}
//extraemos los valores de los inputs
const {nombre, apellido, nombreUsuario, contraseña, rcontraseña, email} = usuario;
const onChange = (e)=>{
  guardarUsuario({
    ...usuario,
    [e.target.name] : e.target.value
  })
}

  return (
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
        <form className={estilos.formulario} noValidate>
        <Typography component="h1" align="center" variant="h5">
          Datos del usuario        </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
              autoFocus
              variant="outlined"
              fullWidth
              margin="normal"
              required
              id="nombre"
              label="Nombre"
              name="nombre"
              autoComplete="nombre"
              value={nombre}
              onChange={onChange}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              id="apellido"
              label="Apellido"
              name="apellido"
              value={apellido}
              autoComplete="apellido"
              onChange={onChange}
            />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            id="nombreUsuario"
            label="Nombre de usuario"
            name="nombreUsuario"
            value={nombreUsuario}
            autoComplete="nombreUsuario"
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
            <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Correo electrónico"
            name="email"
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
          <TextField
            variant="outlined"
            type="password"
            margin="normal"
            required
            fullWidth
            id="contraseña"
            label="Contraseña"
            name="contraseña"
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
          <TextField
            variant="outlined"
            type="password"
            margin="normal"
            required
            fullWidth
            id="rcontraseña"
            label="Repita contraseña"
            name="rcontraseña"
            value={rcontraseña}
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
              <Link to={'/login'}>
              <Button
            fullWidth
            type="submit"
            variant="contained"
            className={estilos.boton}
            onClick={borrarFormulario}
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
    
  );
}
export default CuentaNueva;
 
