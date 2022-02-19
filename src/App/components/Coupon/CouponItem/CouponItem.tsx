import React, {FC} from "react";

import {
    IonItem,
    IonLabel,
    IonNote,
    IonText
} from "@ionic/react";

import "../Coupon.css";
import {formatDate} from "../../../../helpers";
import {CouponProperties} from "../../../../api/services/coupons";

interface CouponItemProps {
    item: CouponProperties
}

const CouponItem: FC<CouponItemProps> = ({item}) => {
    return (
        <IonItem button>
            <IonLabel className="ion-text-wrap">
                <IonText color="primary" className="coupon-points">
                    {item.points} °P
                </IonText>
            </IonLabel>
            <IonNote className="coupon-valid-till">
                Bis {formatDate(item.valid_till)}
            </IonNote>
        </IonItem>
    );
};

export default CouponItem;