import {getCouponCategories} from '../api/services/coupon-categories';
import {Toast} from '@capacitor/toast';
import {AppDispatch} from '../store';
import {setCoupons} from '../store/actions/coupons';
import {getCoupons} from '../api/services/coupons';

export const syncCoupons = async (dispatch: AppDispatch, callback?: () => void) => {
    try {
        const [categories, coupons] = await Promise.all([getCouponCategories(), getCoupons()]);

        dispatch(setCoupons({
            categories: categories.data.items,
            coupons: coupons.data.items
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
