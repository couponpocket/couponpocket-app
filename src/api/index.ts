import config from "../config";
import axios, {AxiosResponse, AxiosRequestConfig, AxiosInstance} from "axios";

export interface ResourceEntity {
    id: string
}

export class ResponseError<T> extends Error {
    response: AxiosResponse<T> | undefined;

    constructor(message: string, response: AxiosResponse<T> | undefined) {
        super(message);
        this.name = 'ResponseError';
        this.response = response;
    }
}

const api = (): AxiosInstance => {
    const options: AxiosRequestConfig = {
        baseURL: config.apiEndpoint
    };

    const instance = axios.create(options);
    instance.defaults.headers.post['Content-Type'] = 'application/json';

    return instance;
}

export default api();