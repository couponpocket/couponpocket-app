import React, {FC} from "react";
import {IonCol, IonRow} from "@ionic/react";

import './AuthHr.css';

const AuthHr: FC = () => {
    return (
        <IonRow>
            <IonCol offsetMd="2" sizeMd="8" offsetXl="3" sizeXl="6">
                <div className="auth-hr">
                    <span>oder</span>
                </div>
            </IonCol>
        </IonRow>
    )
}

export default AuthHr;