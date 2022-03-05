import React, {FC, useEffect, useState} from 'react';
import NavigatorPage from '../../components/Navigator/NavigatorPage';
import {NavigatorProps} from '../../components/Navigator/types';
import {IonLabel, IonList, IonListHeader} from "@ionic/react";
import {
    bug,
    bugSharp,
    cloud,
    cloudSharp, notifications, notificationsSharp,
    person,
    personSharp,
    phonePortrait,
    phonePortraitSharp, shareSocial, shareSocialSharp, star, starSharp
} from "ionicons/icons";
import SettingsItem from "../../components/Settings/SettingsItem/SettingsItem";
import routes from "../../../config/routes";
import {App} from "@capacitor/app";
import {RateApp} from "capacitor-rate-app";

type SettingsPageProps = NavigatorProps

const Settings: FC<SettingsPageProps> = ({title}) => {
    const [version, setVersion] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const {version, build} = await App.getInfo();
                setVersion(`${version} (${build})`);
            } catch (e) {
                console.error(e);
                setVersion('N/A');
            }
        })()
    }, [])


    return (
        <NavigatorPage title={title}>
            <IonList>
                <IonListHeader>
                    <IonLabel>Allgemein</IonLabel>
                </IonListHeader>
                <SettingsItem avatarColor="blue"
                              iconIos={person}
                              iconMd={personSharp}
                              routerLink={routes.login.path}
                              detail>
                    <IonLabel className="ion-text-wrap">
                        <h2>Account</h2>
                        <p>Du bist aktuell nicht an gemeldet</p>
                    </IonLabel>
                </SettingsItem>
                <SettingsItem avatarColor="pink"
                              iconIos={notifications}
                              iconMd={notificationsSharp}
                              detail>
                    <IonLabel className="ion-text-wrap">
                        <h2>Benachrichtungen</h2>
                        <p>Wann möchtest du Benachrichtungen erhalten?</p>
                    </IonLabel>
                </SettingsItem>
                <SettingsItem avatarColor="orange"
                              iconIos={phonePortrait}
                              iconMd={phonePortraitSharp}
                              detail>
                    <IonLabel className="ion-text-wrap">
                        <h2>Geräte</h2>
                        <p>Angemeldete Sitzungen</p>
                    </IonLabel>
                </SettingsItem>

                <IonListHeader>
                    <IonLabel>Sonstiges</IonLabel>
                </IonListHeader>
                <SettingsItem avatarColor="grey"
                              iconIos={bug}
                              iconMd={bugSharp}
                              detail>
                    <IonLabel className="ion-text-wrap">
                        <h2>Bug report</h2>
                        <p>Fehler in der App melden</p>
                    </IonLabel>
                </SettingsItem>
                <SettingsItem avatarColor="grey"
                              onClick={async () => {
                                  await RateApp.requestReview()
                              }}
                              iconIos={star}
                              iconMd={starSharp}>
                    <IonLabel className="ion-text-wrap">
                        <h2>App bewerten</h2>
                        <p>Bewerte die App im Store</p>
                    </IonLabel>
                </SettingsItem>
                <SettingsItem avatarColor="grey"
                              iconIos={shareSocial}
                              iconMd={shareSocialSharp}>
                    <IonLabel className="ion-text-wrap">
                        <h2>App teilen</h2>
                        <p>Teile die App auf Social Meida</p>
                    </IonLabel>
                </SettingsItem>
                <SettingsItem avatarColor="grey"
                              iconIos={cloud}
                              iconMd={cloudSharp}>
                    <IonLabel>
                        <h2>App Version</h2>
                        <p>Aktuell installierte Version: {version}</p>
                    </IonLabel>
                </SettingsItem>
            </IonList>
        </NavigatorPage>
    );
};

export default Settings;
