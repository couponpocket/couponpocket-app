import React from "react";
import { IonList, IonItemGroup, IonListHeader, IonLabel } from "@ionic/react";
import Coupon from "../Coupon";

const CouponList = ({coupons, partner, ionRouterOutlet}) => {
    /* group coupons */
    coupons = coupons.reduce((rv, x) => {
        rv[x.condition] = [...rv[x.condition] || [], x];
        return rv;
    }, {});

    return (
        <IonList className="coupons-list">
            {Object.entries(coupons).map(([key, value]) => (
                <IonItemGroup>
                    <IonListHeader>
                        <IonLabel>{key}</IonLabel>
                    </IonListHeader>
                    {
                        value.map((item, index) => (
                            <Coupon key={index} item={item} partner={partner} ionRouterOutlet={ionRouterOutlet}/>
                        ))
                    }
                </IonItemGroup>
            ))}
        </IonList>
    );
};

export default CouponList;