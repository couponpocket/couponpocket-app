import { getCouponCategories } from "../../services";
import { Toast } from "@capacitor/toast";
import { COUPONS_SET } from "../action-types";
import { Storage } from '@capacitor/storage';

export const loadCoupons = async (store) => {
    const {value} = await Storage.get({key: 'coupons'});

    store.dispatch(setCoupons(JSON.parse(value)));
}

export const syncCoupons = (callback = null) => async (dispatch) => {
    try {
        const result = await getCouponCategories();
        const {items} = result.data;

        dispatch(setCoupons(items));

        await Storage.set({key: 'coupons', value: JSON.stringify(items)});
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

const setCoupons = (payload) => ({
    type: COUPONS_SET,
    payload: payload
});