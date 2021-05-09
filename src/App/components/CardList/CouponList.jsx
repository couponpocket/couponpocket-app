import React from "react";
import { IonList, IonItemGroup, IonListHeader, IonLabel } from "@ionic/react";
import CouponItem from "../Coupon/CouponItem";

const CouponList = ({coupons, partner, ionRouterOutlet}) => {
    /* group coupons */
    coupons = coupons.reduce((rv, x) => {
        rv[x.condition] = [...rv[x.condition] || [], x];
        return rv;
    }, {});

    return (
        <IonList className="coupons-list">
            {Object.entries(coupons).map(([key, value], index) => (
                <IonItemGroup key={index}>
                    <IonListHeader>
                        <IonLabel>{key}</IonLabel>
                    </IonListHeader>
                    {
                        value.map((item, index) => (
                            <CouponItem key={index} item={item} partner={partner} ionRouterOutlet={ionRouterOutlet}/>
                        ))
                    }
                </IonItemGroup>
            ))}
        </IonList>
    );
};

export default CouponList;