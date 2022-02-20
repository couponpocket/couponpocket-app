import React, {FC} from "react";
import {IonRefresher, IonRefresherContent} from "@ionic/react";

import CouponCategoryList from "../components/CouponCategory/CouponCategoryList/CouponCategoryList";
import {syncCoupons} from "../../helpers/coupons";
import NavigatorPage from "../components/Navigator/NavigatorPage";
import {NavigatorProps} from "../components/Navigator/types";
import {useAppDispatch} from "../../store";

type CouponCategoryPageProps = NavigatorProps;

const CouponCategoryPage: FC<CouponCategoryPageProps> = ({title}) => {
    const dispatch = useAppDispatch();

    return (
        <NavigatorPage title={title}>
            <IonRefresher slot="fixed" onIonRefresh={(event) => syncCoupons(dispatch, () => event.detail.complete())}>
                <IonRefresherContent/>
            </IonRefresher>

            <CouponCategoryList/>
        </NavigatorPage>
    );
};

export default CouponCategoryPage;