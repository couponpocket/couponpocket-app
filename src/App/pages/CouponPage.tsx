import React, {FC, useState} from "react";

import {IonButton, IonIcon, IonRefresher, IonRefresherContent} from "@ionic/react";

import NavigatorPage from "../components/Navigator/NavigatorPage";
import CouponList from "../components/Coupon/CouponList/CouponList";
import NotFoundPage from "./NotFoundPage";
import NavigatorBackButton from "../components/Navigator/NavigatorBackButton";
import {bagOutline, bagSharp} from "ionicons/icons";
import {NavigatorProps} from "../components/Navigator/types";
import {useAppSelector} from "../../store";
import {syncCoupons} from "../../helpers/coupons";

interface CouponPage extends NavigatorProps {
}

const CouponPage: FC<CouponPage> = ({router, ...props}) => {
    const [, setShowWatchlistModal] = useState(false);
    const categories = useAppSelector(state => state.coupons.categories);

    const partner = categories.find((item) => item.id == props.match.params.id);

    if (!partner) {
        return <NotFoundPage/>;
    }

    const toolbarButtonRight = (
        <IonButton onClick={() => setShowWatchlistModal(true)}>
            <IonIcon slot="icon-only" ios={bagOutline} md={bagSharp}/>
        </IonButton>
    );

    return (
        <NavigatorPage title={partner.name} className="coupons" collapse={false}
                       buttons={{
                           start: <NavigatorBackButton text="Coupons"/>,
                           end: toolbarButtonRight
                       }}>
            <IonRefresher slot="fixed" onIonRefresh={(event) => syncCoupons(() => event.detail.complete())}>
                <IonRefresherContent/>
            </IonRefresher>

            <CouponList partner={partner} ionRouterOutlet={router}/>
        </NavigatorPage>
    );
};

export default CouponPage;