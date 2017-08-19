import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const renderApp = ( ) => {
    const App = require('./app').default;
    render(
        <AppContainer>
            <App/>
        </AppContainer>,
        document.getElementById('app')
    );
    
};

if (module.hot) {
    module.hot.accept('./app.js', ( ) => {
        console.log('accepting update');
        renderApp();
    });
}

renderApp();
