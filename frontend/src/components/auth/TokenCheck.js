import axios from "axios";
import {useEffect, useState} from "react";
import axiosInstance from "../../Axios";


function TokenCheck() {
    const [token, setToken] = useState(false)
    const baseURL = 'http://127.0.0.1:8000/api/';
    useEffect(() => {
        if (localStorage.getItem('refresh_token')) {
            axios
                .post(`${baseURL}token/refresh/`, {
                    refresh: localStorage.getItem('refresh_token'),
                })
                .then((res) => {
                    localStorage.setItem('access_token', res.data.access)
                    console.log(`пришедший токен ${res.data.access}`)
                    axiosInstance.defaults.headers['Authorization'] =
                        'JWT ' + localStorage.getItem('access_token');
                    setToken(true)
                })
                .catch(function (error) {
                    console.log(error)
                })
        } else {
            console.log('Refresh token не найден, нужна авторизация')
        }
    }, []);
    return token
}

// function axiosCreate() {
//     const token = TokenCheck()
//     return token !== ''
//         ? axios.create({
//             baseURL: 'http://127.0.0.1:8000/api/',
//             timeout: 5000,
//             headers: {
//                 Authorization: token
//                     ? 'JWT ' + token
//                     : null,
//                 'Content-Type': 'application/json',
//                 accept: 'application/json',
//             },
//         })
//         : false
// }

export default TokenCheck


