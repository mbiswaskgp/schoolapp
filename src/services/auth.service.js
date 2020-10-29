import axios from "axios";

const API_URL = "https://api.crefft.uk/api/auth/";

class AuthService {
    login(email, password) {
        return axios
        .post(API_URL + "signin", { email, password })
        .then((response) => {
            //console.log('sdadas');
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    logout() {
        localStorage.removeItem("user");
    }
}

export default new AuthService();