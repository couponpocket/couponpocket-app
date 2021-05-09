import React, { useRef, useState } from "react";
import { connect } from "react-redux";

import {
    IonButton,
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
import { add, closeOutline, remove } from "ionicons/icons";

import { Toast } from "@capacitor/toast";

import AppModal from "../AppModal";
import Coupon from "./Coupon";
import { addCouponToWatchlist, removeCouponFromWatchlist } from "../../../store/actions";

import "./Coupon.css";
import { formatDate } from "../../../helpers";

const CouponItem = ({item, partner, ionRouterOutlet, watchlist, addCouponToWatchlist, removeCouponFromWatchlist}) => {
    /**
     * @type {React.MutableRefObject<undefined | HTMLIonItemSlidingElement>}
     */
    const ionItemSliding = useRef();
    const [showCouponModal, setShowCouponModal] = useState(false);

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
        ...item,
        partner
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
                <Coupon item={item} partner={partner} />

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

export default connect(mapStateToProps, mapDispatchToProps)(CouponItem);