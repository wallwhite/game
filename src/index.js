import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { AppRoot, ErrorBoundary } from './view/components';
import store from './store';
import './assets/styles/index.scss';

export const history = createBrowserHistory();

const getRootElement = () => document.getElementById('root');

const rootElement = getRootElement();

const renderApp = Component => {
    render(Component, rootElement);
};

renderApp(
    <ErrorBoundary>
        <Provider store={store}>
            <Router history={history}>
                <AppRoot />
            </Router>
        </Provider>
    </ErrorBoundary>,
);
