import React, {FC} from "react";

import {
    IonItem,
    IonLabel,
    IonNote,
    IonText
} from "@ionic/react";

import "./CouponItem.css";
import {CouponProperties} from "../../../../api/services/coupons";
import {FormattedDate} from "react-intl";

interface CouponItemProps {
    item: CouponProperties
}

const CouponItem: FC<CouponItemProps> = ({item}) => {
    return (
        <IonItem>
            <IonLabel>
                <IonText color="primary" className="coupon-points">
                    {item.points} °P
                </IonText>
                <IonText className="coupon-condition">
                    {item.condition}
                </IonText>
                <IonText className="coupon-ean">
                    Code: {item.ean}
                </IonText>
            </IonLabel>
            <IonNote className="coupon-valid-till">
                Bis <FormattedDate value={item.valid_till} dateStyle="medium"/>
            </IonNote>
        </IonItem>
    );
};

export default CouponItem;