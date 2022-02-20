import axios, {AxiosInstance} from 'axios';
import config from '../config';

export interface ApiResponse<T> {
    status: boolean,
    items: T
}

export interface ResourceEntity {
    id: number
}

const api: AxiosInstance = axios.create({
    baseURL: config.apiEndpoint
});

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;
