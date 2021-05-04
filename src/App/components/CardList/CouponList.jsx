import React  from "react";
import { IonList, IonListHeader, IonLabel } from "@ionic/react";
import Coupon from "../Coupon";

const CouponList = ({coupons, ionRouterOutlet}) => {

    coupons = coupons.reduce((rv, x) => {
        rv[x.condition] = [...rv[x.condition] || [], x];
        return rv;
    }, {});

    return (
        <IonList className="coupons-list">
            {Object.entries(coupons).map(([key, value]) => [
                <IonListHeader>
                    <IonLabel>{key}</IonLabel>
                </IonListHeader>,
                value.map((item, index) => (
                    <Coupon key={index} item={item} ionRouterOutlet={ionRouterOutlet}/>
                ))
            ])}
        </IonList>
    );
};

export default CouponList;