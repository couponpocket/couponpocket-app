import api, {ApiResponse, ResourceEntity} from "../index"
import {AxiosPromise} from "axios";

export interface CouponProperties extends ResourceEntity {
    points: string,
    condition: string
    ean: number,
    source: string | undefined,
    valid_from: Date
    valid_till: Date,
    coupon_category_id: string
}

export const getCoupons = async (): Promise<AxiosPromise<ApiResponse<CouponProperties[]>>> => {
    return await api.get('/coupons');
}