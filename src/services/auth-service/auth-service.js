import unauthAxios from '../axios/axios-unauthenticated';

const AUTH_URL = '/api/auth';

const AuthService = {
    login(username, password) {
        return unauthAxios.post(AUTH_URL + '/signin', {
            username,
            password
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        }).catch((err) => {
            console.log("Error in login request" + err)
        });
    },

    logout() {
        localStorage.removeItem("user");
    },

    register(username, email, password) {
        return unauthAxios.post(AUTH_URL + '/signup', {
            username,
            email,
            password
        });
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    },
}

export default AuthService;