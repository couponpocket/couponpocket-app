import {createReducer} from '@reduxjs/toolkit';
import {setCoupons} from '../actions/coupons';
import {CouponProperties} from '../../api/services/coupons';
import {CouponCategoryProperties} from '../../api/services/coupon-categories';

export interface CouponsState {
    categories: CouponCategoryProperties[];
    coupons: CouponProperties[];
}

export const initialCouponState: CouponsState = {
    categories: [],
    coupons: []
}

export default createReducer(initialCouponState, builder => {
    builder.addCase(setCoupons, (state, action) => {
        state.categories = action.payload.categories;
        state.coupons = action.payload.coupons;
    })
})