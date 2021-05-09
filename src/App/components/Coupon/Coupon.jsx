import { IonCard, IonCardContent, IonCardHeader, IonText } from "@ionic/react";
import Barcode from "react-barcode";
import React from "react";
import { formatDate } from "../../../helpers";

const Coupon = ({item, partner}) => {
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
                <div className="coupon-card-details" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className="coupon-condition">
                        {item.condition}
                    </div>
                    <div className="coupon-valid-till">
                        Bis {formatDate(item.valid_till)}
                    </div>
                </div>
                <div className="coupon-card-barcode">
                    <Barcode value={item.ean} renderer="svg"/>
                </div>
            </IonCardContent>
        </IonCard>
    );
}

export default Coupon;