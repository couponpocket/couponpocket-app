import React from "react";
import { IonCol, IonCard, IonCardTitle } from "@ionic/react";
import "./CouponCategoryCard.css";

const CouponCategoryCard = ({item, history, ...htmlProps}) => {
    const link = (id) => {
        return '/coupons/' + id
    }

    return (
        <IonCol size={6} sizeMd={4} sizeLg={3} sizeXl={2}>
            <IonCard routerLink={link(item.id)}
                 className="coupon-category-card"
                 style={{backgroundColor: item.color}}
                 {...htmlProps}>

                <IonCardTitle className="coupon-category-card-name">
                    {item.name}
                </IonCardTitle>
            </IonCard>
        </IonCol>
    );
};

export default CouponCategoryCard;