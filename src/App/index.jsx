import React, { useEffect } from "react";
import { IonApp } from '@ionic/react';
import { Provider } from "react-redux";

import Navigator from "./components/Navigator";

import store from "../store";

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
import { loadCoupons, syncCoupons, loadWatchlist } from "../store/actions";

const loadInitialValues = async () => {
    /* set coupons */
    await loadCoupons(store);

    await loadWatchlist(store);

    if (!store.getState().coupons.data || store.getState().coupons.cacheInvalid < Date.now()) {
        await store.dispatch(await syncCoupons());
    }
};

const App = () => {
    useEffect(() => {
        loadInitialValues();
    }, [])

    return (
        <IonApp>
            <Provider store={store}>
                <Navigator/>
            </Provider>
        </IonApp>
    )
};

export default App;
