import React from 'react';
import Login from './componentes/autenticacion/Login.js';
import Contraseña from './componentes/autenticacion/Contraseña.js';
import CuentaNueva from './componentes/autenticacion/CuentaNueva.js';
import Proyectos from './componentes/proyectos/Proyectos.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';

function App() {
  return (
    <ProyectoState>
      <TareaState>
{/*    para crear las rutas necesitamos el componente Router y Switch, entonces mandamos el path y el componente al
    que hace referencia */ }
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/cuentanueva" component={CuentaNueva} />
            <Route exact path="/proyectos" component={Proyectos} />
            <Route exact path="/olvidecontraseña" component={Contraseña} />
          </Switch>
        </Router>
      </TareaState>
    </ProyectoState>
    );
}

export default App;
