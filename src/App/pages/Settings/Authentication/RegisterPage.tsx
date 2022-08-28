import React, {FC, FormEventHandler, useCallback, useContext, useState} from 'react';
import NavigatorPage from '../../../components/Navigator/NavigatorPage';
import {NavigatorProps} from '../../../components/Navigator/types';
import {IonButton, IonCol, IonFab, IonGrid, IonIcon, IonRow, NavContext} from '@ionic/react';
import {logoApple, logoGoogle} from 'ionicons/icons';
import AuthHr from '../../../components/Settings/Authentication/AuthHr';
import Input, {ErrorState} from '../../../components/Settings/Authentication/Input';
import NavigatorBackButton from '../../../components/Navigator/NavigatorBackButton';
import routes from '../../../../config/routes';
import {noPageAnimation} from '../../../../helpers/navigation';
import {register, RegisterResponse} from '../../../../api/services/authentication';
import {ResponseError} from '../../../../api';
import useToast from '../../../hooks/useToast';
import VerifyModal from '../../../components/Settings/Authentication/VerifyModal';

type RegisterPageProps = NavigatorProps;

const RegisterPage: FC<RegisterPageProps> = ({title}) => {
    const [errors, setErrors] = useState<ErrorState | undefined>(undefined);
    const [registeredResponse, setRegisteredResponse] = useState<RegisterResponse | undefined>(undefined);

    const {navigate} = useContext(NavContext);
    const [showToast] = useToast();

    const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (event) => {
        event.preventDefault();

        const entities = Object.fromEntries(new FormData(event.currentTarget));

        try {
            setRegisteredResponse(await register(entities));
        } catch (e) {
            if (!(e instanceof ResponseError)) {
                console.log(e);
                return;
            }

            switch (e.response?.status) {
                case 422:
                    setErrors(e.response.data.errors);
                    await showToast('Es ist ein Fehler bei der Validierung aufgetreten. Bitte prüfen Sie das Formular.');
                    break;
                default:
                    await showToast('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
            }
        }
    }, [showToast])

    return (
        <>
            <VerifyModal showModal={!!registeredResponse} setShowModal={() => setRegisteredResponse(undefined)}
                         registeredResponse={registeredResponse}/>
            <NavigatorPage title={title} buttons={<NavigatorBackButton text="Einstellungen"/>}>
                <IonGrid>
                    <form onSubmit={onSubmit}>
                        <IonRow>
                            <IonCol offsetMd="3" sizeMd="6" offsetXl="4" sizeXl="4">
                                <Input label="Name"
                                       name="name"
                                       placeholder="Deinen Name eingeben"
                                       errors={errors}
                                       setErrors={setErrors}/>
                            </IonCol>
                        </IonRow>
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
                                       placeholder="Min. 8 Zeichen"
                                       errors={errors}
                                       setErrors={setErrors}/>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol offsetMd="3" sizeMd="6" offsetXl="4" sizeXl="4">
                                <div className="login-page-buttons">
                                    <div className="login-page-buttons-top">
                                        <IonButton type="submit" expand="block">
                                            Registrieren
                                        </IonButton>
                                    </div>
                                </div>
                            </IonCol>
                        </IonRow>
                    </form>
                    <AuthHr/>
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
                </IonGrid>
                <IonFab vertical="bottom" horizontal="center" slot="fixed" style={{marginInlineStart: '-100px'}}>
                    <IonButton fill="clear" color="dark"
                               onClick={() => navigate(routes.login.path, 'none', 'replace', noPageAnimation)}>
                        Doch einen Account?
                    </IonButton>
                </IonFab>
            </NavigatorPage>
        </>
    );
}

export default RegisterPage;