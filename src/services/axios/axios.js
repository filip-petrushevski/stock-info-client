import axios from 'axios';

export const BASE_URL = "http://localhost:8080";

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    timeout: 5000,

});

instance.interceptors.request.use(
    config => {
        const user = localStorage.getItem("user");
        if(user) {
            const jsonUser = JSON.parse(user);
            const token = jsonUser.accessToken;
            const tokenType = jsonUser.tokenType;
            config.headers.Authorization = `${tokenType} ${token}`;
        } else {
            console.log("Unauthorized!");
        }
        return config;
    },
    error => Promise.reject(error)
);



export default instance;