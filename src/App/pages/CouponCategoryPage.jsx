import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IonRefresher, IonRefresherContent } from "@ionic/react";

import AppPage from "../components/AppPage";
import CouponsCategoryList from "../components/CardList/CouponsCategoryList";
import { syncCoupons } from "../../store/actions";

const CouponCategoryPage = ({name, history, coupons, syncCoupons}) => {
    return (
        <AppPage name={name} className="coupons">
            <IonRefresher slot="fixed" onIonRefresh={(event) => syncCoupons(() => event.detail.complete())}>
                <IonRefresherContent/>
            </IonRefresher>

            <CouponsCategoryList history={history} coupons={coupons}/>
        </AppPage>
    );
};

const mapStateToProps = state => ({
    coupons: state.coupons
});

const mapDispatchToProps = ({
    syncCoupons
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponCategoryPage);