import React, {FC} from "react";
import {IonRefresher, IonRefresherContent} from "@ionic/react";

import CouponsCategoryList from "../components/CouponCategory/CouponsCategoryList/CouponsCategoryList";
import {syncCoupons} from "../../helpers/coupons";
import NavigatorPage from "../components/Navigator/NavigatorPage";
import {NavigatorProps} from "../components/Navigator/types";

type CouponCategoryPageProps = NavigatorProps;

const CouponCategoryPage: FC<CouponCategoryPageProps> = ({title}) => {
    return (
        <NavigatorPage title={title}>
            <IonRefresher slot="fixed" onIonRefresh={(event) => syncCoupons(() => event.detail.complete())}>
                <IonRefresherContent/>
            </IonRefresher>

            <CouponsCategoryList/>
        </NavigatorPage>
    );
};

export default CouponCategoryPage;