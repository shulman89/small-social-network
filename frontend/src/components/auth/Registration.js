import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import axiosInstance from "../../Axios";


function Registration() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const navigate = useNavigate();

    const registrationHandler = () => {
        axios
            .post('http://127.0.0.1:8000/api/register/', {
                email: email,
                password: password,
                username: username
            })
            .then((res) => {
                console.log(res.data)
                navigate("/login");
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    return (
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
                name="username"
                placeholder="username"
                type="text"
                // value={name}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                name="password"
                placeholder="Введите пароль"
                type="password"
                // value={name}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={registrationHandler}>Зарегистрироваться</button>
        </div>
    )
}

export default Registration