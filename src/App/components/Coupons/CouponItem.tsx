import React, {FC} from 'react';

import {
    IonCheckbox,
    IonItem,
    IonLabel,
    IonNote,
    IonText
} from '@ionic/react';

import './CouponItem.css';
import {CouponProperties} from '../../../api/services/coupons';
import {FormattedDate} from 'react-intl';

interface CouponItemProps {
    item: CouponProperties;
    checked: boolean;
    toggleItem: (ean: string) => void;
}

const CouponItem: FC<CouponItemProps> = ({item, checked, toggleItem}) => {
    return (
        <IonItem>
            <IonCheckbox slot="start" checked={checked} onIonChange={() => toggleItem(item.ean)}/>
            <IonLabel>
                <IonText color="primary" className="coupon-points">
                    {item.points} °P
                </IonText>
                <IonText className="coupon-condition">
                    {item.condition}
                </IonText>
                <IonText className="coupon-source">
                    Quelle: {item.source}
                </IonText>
            </IonLabel>
            <IonNote className="coupon-valid-till">
                Bis <FormattedDate value={item.valid_till} dateStyle="medium"/>
            </IonNote>
        </IonItem>
    );
};

export default CouponItem;