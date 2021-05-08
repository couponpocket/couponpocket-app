import React, { useState } from "react";
import {
    IonButton,
    IonIcon,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonNote,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonLabel,
    IonText, IonGrid, IonRow, IonCol
} from "@ionic/react";
import { closeOutline, add } from "ionicons/icons";
import AppModal from "../AppModal";
import Barcode from "react-barcode";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import "./Coupon.css";

const Coupon = ({item, partner, ionRouterOutlet}) => {
    const [showCouponModal, setShowCouponModal] = useState(false);

    const formatDate = (value) => format(new Date(value), 'P', {locale: de});

    const onCouponClick = () => {
        setShowCouponModal(true);
    };

    const addToWatchlist = () => {
        setShowCouponModal(false);
    }

    return (
        <>
            <IonItemSliding>
                <IonItem>
                    <IonLabel className="ion-text-wrap" onClick={onCouponClick}>
                        <IonText color="primary" className="coupon-points">
                            {item.points} °P
                        </IonText>
                    </IonLabel>
                    <IonNote className="coupon-valid-till">
                        Bis {formatDate(item.valid_till)}
                    </IonNote>
                </IonItem>
                <IonItemOptions side="end">
                    <IonItemOption onClick={() => {}}>Merken</IonItemOption>
                </IonItemOptions>
            </IonItemSliding>

            <AppModal
                isOpen={showCouponModal}
                onDidDismiss={() => setShowCouponModal(false)}
                swipeToClose={true}
                presentingElement={ionRouterOutlet.current}
                cssClass="coupon-modal"
                name="Details zum Coupon"
                buttons={{
                    end: <IonButton onClick={() => setShowCouponModal(false)}>
                        <IonIcon icon={closeOutline}/>
                    </IonButton>
                }}
            >
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

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonButton fill="solid" expand="block" onClick={addToWatchlist}>
                                <IonIcon icon={add} /> Zur Merkliste hinzufügen
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </AppModal>
        </>
    );
};

export default Coupon;