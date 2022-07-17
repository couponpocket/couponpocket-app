import React, {FC, FormEventHandler, useCallback, useContext, useState} from 'react';
import NavigatorPage from '../../../components/Navigator/NavigatorPage';
import {NavigatorProps} from '../../../components/Navigator/types';
import NavigatorBackButton from '../../../components/Navigator/NavigatorBackButton';
import {IonButton, IonCol, IonFab, IonGrid, IonIcon, IonRow, NavContext} from '@ionic/react';
import {logoApple, logoGoogle} from 'ionicons/icons';
import AuthHr from '../../../components/Settings/Authentication/AuthHr';
import Input, {ErrorState} from '../../../components/Settings/Authentication/Input';

import routes from '../../../../config/routes';
import {noPageAnimation} from '../../../../helpers/navigation';

type LoginPageProps = NavigatorProps;

const LoginPage: FC<LoginPageProps> = ({title}) => {
    const [errors, setErrors] = useState<ErrorState | undefined>(undefined);
    const {navigate} = useContext(NavContext);

    const onSubmit: FormEventHandler<HTMLFormElement> = useCallback((event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        console.log({
            email: data.get('email'),
            password: data.get('password')
        });
    }, [])

    return (
        <NavigatorPage title={title} buttons={<NavigatorBackButton text="Einstellungen"/>}>
            <IonGrid>
                <IonRow>
                    <IonCol offsetMd="2" sizeMd="4" offsetXl="3" sizeXl="3">
                        <IonButton color="light" expand="block" disabled={true}>
                            <IonIcon slot="start" icon={logoApple}/>
                            Mit Apple
                        </IonButton>
                    </IonCol>
                    <IonCol sizeMd="4" sizeXl="3">
                        <IonButton color="light" expand="block" disabled={true}>
                            <IonIcon slot="start" icon={logoGoogle}/>
                            Mit Google
                        </IonButton>
                    </IonCol>
                </IonRow>
                <AuthHr/>
                <form onSubmit={onSubmit}>
                    <IonRow>
                        <IonCol offsetMd="3" sizeMd="6" offsetXl="4" sizeXl="4">
                            <Input label="E-Mail-Adresse"
                                   type="email"
                                   name="email"
                                   placeholder="max.mustermann@beispiel.de"
                                   errors={errors}
                                   setErrors={setErrors}/>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol offsetMd="3" sizeMd="6" offsetXl="4" sizeXl="4">
                            <Input label="Passwort"
                                   type="password"
                                   name="password"
                                   placeholder="Passwort eingeben"
                                   errors={errors}
                                   setErrors={setErrors}/>
                        </IonCol>
                    </IonRow>
                    <IonRow className="login-page-buttons-row">
                        <IonCol offsetMd="3" sizeMd="6" offsetXl="4" sizeXl="4">
                            <IonButton type="submit" expand="block">
                                Anmelden
                            </IonButton>
                            <IonButton fill="clear" color="dark"
                                       onClick={() => navigate(routes.passwordForgot.path, 'none', 'replace', noPageAnimation)}>
                                Passwort vergessen?
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </form>
            </IonGrid>
            <IonFab vertical="bottom" horizontal="center" slot="fixed" style={{marginInlineStart: '-100px'}}>
                <IonButton fill="clear" color="dark"
                           onClick={() => navigate(routes.register.path, 'none', 'replace', noPageAnimation)}>
                    Noch kein Account?
                </IonButton>
            </IonFab>
        </NavigatorPage>
    );
}

export default LoginPage;