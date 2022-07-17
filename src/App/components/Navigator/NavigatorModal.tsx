import React, {FC, isValidElement, PropsWithChildren, ReactChild, ReactElement, useEffect, useState} from 'react';
import {IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar} from '@ionic/react';

type NavigatorModalProps = PropsWithChildren<{
    title?: ReactChild,
    buttons?: {
        start?: ReactElement,
        end?: ReactElement
    } | ReactElement,
    headerChildren?: ReactElement
    router?: HTMLIonRouterOutletElement,
    showModal: boolean,
    setShowModal: (state: boolean) => void,
    modalClassName?: string,
    contentClassName?: string
}>

const NavigatorModal: FC<NavigatorModalProps> = ({
    children,
    title,
    buttons,
    headerChildren: headerChildrenProp,
    router,
    showModal,
    setShowModal,
    modalClassName,
    contentClassName
}) => {
    const [startButtons, setStartButtons] = useState<ReactElement | undefined>(undefined);
    const [endButtons, setEndButtons] = useState<ReactElement | undefined>(undefined);

    const [headerChildren, setHeaderChildren] = useState<ReactElement | undefined>(undefined);

    useEffect(() => {
        if (isValidElement(buttons)) {
            setStartButtons(buttons);
        } else {
            if (buttons?.start) {
                setStartButtons(buttons.start);
            }

            if (buttons?.end) {
                setEndButtons(buttons.end);
            }
        }
    }, [buttons]);

    useEffect(() => {
        if (isValidElement(headerChildrenProp)) {
            setHeaderChildren(headerChildrenProp);
        }
    }, [headerChildrenProp]);

    return (
        <IonModal isOpen={showModal}
                  swipeToClose={true}
                  presentingElement={router || undefined}
                  onDidDismiss={() => setShowModal(false)}
                  className={modalClassName}
            >
            <IonHeader translucent={true}>
                <IonToolbar>
                    {startButtons ? <IonButtons slot="start">{startButtons}</IonButtons> : null}
                    {endButtons ? <IonButtons slot="end">{endButtons}</IonButtons> : null}
                    <IonTitle>{title}</IonTitle>
                </IonToolbar>
                {headerChildren ? <IonToolbar>{headerChildren}</IonToolbar> : null}
            </IonHeader>
            <IonContent className={contentClassName}>
                {children}
            </IonContent>
        </IonModal>
    )
}

export default NavigatorModal;
