import axios from 'axios';
import { BASE_URL } from '../axios/axios';

const unauthenticatedInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    timeout: 5000
});

export default unauthenticatedInstance;