import api, {ResourceEntity} from '../index'

export interface CouponProperties extends ResourceEntity {
    points: string;
    condition: string;
    ean: string;
    source: string | undefined;
    valid_from: Date;
    valid_till: Date;
    visibility: number; // 0 = hidden; 1 = visible
    coupon_category_id: string;
}

type CouponsResponse = CouponProperties[];

export const getCoupons = async (token?: string): Promise<CouponsResponse> => {
    const response = await api.get<CouponsResponse>('/coupons', token ? {
        headers: {
            Authorization: 'Bearer ' + token
        }
    } : undefined);
    return response.data;
}
