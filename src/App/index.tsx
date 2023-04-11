import React from 'react';
import {IonApp, setupIonicReact} from '@ionic/react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import store, {persistor} from '../store';

import {syncCoupons} from '../helpers/coupons';
import {syncCards} from '../helpers/cards';

import Navigator from './components/Navigator/Navigator';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const loadInitialValues = async () => {
    try {
        await syncCoupons(store.dispatch);
        await syncCards(store.getState().authentication.token, store.dispatch);
    } catch (e) {
        console.log(e);
    }
};

loadInitialValues();
setupIonicReact();

const App = () => (
    <IonApp>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigator/>
            </PersistGate>
        </Provider>
    </IonApp>
);

export default App;
