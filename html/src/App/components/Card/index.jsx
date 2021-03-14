import React from "react";
import { IonImg, IonCol, IonText, IonCard, IonCardContent } from "@ionic/react";
import "./CouponCategoryCard.scss";
import "./CouponCard.scss";

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
                <IonImg className="coupon-category-card-img" src={item.logo} alt={"Logo von " + item.name}/>
            </div>
        </IonCol>
    );
};

export const CouponCard = ({item, setShowCouponModal = null, children = null}) => {
    const onCouponClick = () => {
        if (!setShowCouponModal) {
            return null;
        }

        setShowCouponModal(true);
    };

    return (
        <IonCol offset={1} size={10} offsetMd={0} sizeMd={6} sizeLg={4} sizeXl={3}>
            <IonCard onClick={onCouponClick} className={"coupon-card"}>
                <IonText color="primary">
                    <h2>{item.points} °P</h2>
                </IonText>
                <IonCardContent>
                    {item.condition}
                </IonCardContent>
                {children}
            </IonCard>
        </IonCol>
    );
};