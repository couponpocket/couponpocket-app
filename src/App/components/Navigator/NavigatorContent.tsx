import React, {FC, isValidElement, PropsWithChildren, ReactChild, ReactElement, useEffect, useState} from 'react';
import {IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, isPlatform} from '@ionic/react';

export type NavigatorContentProps = PropsWithChildren<{
    title?: ReactChild;
    buttons?: {
        primary?: ReactElement;
        secondary?: ReactElement;
    } | ReactElement;
    collapse?: boolean;
    headerChildren?: {
        top?: ReactElement;
        bottom?: ReactElement;
    } | ReactElement;
    fullscreen?: boolean;
}>


const NavigatorContent: FC<NavigatorContentProps> = ({
    children,
    title,
    buttons = undefined,
    collapse = true,
    headerChildren,
    fullscreen = false
}) => {
    const [primaryButtons, setPrimaryButtons] = useState<ReactElement | undefined>(undefined);
    const [secondaryButtons, setSecondaryButtons] = useState<ReactElement | undefined>(undefined);

    const [topHeaderChildren, setTopHeaderChildren] = useState<ReactElement | undefined>(undefined);
    const [bottomHeaderChildren, setBottomHeaderChildren] = useState<ReactElement | undefined>(undefined);

    useEffect(() => {
        if (isValidElement(buttons)) {
            setSecondaryButtons(buttons);
        } else {
            if (buttons?.primary) {
                setPrimaryButtons(buttons.primary);
            }

            if (buttons?.secondary) {
                setSecondaryButtons(buttons.secondary);
            }
        }
    }, [buttons]);

    useEffect(() => {
        if (isValidElement(headerChildren)) {
            setTopHeaderChildren(headerChildren);
        } else if (isPlatform('android') && (headerChildren?.top || headerChildren?.bottom)) {
            setTopHeaderChildren(
                <>
                    {headerChildren?.top}
                    {headerChildren?.bottom}
                </>
            );
        } else {
            if (headerChildren?.top) {
                setTopHeaderChildren(headerChildren.top);
            }

            if (headerChildren?.bottom) {
                setBottomHeaderChildren(headerChildren.bottom);
            }
        }
    }, [headerChildren]);

    return (
        <>
            <IonHeader collapse={collapse ? 'fade' : undefined} translucent={true}>
                <IonToolbar>
                    {secondaryButtons ? <IonButtons slot="secondary">{secondaryButtons}</IonButtons> : null}
                    {primaryButtons ? <IonButtons slot="primary">{primaryButtons}</IonButtons> : null}
                    <IonTitle>{title}</IonTitle>
                </IonToolbar>
                {topHeaderChildren ? <IonToolbar>{topHeaderChildren}</IonToolbar> : null}
            </IonHeader>
            <IonContent fullscreen={fullscreen}>
                {collapse ? (
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">{title}</IonTitle>
                        </IonToolbar>
                        {bottomHeaderChildren ? <IonToolbar>{bottomHeaderChildren}</IonToolbar> : null}
                    </IonHeader>
                ) : null}
                {children}
            </IonContent>
        </>
    )
}

export default NavigatorContent;