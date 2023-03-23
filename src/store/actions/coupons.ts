import {createAction} from '@reduxjs/toolkit'
import {CouponProperties} from '../../api/services/coupons';
import {CouponCategoryProperties} from '../../api/services/coupon-categories';

export interface CouponAction {
    categories: CouponCategoryProperties[];
    coupons: CouponProperties[];
}

export const setCoupons = createAction<CouponAction>('setCoupons');