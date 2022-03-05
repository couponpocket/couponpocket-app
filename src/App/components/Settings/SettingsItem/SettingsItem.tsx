import React, {FC, PropsWithChildren} from "react";
import {
    IonIcon, IonItem, IonThumbnail
} from "@ionic/react";

import './SettingsItem.css';

type SettingsItemProps = PropsWithChildren<{
    avatarColor: string
    iconIos: string
    iconMd: string
    detail?: boolean,
    onClick?: () => void
    routerLink?: string
}>;

const SettingsItem: FC<SettingsItemProps> = ({avatarColor, iconIos, iconMd, routerLink, detail = false, onClick, children}) => {
    return (
        <IonItem className="settings-item" detail={detail} onClick={onClick} routerLink={routerLink}>
            <IonThumbnail slot="start"
                          className={`settings-item-avatar settings-item-avatar-color-${avatarColor}`}>
                <IonIcon className="settings-item-avatar-icon"
                         ios={iconIos}
                         md={iconMd}/>
            </IonThumbnail>
            {children}
        </IonItem>
    )
}

export default SettingsItem;