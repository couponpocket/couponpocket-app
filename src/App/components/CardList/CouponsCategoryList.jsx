import React from "react";

import { IonCol, IonGrid, IonRow } from "@ionic/react";
import CouponCategoryCard from "../Card/CouponCategoryCard";

const CouponsCategoryList = ({coupons, history}) => {
    if (!coupons.data) return null;

    return (
        <IonGrid>
            <IonRow className="coupon-category-list">
                {Array.from(coupons.data).map((item, index) => (
                    <CouponCategoryCard history={history} key={index} item={item}/>
                ))}
            </IonRow>
            <IonRow>
                <IonCol>
                    <p>Alle Coupons werden von Hedis Couponlist bereitsgestellt.</p>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default CouponsCategoryList;