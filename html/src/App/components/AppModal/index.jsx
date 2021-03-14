import React, { useEffect, useState } from "react";
import { IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";

const AppModal = ({children, name, buttons, ...htmlProps}) => {
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
        <IonModal {...htmlProps}>
            <IonHeader translucent={true}>
                <IonToolbar>
                    {start ? <IonButtons slot="start">{start}</IonButtons> : ''}
                    {end ? <IonButtons slot="end">{end}</IonButtons> : ''}
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true}>
                {children}
            </IonContent>
        </IonModal>
    );
};

export default AppModal;