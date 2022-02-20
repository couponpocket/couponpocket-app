import React, {FC, useCallback, useState} from 'react';

import {IonFab, IonFabButton, IonIcon, IonRefresher, IonRefresherContent} from '@ionic/react';

import NavigatorPage from '../components/Navigator/NavigatorPage';
import CouponList from '../components/Coupon/CouponList/CouponList';
import NotFoundPage from './NotFoundPage';
import NavigatorBackButton from '../components/Navigator/NavigatorBackButton';
import {checkmarkDoneOutline, checkmarkDoneSharp} from 'ionicons/icons';
import {NavigatorProps} from '../components/Navigator/types';
import {useAppDispatch, useAppSelector} from '../../store';
import {syncCoupons} from '../../helpers/coupons';
import CouponWatchlistModal from '../components/CouponWatchlistModal/CouponWatchlistModal';
import {RouteComponentProps} from 'react-router';

interface MatchProps {
    id: string
}

type CouponPage = NavigatorProps & RouteComponentProps<MatchProps>;

const CouponPage: FC<CouponPage> = ({router, match}) => {
    const [watchlist, setWatchlist] = useState<number[]>([]);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.coupons.categories);

    const partner = categories.find((item) => item.id.toString() === match.params.id);

    const toggleItem = useCallback((ean: number) => {
        if (watchlist.includes(ean)) {
            setWatchlist(watchlist.filter(item => ean !== item));
        } else {
            setWatchlist([...watchlist, ean]);
        }
    }, [watchlist])

    if (!partner) {
        return <NotFoundPage/>;
    }

    return (
        <NavigatorPage title={partner.name} className="coupons" collapse={true}
                       buttons={<NavigatorBackButton text="Coupons"/>}>
            <IonRefresher slot="fixed" onIonRefresh={(event) => syncCoupons(dispatch, () => event.detail.complete())}>
                <IonRefresherContent/>
            </IonRefresher>

            <CouponList partner={partner} watchlist={watchlist} toggleItem={toggleItem}/>

            {watchlist.length > 0 ? (
                <>
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton onClick={() => setShowModal(true)}>
                            <IonIcon ios={checkmarkDoneOutline} md={checkmarkDoneSharp}/>
                        </IonFabButton>
                    </IonFab>
                    <CouponWatchlistModal router={router} showModal={showModal} setShowModal={setShowModal}
                                          partner={partner} watchlist={watchlist}/>
                </>
            ) : null}
        </NavigatorPage>
    );
};

export default CouponPage;