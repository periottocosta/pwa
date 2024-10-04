
import { API } from 'utils/constants';
import axios from 'axios';

export const apiClient = axios.create({
    baseURL: API.BASE_URL,
    headers: {
        'content-Type': 'application/json',
    },
});
