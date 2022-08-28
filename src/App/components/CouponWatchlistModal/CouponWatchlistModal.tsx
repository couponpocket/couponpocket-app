import React, {FC, useEffect, useRef} from 'react';

import {IonButton, IonIcon, IonSlide, IonSlides} from '@ionic/react';
import {closeOutline, closeSharp} from 'ionicons/icons';

import Coupon from '../Coupon/Coupon';

import './CouponWatchlistModal.css';
import NavigatorModal, {NavigatorModalProps} from '../Navigator/NavigatorModal';
import {CouponCategoryProperties} from '../../../api/services/coupon-categories';
import {useAppSelector} from '../../../store';

interface WatchlistModal extends Pick<NavigatorModalProps, 'showModal' | 'setShowModal'> {
    router: NavigatorModalProps['router'];
    partner: CouponCategoryProperties;
    watchlist: number[];
}

const CouponWatchlistModal: FC<WatchlistModal> = ({router, showModal, setShowModal, partner, watchlist}) => {
    const slider = useRef<HTMLIonSlidesElement>(null);

    const coupons = useAppSelector(state => state.coupons.coupons.filter(item => watchlist.includes(item.ean)));

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
            </IonSlides>
        </NavigatorModal>
    );
};

export default CouponWatchlistModal;