import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';

import '@capacitor/core';
import {defineCustomElements} from '@ionic/pwa-elements/loader';

ReactDOM.render(<App/>, document.getElementById('root'));

// Call the element loader after the app has been rendered the first time
defineCustomElements(window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
