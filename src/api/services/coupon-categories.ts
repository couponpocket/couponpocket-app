import api, {ResourceEntity} from '../index'

export enum CodeType {
    CODE128 = 1,
    EAN13,
    QR
}

export interface CouponCategoryProperties extends ResourceEntity {
    name: string;
    color_background: string;
    color_foreground: string;
    code_type: CodeType;
}

type CouponCategoriesResponse = CouponCategoryProperties[];

export const getCouponCategories = async (): Promise<CouponCategoriesResponse> => {
    const response = await api.get<CouponCategoriesResponse>('/coupon-categories?sortKey=name');
    return response.data;
}