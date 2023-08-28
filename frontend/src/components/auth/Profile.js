import React, {useEffect, useState} from "react";
import '../../css/profile.css'
import Header from "../Header";
import Login from "./Login";
import TokenCheck from "./TokenCheck";
import axiosInstance from "../../Axios";
import {useNavigate} from "react-router";

function Profile() {
    const [profile, setProfile] = useState('')
    const [update, setUpdate] = useState(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const tokenState = TokenCheck()
    const navigate = useNavigate();

    useEffect(() => {
        tokenState &&
        axiosInstance
            .get('api/profile/')
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    });

    function changeProfile(userId) {
        tokenState &&
        axiosInstance
            .patch(`api/profile/`, {
                    name: name,
                    surname: surname,
                    phone: phone,
                }
            )
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function deleteProfile(profileId) {
        tokenState &&
        axiosInstance
            .delete(`api/user/${profileId}`)
            .then((response) => {
                console.log(response.data)
                navigate("/");
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            })
            .catch((error) => {
                console.log(error)

            })
    }

    return (
        <div className={'wrapper'}>
            {!tokenState
                ? <Login/>
                : <div className={'profile'}>
                    <Header/>
                    <div>avatar: <img style={{height: '100px', width: '100px'}} src={profile['avatar']}/></div>
                    <div>id: {profile['id']}</div>
                    <div>name: {profile['name']}</div>
                    <div>surname: {profile['surname']}</div>
                    <div>phone: {profile['phone']}</div>
                    <div onClick={() => setUpdate(true)}>Редактировать</div>
                    {
                        update &&
                        <div>
                            <input
                                name="name"
                                placeholder="Имя"
                                type="text"
                                onChange={e => setName(e.target.value)}
                            />
                            <input
                                name="surname"
                                placeholder="Фамилия"
                                type="text"
                                onChange={e => setSurname(e.target.value)}
                            />
                            <input
                                name="Phone"
                                placeholder="Телефон"
                                type="text"
                                onChange={e => setPhone(e.target.value)}
                            />
                            <div onClick={() => changeProfile(profile['id'])}>Опубликовать</div>
                            <div onClick={() => setUpdate(false)}>Отменить</div>
                        </div>
                    }
                    <div onClick={() => deleteProfile(profile['id'])}>Удалить страничку</div>
                </div>}
        </div>
    )
}

export default Profile