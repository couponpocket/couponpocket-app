import {getCouponCategories} from "../api/services/coupon-categories";
import {Toast} from "@capacitor/toast";
import {AppDispatch} from "../store";
import {setCoupons} from "../store/actions/coupons";
import {getCoupons} from "../api/services/coupons";

export const syncCoupons = (callback?: () => any) => async (dispatch: AppDispatch) => {
    try {
        const categories = (await getCouponCategories()).data.items;
        const coupons = (await getCoupons()).data.items;

        dispatch(setCoupons({
            categories,
            coupons
        }));
    } catch (exception: unknown) {
        if (!(exception instanceof Error)) {
            return;
        }

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
