import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routePaths from './routePaths';
import * as Pages from '../view/pages';

const Routes = () => (
    <Switch>
        <Route exact path={routePaths.homePage()} component={Pages.HomePage} />
        <Route path={routePaths.errorPage(':code')} component={Pages.ErrorPage} />
        <Redirect to={routePaths.errorPage('404')} />
    </Switch>
);

export default Routes;
