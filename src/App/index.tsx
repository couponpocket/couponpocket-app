import React from "react";
import {IonApp, setupIonicReact} from '@ionic/react';
import {Provider} from "react-redux";

import Navigator from "./components/Navigator/Navigator";

import {store} from "../store";

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
import {syncCoupons} from "../helpers/coupons";

const loadInitialValues = async () => {
    try {
        store.dispatch(syncCoupons());
    } catch (e) {
        console.log(e);
    }
};

loadInitialValues();
setupIonicReact();

const App = () => (
    <IonApp>
        <Provider store={store}>
            <Navigator/>
        </Provider>
    </IonApp>
);

export default App;
