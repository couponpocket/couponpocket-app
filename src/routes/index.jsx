import React, { useRef } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import CouponPage from "../App/pages/CouponPage";
import CouponCategoryPage from "../App/pages/CouponCategoryPage";
import { albumsOutline, albumsSharp, barcodeOutline, barcodeSharp, cog, cogSharp } from "ionicons/icons";
import CardsPage from "../App/pages/CardsPage";
import SettingsPage from "../App/pages/SettingsPage";

const Tabs = () => {
    const tabs = [
        {
            key: 'coupons',
            path: '/tabs/coupons',
            iconIos: barcodeOutline,
            iconMd: barcodeSharp,
            label: 'Coupons',
            component: CouponCategoryPage
        },
        {
            key: 'cards',
            path: '/tabs/cards',
            iconIos: albumsOutline,
            iconMd: albumsSharp,
            label: 'Karten',
            component: CardsPage
        },
        {
            key: 'settings',
            path: '/tabs/settings',
            iconIos: cog,
            iconMd: cogSharp,
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
                {tabs.map(({key, path, iconIos, iconMd, label}) =>
                    <IonTabButton key={key} tab={key} href={path}>
                        <IonIcon ios={iconIos} md={iconMd}/>
                        <IonLabel>{label}</IonLabel>
                    </IonTabButton>
                )}
            </IonTabBar>
        </IonTabs>
    );
};

const Routes = () => {
    const ionRouterOutlet = useRef();

    return (
        <IonReactRouter>
            <IonRouterOutlet ref={ionRouterOutlet}>
                <Redirect exact={true} path="/" to="/tabs/coupons"/>
                <Route path="/tabs" component={Tabs}/>
                <Route path="/coupons/:id" exact={true}
                       render={props => <CouponPage ionRouterOutlet={ionRouterOutlet} {...props} />}/>
            </IonRouterOutlet>
        </IonReactRouter>
    )
};

export default Routes;