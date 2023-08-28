import Header from "../Header";
import React, {useEffect, useRef, useState} from "react";
import axiosInstance from "../../Axios";
import TokenCheck from "../auth/TokenCheck";
import '../../css/userPage.scss'
import FileUploader from "../FileUploader";
import UsersView from "./UsersView";
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faComment,
    faHeart,
    faPenToSquare,
    faPlus,
    faTrash,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-regular-svg-icons";

function UserPage() {
    const tokenState = TokenCheck()
    const [post, setPost] = useState('')
    const [newPost, setNewPost] = useState(false)
    const [update, setUpdate] = useState(false)
    const [file, setFile] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [showComments, setShowComments] = useState(false)
    const [signal, setSignal] = useState(true)
    const [comment, setComment] = useState()
    const [userPage, setUserPage] = useState()
    const [focus, setFocus] = useState(false)
    const [patchProfile, setPatchProfile] = useState(false)
    const [name, setName] = useState('Имя')
    const [surname, setSurname] = useState('Фамилия')
    const [phone, setPhone] = useState('Телефон')
    const [about, setAbout] = useState('O себе')


    const location = useLocation().pathname

    useEffect(() => {
        axiosInstance
            .get(`api${location}`)
            .then((response) => {
                setUserPage(response.data);
                console.log(response.data)
                response.data.profile.about !== '' &&
                setAbout(response.data.profile.about)
                response.data.profile.name !== '' &&
                setName(response.data.profile.name)
                response.data.profile.surname !== '' &&
                setSurname(response.data.profile.surname)
                response.data.profile.phone !== '' &&
                setPhone(response.data.profile.phone)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [signal, location]);

    function changeProfile(userId) {
        tokenState &&
        axiosInstance
            .patch(`api/profile/`, {
                    name: name,
                    surname: surname,
                    phone: phone,
                    about: about,
                }
            )
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function deletePost(postId) {
        tokenState &&
        axiosInstance
            .delete(`post/${postId}`)
            .then((response) => {
                console.log(response.data)
                setSignal(!signal)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function changePost(postId) {
        tokenState &&
        axiosInstance
            .patch(`post/${postId}/`, {
                    title: title,
                    body: body,
                }
            )
            .then((response) => {
                console.log(response.data)
                setSignal(!signal)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function giveLike(id) {
        axiosInstance
            .get(`like/${id}`)
            .then((response) => {
                console.log(response.data)
                setSignal(!signal)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function writeComment(id) {
        axiosInstance
            .post(`/${id}/comment/`, {
                'post': id,
                'body': comment,
            })
            .then((response) => {
                console.log(response.data)
                setSignal(!signal)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function commentDelete(commentId, postId) {
        axiosInstance
            .delete(`/${postId}/comment/${commentId}/`)
            .then((response) => {
                console.log(response.data)
                setSignal(!signal)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function phoneValueHandler() {
        phone === 'Телефон' &&
        setPhone('')
        return phone
    }

    function aboutValueHandler() {
        about === 'O себе' &&
        setAbout('')
        return about
    }

    function nameValueHandler() {
        name === 'Имя' &&
        setName('')
        return name
    }

    function surnameValueHandler() {
        surname === 'Фамилия' &&
        setSurname('')
        return surname
    }


    return (
        <div>
            <Header/>
            <div className={'wrapper'}>
                <div className={'container'}>
                    {
                        userPage &&
                        <div className={'user-header'}>
                            <div>
                                <div className={'user-avatar'}>
                                    <img src={userPage.profile.avatar} alt='avatar'/>
                                </div>
                            </div>

                            {
                                !patchProfile &&
                                <div className={'user-info'}>
                                    <h1>{userPage.username}</h1><br/>
                                    <p>{userPage.profile.name} {userPage.profile.surname}</p><br/>
                                    <p>{userPage.profile.about}</p><br/>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <p>{userPage.profile.phone}</p>
                                        {userPage.username === localStorage.getItem('username') &&
                                            <div className={'patch'} onClick={() => setPatchProfile(true)}>
                                                <FontAwesomeIcon
                                                    icon={faPenToSquare}/>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                            {/*//---------------------------------------изменение профиля-------------------------------------------------------*/}
                            {
                                patchProfile &&
                                <div className={'user-info-patch-container'}>
                                    <div className={'user-info-patch'}>
                                        <input
                                            name="name"
                                            placeholder={name}
                                            type="text"
                                            onClick={nameValueHandler}
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                        <input
                                            name="surname"
                                            placeholder={surname}
                                            type="text"
                                            onClick={surnameValueHandler}
                                            value={surname}

                                            onChange={e => setSurname(e.target.value)}
                                        />
                                        <input
                                            name="Phone"
                                            placeholder={phone}
                                            type="text"
                                            onClick={phoneValueHandler}
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                        <textarea
                                            name="About"
                                            placeholder={about}
                                            onClick={aboutValueHandler}
                                            value={about}
                                            onChange={e => setAbout(e.target.value)}
                                            rows={10}
                                        />
                                    </div>
                                    <div className={'patch-buttons'}>
                                        <div className={'ok'} onClick={
                                            () => {
                                                changeProfile(userPage.profile.id);
                                                setSignal(!signal);
                                                setPatchProfile(false)
                                            }
                                        }>
                                            <FontAwesomeIcon icon={faCircleCheck}/>
                                        </div>
                                        <div className={'reset'} onClick={() => setPatchProfile(false)}>
                                            <FontAwesomeIcon icon={faCircleXmark}/>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }

                    {/*----------------------------------------------посты-------------------------------------------------*/}

                    <div className={'posts-container'}>
                        {userPage &&
                            <div>
                                {
                                    userPage.username === localStorage.getItem('username') &&
                                    <FileUploader/>
                                }
                                {userPage.posts &&
                                    userPage.posts.map((post) =>
                                        <div className={'post'}>
                                            <div className={'post-header'}>
                                                <div className={'post-header-left'}>
                                                    <div className={'post-author-avatar'}>
                                                        <img src={userPage.profile.avatar} alt='avatar'/>
                                                    </div>
                                                    <div className={'post-author'}>{userPage.username}</div>
                                                </div>
                                                <div className={'post-time'}>{post.time_created}</div>
                                            </div>

                                            <div className={'photo'}>
                                                <img src={post.pic} alt='image'/>
                                            </div>
                                            {
                                                update !== post.id &&
                                                <div>
                                                    <div className={'actions'}>
                                                        <div className={'actions-left'}>
                                                            <div
                                                                onClick={() => {
                                                                    giveLike(post.id)
                                                                }}
                                                            >
                                                                <p>{post.likes.length}<FontAwesomeIcon icon={faHeart}/>
                                                                </p>
                                                            </div>
                                                            {
                                                                showComments !== post.id &&
                                                                <div className={'green'}
                                                                     onClick={() => setShowComments(post.id)}>
                                                                    <FontAwesomeIcon
                                                                        icon={faComment}/></div>
                                                            }
                                                        </div>
                                                        <div className={'actions-right'}>
                                                            {(localStorage.getItem('username') === post.author) &&
                                                                <div onClick={() => deletePost(post.id)}>
                                                                    <FontAwesomeIcon
                                                                        icon={faTrash}/>
                                                                </div>
                                                            }
                                                            {
                                                                (update !== post.id) &&
                                                                (localStorage.getItem('username') === post.author) &&
                                                                <div className={'green'}
                                                                     onClick={() => {
                                                                         setUpdate(post.id);
                                                                     }}>
                                                                    <FontAwesomeIcon
                                                                        icon={faPenToSquare}/></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className={'title'}>{post.title}</div>
                                                    <br/>
                                                    <div className={'postbody'}>{post.body}</div>
                                                </div>
                                            }


                                            {/*//------------------------------------редактирование постов----------------------------------------------------------*/}

                                            {
                                                update === post.id &&

                                                <div style={{margin: '20px'}}>
                                                    <div
                                                        style={{marginBottom: '10px', fontSize: '16px'}}>Редактирование
                                                    </div>
                                                    <input
                                                        className={'write-comment'}
                                                        name="title"
                                                        placeholder={post.title}
                                                        onClick={() => setTitle(post.title)}
                                                        value={title}
                                                        type="text"
                                                        onChange={e => setTitle(e.target.value)}

                                                    />
                                                    <textarea
                                                        rows={5}
                                                        className={'write-comment'}
                                                        name="body"
                                                        placeholder={post.body}
                                                        onClick={() => setBody(post.body)}
                                                        value={body}
                                                        onChange={e => setBody(e.target.value)}
                                                    />
                                                    <div style={{
                                                        display: 'flex',
                                                        width: '100%',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <div className={'patch-post-ok'}
                                                             onClick={() => {
                                                                 changePost(post.id);
                                                                 setUpdate(false)
                                                                 setSignal(!signal)
                                                             }}>
                                                            <FontAwesomeIcon icon={faCircleCheck}/>
                                                        </div>
                                                        <div className={'patch-post-reset'}
                                                             onClick={() => {
                                                                 setUpdate(false);
                                                                 setTitle('')
                                                                 setBody('')
                                                             }}>
                                                            <FontAwesomeIcon icon={faCircleXmark}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                            {/*//-------------------------------------комментарии------------------------------------------------------------------*/}

                                            {
                                                post.comments.map((comment) =>
                                                    <>
                                                        {
                                                            showComments === post.id &&
                                                            <div className={'comment-box'}>
                                                                <div className={'comment-header'}>
                                                                    <div
                                                                        className={'comment-author'}>{comment.author}
                                                                    </div>
                                                                    <div
                                                                        className={'comment-time'}>{comment.time_created}
                                                                    </div>
                                                                </div>
                                                                <div className={'comment'}>
                                                                    {comment.body}
                                                                    {
                                                                        comment.author === localStorage.getItem('username') &&
                                                                        <div
                                                                            className={'comment-delete'}
                                                                            onClick={() => commentDelete(comment.id, post.id)}
                                                                        >
                                                                            <FontAwesomeIcon icon={faTrash}/>
                                                                        </div>
                                                                    }

                                                                </div>
                                                            </div>
                                                        }
                                                    </>)
                                            }{
                                            showComments === post.id &&
                                            <div>
                                                <textarea
                                                    rows={5}
                                                    className={'write-comment'}
                                                    name="comment"
                                                    placeholder={'Свой комментарий'}
                                                    value={comment}
                                                    onChange={e => setComment(e.target.value)}
                                                />
                                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                                    {
                                                        comment &&
                                                        <div className={'patch-post-ok'}
                                                             onClick={() => {
                                                                 writeComment(post.id);
                                                                 setComment('')
                                                             }}>
                                                            <FontAwesomeIcon icon={faCircleCheck}/>
                                                        </div>
                                                    }

                                                    <div className={'patch-post-reset'}
                                                         onClick={() => setShowComments(false)}>
                                                        <FontAwesomeIcon icon={faCircleXmark}/>
                                                    </div>
                                                </div>

                                            </div>
                                        }
                                        </div>
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserPage