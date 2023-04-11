import api, {ExceptionResponse, ResourceEntity, ResponseError, ValidationExceptionResponse} from '../index'
import axios from 'axios';

export interface CardProperties extends ResourceEntity {
    number: number;
    user_id: string;
    card_type_id?: string;
}

export type AddCardRequest = Pick<CardProperties, 'number' | 'user_id' | 'card_type_id'>;

export type AddCardResponse = CardProperties;

export type RemoveCardResponse = CardProperties;

export type CardsResponse = CardProperties[];

export const getCards = async (token: string): Promise<CardsResponse> => {
    const response = await api.get<CardsResponse>('/cards', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    return response.data;
}

export const addCard = async (card: AddCardRequest, token: string) => {
    try {
        const response = await api.post<AddCardResponse>('/cards', card, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response.data;
    } catch (e) {
        if (!axios.isAxiosError(e)) {
            console.error(e);
            return;
        }
        switch (e.response?.status) {
            case 422:
                throw new ResponseError<ValidationExceptionResponse>(e.message, e.response);
            default:
                throw new ResponseError<ExceptionResponse>(e.message, e.response);
        }
    }
}

export const removeCard = async (cardId: CardProperties['id'], token: string) => {
    try {
        const response = await api.delete<RemoveCardResponse>(`/cards/${cardId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response.data;
    } catch (e) {
        if (!axios.isAxiosError(e)) {
            console.error(e);
            return;
        }
        switch (e.response?.status) {
            case 422:
                throw new ResponseError<ValidationExceptionResponse>(e.message, e.response);
            default:
                throw new ResponseError<ExceptionResponse>(e.message, e.response);
        }
    }
}
