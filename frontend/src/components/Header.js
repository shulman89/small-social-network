import '../css/header.scss'
import {Link} from "react-router-dom";
import Logout from "./auth/Logout";
import UserPage from "./userPage/UserPage";

function Header() {
    return (
        <div className={'header'}>
            <div className={'header-navbar'}>
                <div className={'header-navbar-left'}>
                    {localStorage.getItem('refresh_token') &&
                        <Link className={'header-navbar-left-button'} to={
                            `/${localStorage.getItem('username')}`
                        }>
                            Моя страница
                        </Link>
                    }
                    {localStorage.getItem('refresh_token') &&
                        <Link className={'header-navbar-left-button'} to={
                            '/'
                        }>
                            Лента
                        </Link>
                    }
                    {localStorage.getItem('refresh_token') &&
                        <Link className={'header-navbar-left-button'} to={
                            '/people'
                        }>
                            Люди
                        </Link>
                    }
                </div>
                <div className={'header-navbar-right'}>
                    {!localStorage.getItem('refresh_token') ?
                        <div>
                            <Link className={'header-navbar-right-button'} to="/registration">
                                Зарегистрироваться
                            </Link>
                            <Link className={'header-navbar-right-button'} to="/login">
                                Войти
                            </Link>
                        </div>
                        :
                        <div className={'header-navbar-right-block'}>
                            <Logout/>
                            <Link className={'header-navbar-right-button'} to="/profile">
                                Профиль
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header