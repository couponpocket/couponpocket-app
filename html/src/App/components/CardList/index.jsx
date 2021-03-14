import React from "react";
import { IonGrid, IonRow } from "@ionic/react";
import { CouponCategoryCard } from "../Card";

export const CouponsCategoryList = ({coupons, history}) => {

    if (!coupons || typeof coupons !== 'object') return null;

    const {items} = coupons.data;

    return (
        <IonGrid>
            <IonRow className="coupons-list">
                {items.map((item, index) => (
                    <CouponCategoryCard history={history} key={index} item={item}/>
                ))}
            </IonRow>
        </IonGrid>
    );
};

export const CouponList = ({coupons, name}) => {

    if (!coupons || typeof coupons !== 'object') return null;

    return (
        <IonGrid>
            <IonRow className="coupons-list">
                {coupons.map((item, index) => (
                    <CouponCategoryCard key={index} item={item}/>
                ))}
            </IonRow>
        </IonGrid>
    );
};