import api, {ResourceEntity} from '../index'

export interface CardTypeProperties extends ResourceEntity {
    name: string;
    coupon_category_id: string;
}

type CardTypesResponse = CardTypeProperties[];

export const getCardTypes = async (token: string): Promise<CardTypesResponse> => {
    const response = await api.get<CardTypesResponse>('/card-types', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    return response.data;
}