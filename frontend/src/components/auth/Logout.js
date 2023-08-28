import axiosInstance from "../../Axios";
import {useNavigate} from "react-router";

function Logout() {
    const navigate = useNavigate();
    const logoutHandler = () => {
        axiosInstance
            .post(`api/token/blacklist/`, {
                refresh: localStorage.getItem('refresh_token'),
            })
            .then(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('username');
                axiosInstance.defaults.headers['Authorization'] = null;
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
                navigate('/login')
            });
    };
    return (
        <div className={'header-navbar-right-button'} onClick={logoutHandler}>Выйти</div>
    )
}

export default Logout