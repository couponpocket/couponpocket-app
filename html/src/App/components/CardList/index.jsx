import React from "react";
import { IonGrid, IonRow, IonList } from "@ionic/react";
import { CouponCategoryCard } from "../Card";
import Coupon from "../Coupon";

export const CouponsCategoryList = ({coupons, history}) => {

    if (!coupons || typeof coupons !== 'object') return null;

    const {items} = coupons.data;

    return (
        <IonGrid>
            <IonRow className="coupon-category-list">
                {items.map((item, index) => (
                    <CouponCategoryCard history={history} key={index} item={item}/>
                ))}
            </IonRow>
        </IonGrid>
    );
};

export const CouponList = ({coupons}) => {

    if (!coupons || typeof coupons !== 'object') return null;

    const router = document.querySelector('ion-router-outlet');

    return (
        <IonList className="coupons-list">
            {coupons.map((item, index) => (
                <Coupon key={index} item={item} router={router}/>
            ))}
        </IonList>
    );
};