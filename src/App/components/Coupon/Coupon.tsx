import React, {FC} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Barcode from 'react-barcode';
import {IonCard, IonCardContent, IonCardHeader, IonText} from '@ionic/react';
import {CouponProperties} from '../../../api/services/coupons';
import {CouponCategoryProperties} from '../../../api/services/coupon-categories';
import {FormattedDate} from 'react-intl';

import './Coupon.css';

interface CouponProps {
    item: CouponProperties,
    partner: CouponCategoryProperties
}

const Coupon: FC<CouponProps> = ({item, partner}) => (
    <IonCard className="coupon-card">
        <IonCardHeader className="coupon-card-header" style={{
            backgroundColor: partner.color_background,
            color: partner.color_foreground
        }}>
            <IonText className="coupon-card-header-points">
                {item.points} °P
            </IonText>
            <IonText className="coupon-card-header-partner">
                {partner.name}
            </IonText>
        </IonCardHeader>
        <IonCardContent>
            <div className="coupon-card-details">
                <div className="coupon-card-condition">
                    {item.condition}
                </div>
                <div className="coupon-card-valid-till">
                    Bis <FormattedDate value={item.valid_till} dateStyle="medium"/>
                </div>
                <div className="coupon-card-source">
                    Quelle: {item.source}
                </div>
            </div>
            <div className="coupon-card-barcode">
                <Barcode value={item.ean.toString()} renderer="svg"/>
            </div>
        </IonCardContent>
    </IonCard>
)

export default Coupon;