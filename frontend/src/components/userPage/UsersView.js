import {useEffect, useState} from "react";
import axiosInstance from "../../Axios";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import Header from "../Header";

const UsersView = () => {
    const [userList, setUserList] = useState(null)
    const navigate = useNavigate();
    const navigatorHandler = (username) => {
        navigate(`/${username}`)
    }
    useEffect(() => {
        axiosInstance
            .get('api/users/')
            .then((response) => {
                setUserList(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);
    return (
        <div>
            <Header/>
            <div className={'wrapper'}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '50px'
                }}>
                    {userList &&
                        userList.map((user) =>
                            <div style={{
                                display: 'flex',
                                width: '500px',
                                margin: '15px auto',
                                textAlign: 'center'
                            }} onClick={() => navigatorHandler(user.username)}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
                                    <img style={{height: '100%'}}
                                         src={user.profile.avatar} alt={'avatar'}/>
                                </div>

                                <div style={{textAlign: 'left',
                                    fontSize: '22px',
                                    marginLeft: '20px',
                                    fontWeight: 'bold',
                                    alignSelf: 'center',
                                    color: '#645C5C'}}>{user.username}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )

}
export default UsersView