import React from "react";
import { IonText } from "@ionic/react";
import "./CouponCard.css";

const CouponCard = ({item, setShowCouponModal = null, children = null}) => {
    const onCouponClick = () => {
        if (!setShowCouponModal) {
            return null;
        }

        setShowCouponModal(true);
    };

    return (
        <div onClick={onCouponClick}>
            <IonText color="primary">
                <h2>{item.points} °P</h2>
            </IonText>
            <IonCardContent>
                {item.condition}
            </IonCardContent>
            {children}
        </div>
    );
};

export default CouponCard;