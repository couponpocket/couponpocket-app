import api, {ApiResponse, ResourceEntity} from "../index"
import {AxiosResponse} from "axios";

export enum CodeStyle {
    CODE128 = 1,
    EAN13,
    QR
}

export interface CouponCategoryProperties extends ResourceEntity {
    name: string,
    color_background: string
    color_foreground: string
    code_style: CodeStyle
}

export const getCouponCategories = async (): Promise<AxiosResponse<ApiResponse<CouponCategoryProperties[]>>> => {
    return await api.get('/coupon-categories');
}