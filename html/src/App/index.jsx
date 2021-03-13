import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { square, ellipse, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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

const tabs = [
    {
        key: 'tab1',
        path: '/tab1',
        icon: triangle,
        label: 'Tab 1',
        component: <Tab1/>
    },
    {
        key: 'tab2',
        path: '/tab2',
        icon: square,
        label: 'Karten',
        component: <Tab2/>
    },
    {
        key: 'tab3',
        path: '/tab3',
        icon: ellipse,
        label: 'Tab 3',
        component: <Tab3/>
    }
]

const App = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/">
                        <Redirect to={tabs[0].path}/>
                    </Route>
                    {tabs.map(({path, component}) =>
                        <Route exact path={path}>
                            {component}
                        </Route>
                    )}
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    {tabs.map(({key, path, icon, label}) =>
                        <IonTabButton tab={key} href={path}>
                            <IonIcon icon={icon}/>
                            <IonLabel>{label}</IonLabel>
                        </IonTabButton>
                    )}
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
