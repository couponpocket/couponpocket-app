import React, { useEffect } from "react";
import AppPage from "../components/AppPage";
import { IonRefresher, IonRefresherContent, IonRouterOutlet } from "@ionic/react";
import { getCouponCategories } from "../services";
import useStorage from "../hooks/useStorage";
import { CouponsCategoryList } from "../components/CardList";

const CouponCategoryPage = ({name, history}) => {
    const [coupons, setCoupons] = useStorage('coupons');

    const syncCoupons = async (callback = null) => {
        try {
            const result = await getCouponCategories();

            const cacheInvalid = new Date();
            cacheInvalid.setDate(cacheInvalid.getDate() + 1);

            await setCoupons({
                cacheInvalid: cacheInvalid.getTime(),
                data: result.data
            });

            if (callback) {
                callback();
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (coupons === undefined) return null;

        if (coupons === null || coupons.cacheInvalid < Date.now()) {
            syncCoupons();
        }
    }, [coupons]);

    return (
        <AppPage name={name} className="coupons">
            <IonRefresher slot="fixed" onIonRefresh={(event) => syncCoupons(() => event.detail.complete())}>
                <IonRefresherContent/>
            </IonRefresher>

            <CouponsCategoryList history={history} coupons={coupons}/>
        </AppPage>
    );
};

export default CouponCategoryPage;
