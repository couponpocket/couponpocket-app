import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons } from "@ionic/react";

export const AppPage = ({children, name, buttons, collapse = true}) => {
    let [start, setStart] = useState();
    let [end, setEnd] = useState();

    useEffect(() => {
        if (!buttons) {
            return null;
        }

        if (!buttons.start && !buttons.end) {
            setStart(buttons);
        } else {
            if (buttons.start) {
                setStart(buttons.start);
            }

            if (buttons.end) {
                setEnd(buttons.end);
            }
        }
    }, [buttons]);

    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar>
                    {start ? <IonButtons slot="start">{start}</IonButtons> : ''}
                    {end ? <IonButtons slot="end">{end}</IonButtons> : ''}
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true}>
                {collapse ?
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">{name}</IonTitle>
                        </IonToolbar>
                    </IonHeader> : null
                }
                {children}
            </IonContent>
        </IonPage>
    )
};

export default AppPage;