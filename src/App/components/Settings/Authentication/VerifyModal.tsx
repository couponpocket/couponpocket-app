import React, {FC, FormEventHandler, useCallback, useState} from 'react';
import NavigatorModal, {NavigatorModalProps} from '../../Navigator/NavigatorModal';
import {RegisterResponse, resendVerificationEmail, verify} from '../../../../api/services/authentication';
import Input, {ErrorState} from './Input';
import {ResponseError} from '../../../../api';
import useToast from '../../../hooks/useToast';
import {IonButton, IonCol, IonGrid, IonRow} from '@ionic/react';

interface VerifyModalProps extends Pick<NavigatorModalProps, 'showModal' | 'setShowModal'> {
    router: NavigatorModalProps['router'];
    registeredResponse: RegisterResponse | undefined;
}

const VerifyModal: FC<VerifyModalProps> = ({router, showModal, setShowModal, registeredResponse}) => {
    const [errors, setErrors] = useState<ErrorState | undefined>(undefined);

    const [showToast] = useToast();

    const resendVerifyEmail = async () => {
        if (!registeredResponse) {
            return;
        }

        try {
            await resendVerificationEmail(registeredResponse.access_token);
            await showToast('Die Bestätiguns-E-Mail wurde erneut versendet. Bitte prüfe auch deinen SPAM-Ordner.');
        } catch (e) {
            if (!(e instanceof ResponseError)) {
                console.log(e);
                return;
            }

            switch (e.response?.status) {
                case 403:
                    await showToast(e.response?.data.message);
                    setShowModal(false);
                    break;
                default:
                    await showToast(e.response?.data.message);
            }
        }

    }

    const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (event) => {
        event.preventDefault();

        if (!registeredResponse) {
            return;
        }

        const entities = Object.fromEntries(new FormData(event.currentTarget));

        try {
            await verify(entities, registeredResponse.access_token);
            await showToast('Dein Account wurde erfolgreich bestätigt. Du kannst dich nun anmelden.');
            setShowModal(false);
        } catch  (e) {
            if (!(e instanceof ResponseError)) {
                console.log(e);
                return;
            }

            switch (e.response?.status) {
                case 422:
                    setErrors(e.response.data.errors);
                    await showToast('Es ist ein Fehler bei der Validierung aufgetreten. Bitte prüfen Sie das Formular.');
                    break;
                case 403:
                    await showToast(e.response?.data.message);
                    setShowModal(false);
                    break;
                default:
                    await showToast(e.response?.data.message);
            }
        }
    }, [registeredResponse, setShowModal, showToast]);

    return (
        <NavigatorModal showModal={showModal}
                        router={router}
                        setShowModal={setShowModal}
                        title="E-Mail verifizieren"
                        backdropDismiss={false}>
            <IonGrid>
                <IonRow>
                    <IonCol offsetMd="2" sizeMd="8">
                        <p>
                            Um Ihren Account zu verwenden, wird eine Bestätigung der E-Mail-Adresse benötigt. Bitte
                            geben Sie den in der Nachricht enthaltenen Code hier ein.
                        </p>
                    </IonCol>
                </IonRow>
                <form onSubmit={onSubmit}>
                    <IonRow>
                        <IonCol offsetMd="3" sizeMd="6">
                            <Input name="code"
                                   placeholder="Code eingeben"
                                   errors={errors}
                                   setErrors={setErrors}/>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol offsetMd="3" sizeMd="6">
                            <IonButton type="submit" expand="block">
                                Absenden
                            </IonButton>
                            <div className="ion-text-center">
                                <IonButton onClick={resendVerifyEmail} fill="clear" color="dark">
                                    Keinen Code erhalten?
                                </IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </form>
            </IonGrid>
        </NavigatorModal>
    )
}

export default VerifyModal;