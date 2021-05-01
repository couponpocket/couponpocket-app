import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import CouponPage from "../App/pages/CouponPage";
import CouponCategoryPage from "../App/pages/CouponCategoryPage";
import { albumsOutline, barcodeOutline, cog } from "ionicons/icons";
import CardsPage from "../App/pages/CardsPage";
import SettingsPage from "../App/pages/SettingsPage";

const Tabs = () => {
    const tabs = [
        {
            key: 'coupons',
            path: '/tabs/coupons',
            icon: barcodeOutline,
            label: 'Coupons',
            component: CouponCategoryPage
        },
        {
            key: 'cards',
            path: '/tabs/cards',
            icon: albumsOutline,
            label: 'Karten',
            component: CardsPage
        },
        {
            key: 'settings',
            path: '/tabs/settings',
            icon: cog,
            label: 'Einstellungen',
            component: SettingsPage
        }
    ];

    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact={true} path="/tabs" to="/tabs/coupons"/>
                {tabs.map(({key, path, label, ...tab}) =>
                    <Route key={key} exact={true} path={path}
                           render={props => <tab.component name={label} {...props} />}/>
                )}
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                {tabs.map(({key, path, icon, label}) =>
                    <IonTabButton key={key} tab={key} href={path}>
                        <IonIcon icon={icon}/>
                        <IonLabel>{label}</IonLabel>
                    </IonTabButton>
                )}
            </IonTabBar>
        </IonTabs>
    );
};

const Routes = () => (
    <IonReactRouter>
        <IonRouterOutlet>
            <Redirect exact={true} path="/" to="/tabs/coupons"/>
            <Route path="/tabs" component={Tabs}/>
            <Route path="/coupons/:id" component={CouponPage} exact={true}/>
        </IonRouterOutlet>
    </IonReactRouter>
);

export default Routes;