import React, {FC, useContext, useState} from "react";
import NavigatorPage from "../../../components/Navigator/NavigatorPage";
import {NavigatorProps} from "../../../components/Navigator/types";
import {IonButton, IonCol, IonGrid, IonRow, NavContext} from "@ionic/react";
import Input, {ErrorState} from "../../../components/Settings/Authentication/Input";
import NavigatorBackButton from "../../../components/Navigator/NavigatorBackButton";
import routes from "../../../../config/routes";
import {noPageAnimation} from "../../../../helpers/navigation";

type PasswordForgotPageProps = NavigatorProps;

const PasswordForgotPage: FC<PasswordForgotPageProps> = ({title}) => {
    const [errors, setErrors] = useState<ErrorState | undefined>(undefined);
    const {navigate} = useContext(NavContext);

    return (
        <NavigatorPage title={title} buttons={<NavigatorBackButton text="Einstellungen"/>}>
            <IonGrid>
                <IonRow>
                    <IonCol offsetMd="3" sizeMd="6" offsetXl="4" sizeXl="4">
                        Um dein Passwort zurückzusetzen, wird deine E-Mail-Adresse benötigt um dir einen Code zu senden.
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol offsetMd="3" sizeMd="6" offsetXl="4" sizeXl="4">
                        <Input label="E-Mail-Adresse"
                               name="email"
                               placeholder="max.mustermann@beispiel.de"
                               errors={errors}
                               setErrors={setErrors}/>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol offsetMd="3" sizeMd="6" offsetXl="4" sizeXl="4">
                        <IonButton expand="block">
                            Zurücksetzen anfragen
                        </IonButton>

                        <IonButton fill="clear" color="dark"
                                   onClick={() => navigate(routes.login.path, 'none', 'replace', noPageAnimation)}>
                            Doch nicht vergessen?
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </NavigatorPage>
    );
}

export default PasswordForgotPage;