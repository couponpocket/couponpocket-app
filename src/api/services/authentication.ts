import api, {ApiResponse, ResourceEntity} from '../index'
import {AxiosPromise} from 'axios';

interface RegisterPost {
    name: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
}

export interface UserProperties extends ResourceEntity {
    name: string;
    email: string;
    role: string;
}

export const register = async (data: RegisterPost): Promise<AxiosPromise<ApiResponse<UserProperties>>> => {
    return await api.post('/register', data);
}