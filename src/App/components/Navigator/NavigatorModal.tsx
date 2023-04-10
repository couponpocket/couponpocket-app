import React, {
    Dispatch,
    FC,
    PropsWithChildren,
    ReactChild,
    ReactElement,
    SetStateAction
} from 'react';
import {IonModal} from '@ionic/react';
import NavigatorContent from './NavigatorContent';

export type NavigatorModalProps = PropsWithChildren<{
    title?: ReactChild;
    buttons?: {
        start?: ReactElement;
        end?: ReactElement;
    } | ReactElement;
    headerChildren?: ReactElement;
    router?: HTMLIonRouterOutletElement;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    modalClassName?: string;
    contentClassName?: string;
    backdropDismiss?: boolean;
}>

const NavigatorModal: FC<NavigatorModalProps> = ({
    children,
    title,
    buttons,
    headerChildren,
    router,
    showModal,
    setShowModal,
    modalClassName,
    backdropDismiss
}) => {
    return (
        <IonModal isOpen={showModal}
                  swipeToClose={true}
                  presentingElement={router || undefined}
                  onDidDismiss={() => setShowModal(false)}
                  className={modalClassName}
                  backdropDismiss={backdropDismiss}>
            <NavigatorContent title={title} collapse={false} buttons={buttons} headerChildren={{top: headerChildren}}>
                {children}
            </NavigatorContent>
        </IonModal>
    )
}

export default NavigatorModal;
