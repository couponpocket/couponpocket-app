import React, {FC, useEffect, useMemo, useRef} from 'react';

import {IonButton, IonIcon, IonSlide, IonSlides} from '@ionic/react';
import {closeOutline, closeSharp} from 'ionicons/icons';

import Coupon from '../../../components/Coupons/Watchlist/Coupon';

import './CouponWatchlistModal.css';
import NavigatorModal, {NavigatorModalProps} from '../../../components/Navigator/NavigatorModal';
import {CouponCategoryProperties} from '../../../../api/services/coupon-categories';
import {useAppSelector} from '../../../../store';
import Card from '../../../components/Coupons/Watchlist/Card';

interface WatchlistModal extends Pick<NavigatorModalProps, 'showModal' | 'setShowModal'> {
    router: NavigatorModalProps['router'];
    partner: CouponCategoryProperties;
    watchlist: string[];
}

const CouponWatchlistModal: FC<WatchlistModal> = ({router, showModal, setShowModal, partner, watchlist}) => {
    const slider = useRef<HTMLIonSlidesElement>(null);

    const coupons = useAppSelector(state => state.coupons.coupons.filter(item => watchlist.includes(item.ean)));
    const {cards, cardTypes} = useAppSelector(state => state.cards);

    const relevantCards = useMemo(() => {
        const relevantCardTypes = cardTypes.filter(el => el.coupon_category_id === partner.id || el.coupon_category_id === null);

        return cards.filter(el => relevantCardTypes.find(rct => rct.id === el.card_type_id));
    }, [cardTypes, cards, partner.id])

    useEffect(() => {
        if (!showModal) {
            return;
        }

        slider.current?.update();
    }, [showModal]);

    return (
        <NavigatorModal showModal={showModal}
                        setShowModal={setShowModal}
                        router={router}
                        modalClassName="watchlist-modal"
                        title={'Merkliste für ' + partner.name}
                        buttons={{
                            end: (
                                <IonButton onClick={() => setShowModal(false)}>
                                    <IonIcon ios={closeOutline} md={closeSharp}/>
                                </IonButton>
                            )
                        }}>
            <IonSlides ref={slider} className="watchlist-slide-list" pager={true}>
                {coupons.map((item) => (
                    <IonSlide key={item.ean} className="watchlist-slide">
                        <Coupon item={item} partner={partner}/>
                    </IonSlide>
                ))}

                {relevantCards.map(item => (
                    <IonSlide key={item.number} className="watchlist-slide">
                        <Card item={item}/>
                    </IonSlide>
                ))}
            </IonSlides>
        </NavigatorModal>
    );
};

export default CouponWatchlistModal;