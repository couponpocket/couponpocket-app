import api, {ResourceEntity} from '../index'

export interface CardTypeProperty extends ResourceEntity {
    name: string;
    coupon_category_id: string;
}

type CardTypesResponse = CardTypeProperty[];

export const getCardTypes = async (token: string): Promise<CardTypesResponse> => {
    const response = await api.get<CardTypesResponse>('/card-types', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    return response.data;
}