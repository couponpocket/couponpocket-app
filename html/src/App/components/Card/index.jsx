import React from "react";
import { IonImg, IonCol } from "@ionic/react";
import "./CouponCategoryCard.scss";

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