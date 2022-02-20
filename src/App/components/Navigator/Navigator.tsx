import React, {FC, useRef, useState} from "react";
import {IonReactRouter} from "@ionic/react-router";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router";
import routes, {Route as RouteType} from "../../../config/routes";
import config from "../../../config";
import {IntlProvider} from "react-intl";

const Navigator: FC = () => {
    const routerRef = useRef<HTMLIonRouterOutletElement>(null);

    const [navigation] = useState<RouteType[]>(Object.values(routes));
    const [tabs] = useState([
        routes.categoryList,
        routes.cards,
        routes.settings
    ]);

    return (
        <IntlProvider locale={config.defaultLanguage} defaultLocale={config.defaultLanguage}>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet ref={routerRef}>
                        <Redirect exact={true} from='/' to={routes.categoryList.path || '/'}/>
                        {navigation.map(item => (
                            <Route exact={item.exact || false} key={item.key} path={item.path}
                                   render={props => item.component ? (
                                       <item.component title={item?.meta?.name} router={routerRef.current} {...props} />
                                   ) : null}
                            />
                        ))}
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        {tabs.map((item) => {
                            const {tab, icons} = item.meta ? item.meta : {tab: undefined, icons: undefined};

                            return (
                                <IonTabButton key={item.key} tab={item.key}
                                              href={item.defaultPath || item.path.toString()}>
                                    <IonIcon ios={icons?.iconIos} md={icons?.iconMd}/>
                                    <IonLabel>{tab?.label}</IonLabel>
                                </IonTabButton>
                            )
                        })}
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IntlProvider>
    );
}

export default Navigator;