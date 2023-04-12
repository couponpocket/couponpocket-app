import React, {FC, PropsWithChildren, ReactChild, ReactElement} from 'react';
import {IonPage} from '@ionic/react';
import NavigatorContent from './NavigatorContent';

type NavigatorPageProps = PropsWithChildren<{
    title?: ReactChild;
    buttons?: {
        start?: ReactElement;
        end?: ReactElement;
    } | ReactElement;
    collapse?: boolean;
    className?: string;
    headerChildren?: {
        top?: ReactElement;
        bottom?: ReactElement;
    } | ReactElement;
}>

const NavigatorPage: FC<NavigatorPageProps> = ({
    children,
    title,
    buttons = undefined,
    collapse = true,
    className,
    headerChildren
}) => {
    return (
        <IonPage className={className}>
            <NavigatorContent title={title}
                              buttons={buttons}
                              collapse={collapse}
                              headerChildren={headerChildren}
                              fullscreen={true}>
                {children}
            </NavigatorContent>
        </IonPage>
    )
}

export default NavigatorPage;
