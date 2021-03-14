import React, { useState, useRef, useEffect } from "react";
import { IonButton, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import AppModal from "../AppModal";
import { CouponCard } from "../Card";
import Barcode from "react-barcode";


const Coupon = ({item, router}) => {
    const [showCouponModal, setShowCouponModal] = useState(false);

    return (
        <>
            <CouponCard item={item} setShowCouponModal={setShowCouponModal}/>
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
                        <CouponCard item={item}>
                            <div className="coupon-card-barcode">
                                <Barcode value={item.ean} renderer="svg"/>
                            </div>
                        </CouponCard>
                    </IonRow>
                </IonGrid>
            </AppModal>
        </>
    );
};

export default Coupon;