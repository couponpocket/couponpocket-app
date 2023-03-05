import React, {FC} from 'react';
import {IonCard, IonCardContent, IonCardHeader, IonText} from '@ionic/react';
import {CouponProperties} from '../../../api/services/coupons';
import {CouponCategoryProperties} from '../../../api/services/coupon-categories';
import {FormattedDate} from 'react-intl';

import './Coupon.css';
import Barcode from './Barcode';

interface CouponProps {
    item: CouponProperties;
    partner: CouponCategoryProperties;
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
                <div className="coupon-card-source">
                    Quelle: {item.source}
                </div>
            </div>
            <div className="coupon-card-barcode">
                <Barcode value={item.ean}
                         format={item.ean.length === 13 ? 'ean13' : 'code128'}/>
            </div>
            <div className="coupon-card-valid-till">
                Gültig bis <FormattedDate value={item.valid_till} dateStyle="medium"/>
            </div>
        </IonCardContent>
    </IonCard>
)

export default Coupon;