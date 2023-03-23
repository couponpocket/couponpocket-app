import {useIonToast} from '@ionic/react';
import {ToastOptions, IonicSafeString} from '@ionic/core';
import {HookOverlayOptions} from '@ionic/react/dist/types/hooks/HookOverlayOptions';
import {useState} from 'react';
import {closeOutline} from 'ionicons/icons';

const toastOptions: ToastOptions & HookOverlayOptions = {
    position: 'top',
    duration: 5000,
    buttons: [
        {
            side: 'end',
            icon: closeOutline
        }
    ]
}

const useToast = () => {
    const [showToast, dismissToast] = useIonToast();
    const [show] = useState(() => (message: string | IonicSafeString, color = 'dark') => showToast({
        message,
        color,
        ...toastOptions
    }))

    return [show, dismissToast];
}

export default useToast;
