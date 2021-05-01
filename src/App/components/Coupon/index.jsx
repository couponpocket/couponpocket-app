import React, { useState } from "react";
import { IonButton, IonCol, IonGrid, IonIcon, IonRow, IonItem } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import AppModal from "../AppModal";
import { CouponCard } from "../Card";
import Barcode from "react-barcode";


const Coupon = ({item, router}) => {
    const [showCouponModal, setShowCouponModal] = useState(false);

    return (
        <>
            <IonItem>
                <CouponCard item={item} setShowCouponModal={setShowCouponModal}/>
            </IonItem>
            <AppModal
                isOpen={showCouponModal}
                onDidDismiss={() => setShowCouponModal(false)}
                swipeToClose={true}
                presentingElement={router}
                cssClass="coupon-modal"
                name="Details zum Coupon"
                buttons={{
                    end: <IonButton onClick={() => setShowCouponModal(false)}>
                        <IonIcon icon={closeOutline}/>
                    </IonButton>
                }}
            >
                <IonGrid>
                    <IonRow>
                        <IonCol offset={1} size={10}>
                            <CouponCard item={item}>
                                <div className="coupon-card-barcode">
                                    <Barcode value={item.ean} renderer="svg"/>
                                </div>
                            </CouponCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </AppModal>
        </>
    );
};

export default Coupon;