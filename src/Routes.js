import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DiscoOptico from './pages/DiscoOptico';
import HomePage from './pages/HomePage';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/disco">
                <DiscoOptico />
            </Route>
            <Route exact path="/drusas">
                <h1>Segmentación Drusas</h1>
            </Route>
            <Route exact path="/macula">
                <h1>Segmentación Macula</h1>
            </Route>
            <Route exact path="/modelo">
                <h1>Modelo Inteligencia Artificial</h1>
            </Route>
        </Switch>
    );
}

export default Routes;