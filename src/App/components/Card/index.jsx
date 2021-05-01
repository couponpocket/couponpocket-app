import React from "react";
import { IonImg, IonCol, IonText, IonCard, IonCardContent } from "@ionic/react";
import "./CouponCategoryCard.css";
import "./CouponCard.css";

export const CouponCategoryCard = ({item, history, ...htmlProps}) => {
    const handleClick = (id) => {
        history.push('/coupons/' + id);
    }

    return (
        <IonCol size={6} sizeMd={4} sizeLg={3} sizeXl={2}>
            <div onClick={() => handleClick(item.id)}
                 className={"coupon-category-card"}
                 style={{backgroundColor: item.color}}
                 {...htmlProps}>
                {item.name}
            </div>
        </IonCol>
    );
};

export const CouponCard = ({item, setShowCouponModal = null, children = null, showLogo = false}) => {
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