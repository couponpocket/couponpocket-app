import React, {FC} from 'react';
import {IonButton, IonIcon, IonRefresher, IonRefresherContent} from '@ionic/react';

import CouponCategoryList from '../../components/Coupons/CouponCategoryList';
import {syncCoupons} from '../../../helpers/coupons';
import NavigatorPage from '../../components/Navigator/NavigatorPage';
import {NavigatorProps} from '../../components/Navigator/types';
import {useAppDispatch} from '../../../store';
import {addOutline, addSharp} from "ionicons/icons";

type CouponCategoryPageProps = NavigatorProps;

const CouponCategoryPage: FC<CouponCategoryPageProps> = ({title}) => {
    const dispatch = useAppDispatch();

    return (
        <NavigatorPage title={title} buttons={{
            primary: (
                <IonButton disabled>
                    <IonIcon slot="icon-only" ios={addOutline} md={addSharp}/>
                </IonButton>
            )
        }}>
            <IonRefresher slot="fixed" onIonRefresh={(event) => syncCoupons(dispatch, () => event.detail.complete())}>
                <IonRefresherContent/>
            </IonRefresher>

            <CouponCategoryList/>
        </NavigatorPage>
    );
};

export default CouponCategoryPage;