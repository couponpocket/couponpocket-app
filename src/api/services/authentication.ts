import api, {ApiResponse, ResourceEntity} from '../index'
import {AxiosPromise} from 'axios';

export interface UserProperties extends ResourceEntity {
    name: string;
    email: string;
    role: string;
}

export const register = async (data: any): Promise<AxiosPromise<ApiResponse<UserProperties>>> => {
    return await api.post('/register', data);
}