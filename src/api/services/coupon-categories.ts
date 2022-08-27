import api, {ResourceEntity} from '../index'

export enum CodeStyle {
    CODE128 = 1,
    EAN13,
    QR
}

export interface CouponCategoryProperties extends ResourceEntity {
    name: string;
    color_background: string;
    color_foreground: string;
    code_style: CodeStyle;
}

type CouponCategoriesResponse = CouponCategoryProperties[];

export const getCouponCategories = async (): Promise<CouponCategoriesResponse> => {
    const response = await api.get<CouponCategoriesResponse>('/coupon-categories');
    return response.data;
}