import React from 'react';
import Login from './componentes/autenticacion/Login.js';
import Contraseña from './componentes/autenticacion/Contraseña.js';
import CuentaNueva from './componentes/autenticacion/CuentaNueva.js';
import Proyectos from './componentes/proyectos/Proyectos.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AuthState from './context/auth/authState';
import tokenAuth from './config/token';
import RutaPrivada from './componentes/rutas/RutaPrivada';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import es from "date-fns/locale/es";

//revisamos si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}
function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es} >
    <ProyectoState>
      <TareaState>
{/*    para crear las rutas necesitamos el componente Router y Switch, entonces mandamos el path y el componente al
    que hace referencia */ }
        <AuthState>
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/cuentanueva" component={CuentaNueva} />
              <RutaPrivada exact path="/proyectos" component={Proyectos} />
              <Route exact path="/olvidecontraseña" component={Contraseña} />
            </Switch>
          </Router>
        </AuthState>
      </TareaState>
    </ProyectoState>
    </MuiPickersUtilsProvider>
    );
}

export default App;
