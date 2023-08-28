import {useEffect, useState} from "react";
import Header from "../Header";
import axios from "axios";
import axiosInstance from "../../Axios";
import UserPage from "../userPage/UserPage";
import {Navigate, Route, useNavigate} from "react-router";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [tokenPresent, setTokenPresent] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        return () => {
            localStorage.getItem('access_token') &&
            setTokenPresent(true)
        };
    }, []);

    const loginHandler = () => {
        tokenPresent &&
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axios
            .post('http://127.0.0.1:8000/api/login/', {
                email: email,
                password: password,
            })
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('access_token', res.data.tokens.access);
                localStorage.setItem('refresh_token', res.data.tokens.refresh);
                localStorage.setItem('username', res.data.username);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                navigate(`/${res.data.username}`);
            })
            .catch((error) => {
                console.log(error)
            })
    };
    return (
        <>
            <div style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            paddingTop:'300px'
        }}>
                <input
                name="email"
                placeholder="email"
                type="text"
                // value={name}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                name="password"
                placeholder="Введите пароль"
                type="password"
                // value={name}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={loginHandler}>Авторизоваться</button>
            </div>
        </>
    )
}

export default Login
