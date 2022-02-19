import {createReducer} from "@reduxjs/toolkit";
import {setCoupons} from "../actions/coupons";
import {CouponProperties} from "../../api/services/coupons";
import {CouponCategoryProperties} from "../../api/services/coupon-categories";

export interface CouponsState {
    categories: CouponCategoryProperties[];
    coupons: CouponProperties[];
    expires: number;
}

const initialState: CouponsState = {
    categories: [],
    coupons: [],
    expires: 0
}

export default createReducer(initialState, builder => {
    builder.addCase(setCoupons, (state, action) => {
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);

        state.categories = action.payload.categories;
        state.coupons = action.payload.coupons;
        state.expires = expires.getDate();
    })
})