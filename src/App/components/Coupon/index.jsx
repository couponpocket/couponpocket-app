import React, { useRef, useState } from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonNote,
    IonRow,
    IonText
} from "@ionic/react";

import { Toast } from "@capacitor/toast";

import { add, remove, closeOutline } from "ionicons/icons";
import AppModal from "../AppModal";
import Barcode from "react-barcode";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import "./Coupon.css";
import { connect } from "react-redux";
import { addCouponToWatchlist, removeCouponFromWatchlist } from "../../../store/actions";

const Coupon = ({item, partner, ionRouterOutlet, watchlist, addCouponToWatchlist, removeCouponFromWatchlist}) => {
    /**
     * @type {React.MutableRefObject<undefined | HTMLIonItemSlidingElement>}
     */
    const ionItemSliding = useRef();
    const [showCouponModal, setShowCouponModal] = useState(false);

    const formatDate = (value) => format(new Date(value), 'P', {locale: de});

    const onCouponClick = () => {
        setShowCouponModal(true);
    };

    const handleWatchlistEvent = async (event) => {
        if (!event.target.closest('.coupon-modal')) {
            await ionItemSliding.current?.close();
        } else {
            setShowCouponModal(false);
        }
    }

    const prepareCouponItem = (item) => ({
        ...item
    });

    const removeFromWatchlist = async (event) => {
        await handleWatchlistEvent(event);

        try {
            await setTimeout(() => {
                removeCouponFromWatchlist(prepareCouponItem(item));
            }, 500);
            await Toast.show({
                text: 'Der Coupon wurde von der Merkliste entfernt!'
            })
        } catch (e) {
            console.log(e);
            await Toast.show({
                text: 'Es ist ein Fehler aufgetreten. Bitte versuche es Später erneut!'
            })
        }
    }

    const addToWatchlist = async (event) => {
        await handleWatchlistEvent(event);

        try {
            await setTimeout(() => {
                addCouponToWatchlist(prepareCouponItem(item));
            }, 500);
            await Toast.show({
                text: 'Der Coupon wurde zur Merkliste hinzugefügt!'
            })
        } catch (e) {
            console.log(e);
            await Toast.show({
                text: 'Es ist ein Fehler aufgetreten. Bitte versuche es Später erneut!'
            })
        }
    }

    const watchlistContains = (item) => watchlist.find((watchlistItem) => watchlistItem.ean === item.ean);

    return (
        <>
            <IonItemSliding ref={ionItemSliding}>
                <IonItem button onClick={onCouponClick}>
                    <IonLabel className="ion-text-wrap">
                        <IonText color="primary" className="coupon-points">
                            {item.points} °P
                        </IonText>
                    </IonLabel>
                    <IonNote className="coupon-valid-till">
                        Bis {formatDate(item.valid_till)}
                    </IonNote>
                </IonItem>
                <IonItemOptions side="end" onIonSwipe={!watchlistContains(item) ? addToWatchlist : removeFromWatchlist}>
                    {
                        !watchlistContains(item) ?
                            <IonItemOption color="primary" expandable={true} onClick={addToWatchlist}>
                                <IonIcon icon={add} slot="top"/>
                                Zur Merkliste hinzufügen
                            </IonItemOption> :
                            <IonItemOption color="danger" expandable={true} onClick={removeFromWatchlist}>
                                <IonIcon icon={remove} slot="top"/>
                                Von Merkliste entfernen
                            </IonItemOption>
                    }
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
                            {
                                !watchlistContains(item) ?
                                    <IonButton fill="solid" expand="block" onClick={addToWatchlist}>
                                        <IonIcon icon={add}/> Zur Merkliste hinzufügen
                                    </IonButton> :
                                    <IonButton color="danger" fill="solid" expand="block" onClick={removeFromWatchlist}>
                                        <IonIcon icon={remove}/> Von Merkliste entfernen
                                    </IonButton>
                            }
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </AppModal>
        </>
    );
};

const mapStateToProps = (state) => ({
    watchlist: state.watchlist
});

const mapDispatchToProps = ({
    addCouponToWatchlist,
    removeCouponFromWatchlist
});

export default connect(mapStateToProps, mapDispatchToProps)(Coupon);