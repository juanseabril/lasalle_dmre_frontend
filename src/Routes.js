import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DiscoOptico from './pages/DiscoOptico';
import Drusas from './pages/Drusas';
import HomePage from './pages/HomePage';
import Macula from './pages/Macula';

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage userEmail={props.userEmail}/>
            </Route>
            <Route exact path="/disco">
                <DiscoOptico userEmail={props.userEmail}/>
            </Route>
            <Route exact path="/drusas">
                <Drusas userEmail={props.userEmail}/>
            </Route>
            <Route exact path="/macula">
                <Macula userEmail={props.userEmail}/>
            </Route>
            <Route exact path="/modelo">
                <h1>Modelo Inteligencia Artificial</h1>
            </Route>
        </Switch>
    );
}

export default Routes;