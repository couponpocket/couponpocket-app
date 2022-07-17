import api, {ResourceEntity} from '../index'

export interface CouponProperties extends ResourceEntity {
    points: string,
    condition: string
    ean: number,
    source: string | undefined,
    valid_from: Date
    valid_till: Date,
    coupon_category_id: string
}

type CouponsResponse = CouponProperties[];

export const getCoupons = async (): Promise<CouponsResponse> => {
    const response = await api.get<CouponsResponse>('/coupons');
    return response.data;
}
