import api, {ExceptionResponse, ResourceEntity, ResponseError, ValidationExceptionResponse} from '../index'
import axios from 'axios';

export interface UserProperties extends ResourceEntity {
    name: string;
    email: string;
    role: string;
}

export interface RegisterRequest {
    name?: FormDataEntryValue;
    email?: FormDataEntryValue;
    password?: FormDataEntryValue;
}

export type RegisterResponse = Omit<UserProperties, 'role'> & {
    access_token: string;
};

export interface VerifyRequest {
    code?: FormDataEntryValue;
}

export const register = async (data: RegisterRequest) => {
    try {
        const response = await api.post<RegisterResponse>('/register', data);
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

export const verify = async (data: VerifyRequest, token: string) => {
    try {
        await api.post('/email/verify', data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
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

export const resendVerificationEmail = async (token: string) => {
    try {
        await api.post('/email/resend', null, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    } catch (e) {
        if (!axios.isAxiosError(e)) {
            console.error(e);
            return;
        }
        throw new ResponseError<ExceptionResponse>(e.message, e.response);
    }
}
