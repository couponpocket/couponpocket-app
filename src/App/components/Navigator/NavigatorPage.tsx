import React, {FC, PropsWithChildren} from 'react';
import {IonPage} from '@ionic/react';
import NavigatorContent, {NavigatorContentProps} from './NavigatorContent';

type NavigatorPageProps = PropsWithChildren<{
    title?: NavigatorContentProps['title'];
    buttons?: NavigatorContentProps['buttons'];
    collapse?: NavigatorContentProps['collapse'];
    headerChildren?: NavigatorContentProps['headerChildren'];
    className?: string;
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
