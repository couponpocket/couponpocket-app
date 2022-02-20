import React, {FC} from "react";
import {useBarcode} from 'react-barcodes';
import {IonCard, IonCardContent, IonCardHeader, IonText} from "@ionic/react";
import {CouponProperties} from "../../../api/services/coupons";
import {CouponCategoryProperties} from "../../../api/services/coupon-categories";
import {FormattedDate} from "react-intl";

interface CouponProps {
    item: CouponProperties,
    partner: CouponCategoryProperties
}

const Coupon: FC<CouponProps> = ({item, partner}) => {
    const {barcode} = useBarcode({
        value: item.ean.toString(),
        options: {
            background: '#ccffff',
        }
    });

    return (
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
                    <div className="coupon-condition">
                        {item.condition}
                    </div>
                    <div className="coupon-valid-till">
                        Bis <FormattedDate value={item.valid_till} dateStyle="medium"/>
                    </div>
                </div>
                <div className="coupon-card-barcode">
                    <svg ref={barcode}/>
                </div>
            </IonCardContent>
        </IonCard>
    );
}

export default Coupon;