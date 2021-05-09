import React from "react";
import { connect } from "react-redux";

import AppPage from "../components/AppPage";
import CouponList from "../components/CardList/CouponList";
import NotFoundPage from "./NotFoundPage";
import AppBackButton from "../components/AppBackButton";
import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { syncCoupons } from "../../store/actions";

const CouponPage = ({coupons, ionRouterOutlet, syncCoupons, ...props}) => {
    if (!coupons.data) return null;

    const list = coupons.data.find((item) => item.id === parseInt(props.match.params.id));

    if (list === undefined) return <NotFoundPage/>;

    const partner = {
        name: list.name,
        color_background: list.color_background,
        color_foreground: list.color_foreground
    };

    return (
        <AppPage name={list.name} className="coupons" collapse={false} buttons={<AppBackButton text="Coupons"/>}>
            <IonRefresher slot="fixed" onIonRefresh={(event) => syncCoupons(() => event.detail.complete())}>
                <IonRefresherContent/>
            </IonRefresher>

            <CouponList coupons={list.coupons} partner={partner} ionRouterOutlet={ionRouterOutlet}/>
        </AppPage>
    );
};

const mapStateToProps = state => ({
    coupons: state.coupons
});

const mapDispatchToProps = ({
    syncCoupons
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponPage);