import React, {FC} from 'react';
import {IonBackButton, isPlatform} from '@ionic/react';

interface NavigatorBackButtonProps {
    defaultHref?: string;
    text?: string;
}

const NavigatorBackButton: FC<NavigatorBackButtonProps> = ({defaultHref = undefined, text = undefined, ...props}) => {
    if (!isPlatform('ios')) {
        text = undefined;
    } else if (isPlatform('ios') && !text) {
        text = 'Zurück';
    }

    return (
        <IonBackButton defaultHref={defaultHref} text={text} {...props} />
    )
};

export default NavigatorBackButton;
