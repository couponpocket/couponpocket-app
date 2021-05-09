import React, { useState } from "react";
import { connect } from "react-redux";

import { IonButton, IonCol, IonGrid, IonIcon, IonRow, IonSlide, IonSlides } from "@ionic/react";
import { bagOutline, bagSharp, closeOutline } from "ionicons/icons";

import AppModal from "../AppModal";
import Coupon from "../Coupon/Coupon";

import "./Watchlist.css";

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
    speed: 400
};

const WatchlistModal = ({ionRouterOutlet, currentPartner, watchlist}) => {
    const [showWatchlistModal, setShowWatchlistModal] = useState(false);

    watchlist = watchlist.filter((item) => item.partner.id === currentPartner.id);

    return (
        <>
            <IonButton onClick={() => setShowWatchlistModal(true)}>
                <IonIcon slot="icon-only" ios={bagOutline} md={bagSharp}/>
            </IonButton>

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
                        <IonSlides className="watchlist-slide-list"
                                   pager={true}
                                   options={slideOpts}>
                            {watchlist.map((item) => {
                                return (
                                    <IonSlide className="watchlist-slide">
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
        </>
    );
};

const mapStateToProps = state => ({
    watchlist: state.watchlist
});

const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistModal);