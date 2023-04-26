import React, {
    Dispatch,
    FC,
    PropsWithChildren,
    ReactElement,
    SetStateAction
} from 'react';
import {IonModal} from '@ionic/react';
import NavigatorContent, {NavigatorContentProps} from './NavigatorContent';

export type NavigatorModalProps = PropsWithChildren<{
    title?: NavigatorContentProps['title'];
    buttons?: NavigatorContentProps['buttons'];
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
                  canDismiss={true}
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
