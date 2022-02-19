import React, {FC} from "react";
import {IonRefresher, IonRefresherContent} from "@ionic/react";

import CouponsCategoryList from "../components/CouponCategory/CouponsCategoryList/CouponsCategoryList";
import {syncCoupons} from "../../helpers/coupons";
import NavigatorPage from "../components/Navigator/NavigatorPage";

interface CouponCategoryPageProps {
    name: string
}

const CouponCategoryPage: FC<CouponCategoryPageProps> = ({name}) => {
    return (
        <NavigatorPage title={name}>
            <IonRefresher slot="fixed" onIonRefresh={(event) => syncCoupons(() => event.detail.complete())}>
                <IonRefresherContent/>
            </IonRefresher>

            <CouponsCategoryList/>
        </NavigatorPage>
    );
};

export default CouponCategoryPage;