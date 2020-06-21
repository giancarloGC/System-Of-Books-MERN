import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListaAllLibros from "./pages/ListaAllLibros.js";
import InicioSesion from "./pages/InicioSesion.js";

import MisLibros from "./components/MisLibros.js";
import MiCuenta from "./components/MiCuenta.js";

function App() {
  return (
    <div>
      <Router>
            <Switch>
            <Route exact path="/" component={InicioSesion} />
            <Route exact path="/HomePage" component={ListaAllLibros} />
            <Route path="/HomePage/Micuenta" component={MiCuenta} />
            <Route exact path="/HomePage/Mislibros" component={MisLibros} />

            </Switch>
        </Router>    
        </div>

  );
}

export default App;