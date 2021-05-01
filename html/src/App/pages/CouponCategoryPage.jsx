import React, { useEffect } from "react";

import useStorage from "../../hooks/useStorage";

import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { Toast } from "@capacitor/toast";

import AppPage from "../components/AppPage";
import { getCouponCategories } from "../../services";
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
        } catch (exception) {
            if (exception.name === 'NetworkError') {
                await Toast.show({text: exception.message, position: 'top'});
                console.log(exception.message);
            }
        } finally {
            if (callback) {
                callback();
            }
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
