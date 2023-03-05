import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {IonReactRouter} from '@ionic/react-router';
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import {Redirect, Route} from 'react-router';
import routes, {Route as RouteType, ROUTE_AUTHENTICATED, ROUTE_GUEST} from '../../../config/routes';
import config from '../../../config';
import {IntlProvider} from 'react-intl';
import {useAppDispatch, useAppSelector} from '../../../store';
import {validateToken} from '../../../api/services/authentication';
import {ResponseError} from '../../../api';
import {logout as logoutAction} from '../../../store/actions/authentication';

const Navigator: FC = () => {
    const routerRef = useRef<HTMLIonRouterOutletElement>(null);
    const {user, token} = useAppSelector(state => state.authentication);
    const dispatch = useAppDispatch();

    const checkSession = useCallback(async (token: string) => {
        try {
            await validateToken(token);
        } catch (e) {
            if (!(e instanceof ResponseError)) {
                console.log(e);
                return;
            }

            dispatch(logoutAction());
        }
    }, [dispatch]);

    useEffect(() => {
        if (!token) {
            return;
        }

        checkSession(token).then();

        const interval = setInterval(() => checkSession(token), 10 * 1000);

        return () => clearInterval(interval);
    }, [checkSession, token])

    const [navigation] = useState<RouteType[]>(Object.values(routes));
    const tabs = useMemo(() => {
        const items = [
            routes.categoryList,
            (user ? routes.cards : undefined),
            routes.settings
        ];
        return items.filter(item => item !== undefined);
    }, [user]);

    return (
        <IntlProvider locale={config.defaultLanguage} defaultLocale={config.defaultLanguage}>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet ref={routerRef}>
                        <Redirect exact={true} from='/' to={routes.categoryList.path || '/'}/>
                        {navigation.map(item => {
                            // user is logged in
                            if (item.type === ROUTE_GUEST && user !== undefined) {
                                return (
                                    <Redirect exact={item.exact || false}
                                              key={item.path}
                                              from={item.path}
                                              to={routes.settings.path}/>
                                )
                            }

                            // user is logged out
                            if (item.type === ROUTE_AUTHENTICATED && user === undefined) {
                                return (
                                    <Redirect exact={item.exact || false}
                                              key={item.path}
                                              from={item.path}
                                              to={routes.settings.path}/>
                                )
                            }

                            return (
                                <Route exact={item.exact || false}
                                       key={item.key}
                                       path={item.path}
                                       render={props => item.component ? (
                                           <item.component title={item?.meta?.name}
                                                           router={routerRef.current} {...props} />
                                       ) : null}
                                />
                            )
                        })}
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        {tabs.map((item) => {
                            if (!item) {
                                return;
                            }

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