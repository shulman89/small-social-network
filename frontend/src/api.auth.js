import { instance } from "./api.config.js";

const AuthService =()=> {

    function login (email, password) {
        return instance.post('token', {email, password})
    }

    function refreshToken() {
        return instance.get("token/refresh");
    }

    function logout() {
        return instance.post("token/blacklist/")
    }
}
export default AuthService