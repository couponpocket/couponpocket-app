import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import { IonButton, IonCol, IonGrid, IonIcon, IonRow, IonSlide, IonSlides } from "@ionic/react";
import { closeOutline } from "ionicons/icons";

import AppModal from "../AppModal";
import Coupon from "../Coupon/Coupon";

import "./Watchlist.css";

const WatchlistModal = ({ionRouterOutlet, showWatchlistModal, setShowWatchlistModal, currentPartner, watchlist}) => {
    /**
     * @type {React.MutableRefObject<null | HTMLIonSlidesElement>}
     */
    const slider = useRef(null);

    useEffect(() => {
        if (!showWatchlistModal) {
            return null;
        }

        slider.current?.update();
    }, [showWatchlistModal]);

    watchlist = watchlist.filter((item) => item.partner.id === currentPartner.id);

    return (
        <AppModal isOpen={showWatchlistModal}
                  onDidDismiss={() => setShowWatchlistModal(false)}
                  swipeToClose={true}
                  presentingElement={ionRouterOutlet.current}
                  cssClass="watchlist-modal"
                  name={'Merkliste für ' + currentPartner.name}
                  buttons={{
                      end: <IonButton onClick={() => setShowWatchlistModal(false)}>
                          <IonIcon icon={closeOutline}/>
                      </IonButton>
                  }}>
            {
                watchlist.length ?
                    <IonSlides ref={slider} className="watchlist-slide-list" pager={true}>
                        {watchlist.map((item, index) => {
                            return (
                                <IonSlide key={index} className="watchlist-slide">
                                    <Coupon item={item} partner={item.partner}/>
                                </IonSlide>
                            );
                        })}
                    </IonSlides> :
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <p>Aktuell hast du keine Coupons in deiner Merkliste für {currentPartner.name}!</p>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
            }
        </AppModal>
    );
};

const mapStateToProps = state => ({
    watchlist: state.watchlist
});

export default connect(mapStateToProps)(WatchlistModal);