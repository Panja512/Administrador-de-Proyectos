import React,{useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LockIcon from '@material-ui/icons/Lock';
import SendIcon from '@material-ui/icons/Send';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import {EstilosComun} from '../diseño/EstilosComun.js';
import {Copyright} from '../diseño/EstilosComun.js';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import AuthContext from '../../context/auth/authContext';
import swal from 'sweetalert';
//TODO: mostrar con sweet alert que el correo ha sido enviado.
const RecuperarContraseña = (props) => {

  const estilos = EstilosComun();
  const copyright = Copyright();

const authContext = useContext(AuthContext);
const { borrarMensajes } = authContext;
/* state para iniciar sesión */
const [usuario, guardarUsuario] = useState({
    contraseña:'',
    rcontraseña:'',
    codigo: ''
});
//extraemos los valores de los inputs
const {contraseña, rcontraseña, codigo} = usuario;

ValidatorForm.addValidationRule('contraseñasCoinciden', (value) => {
    if (value !== usuario.contraseña) {
        return false;
    }
    return true;
  });
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
        <p align="center">
          Ingrese la nueva contraseña para el correo: <b>{props.email}</b>
        </p>
        <form className={estilos.formulario} noValidate>
        <TextValidator
            variant="outlined"
            type="password"
            autoFocus
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
export default RecuperarContraseña;
 
