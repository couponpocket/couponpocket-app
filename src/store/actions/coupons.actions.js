import { getCouponCategories } from "../../services";
import { Toast } from "@capacitor/toast";
import { COUPONS_SET, COUPONS_STORAGE_KEY } from "../action-types";
import { Storage } from '@capacitor/storage';

export const loadCoupons = async (store) => {
    const {value} = await Storage.get({key: COUPONS_STORAGE_KEY});

    store.dispatch(dispatchCoupons(COUPONS_SET, JSON.parse(value), false));
}

export const syncCoupons = (callback = null) => async (dispatch) => {
    try {
        const result = await getCouponCategories();
        const {items} = result.data;

        const cacheInvalid = new Date();
        cacheInvalid.setDate(cacheInvalid.getDate() + 1);

        dispatch(dispatchCoupons(COUPONS_SET, {
            cacheInvalid: cacheInvalid.getTime(),
            data: items
        }));
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

const dispatchCoupons = (type, payload, persist = true) => ({
    type,
    payload,
    persist
});