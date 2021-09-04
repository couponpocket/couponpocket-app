import React, {useRef, useState, useEffect} from "react";
import {IonReactRouter} from "@ionic/react-router";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router";
import routes from "../../config/routes";

const Navigator = () => {
    const ionRouterOutlet = useRef();
    const [navigation, setNavigation] = useState(Object.values(routes));

    useEffect(() => {
        setTimeout(() => {
            setNavigation(Object.values(routes));
        }, 1000)
    }, []);

    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet ref={ionRouterOutlet}>
                    <Redirect exact={true} path="/" to="/categories"/>
                    {navigation.map(({key, path, meta, ...route}) =>
                        <Route key={key} exact={route.exact || false} path={path}
                               render={props => <route.component name={meta?.label}
                                                                 ionRouterOutlet={ionRouterOutlet} {...props} />}/>
                    )}
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    {navigation.map(({key, path, meta}) => {
                        if (!meta) {
                            return null;
                        }

                        return (
                            <IonTabButton key={key} tab={key} href={path}>
                                <IonIcon ios={meta.iconIos} md={meta.iconMd}/>
                                <IonLabel>{meta.label}</IonLabel>
                            </IonTabButton>
                        );
                    })}
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    )
};

export default Navigator;