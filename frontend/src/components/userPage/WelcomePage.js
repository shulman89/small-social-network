import {Link} from "react-router-dom";
import Header from "../Header";
import React, {useEffect, useState} from "react";
import axios from "axios";
import UsersView from "./UsersView";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import FileUploader from "../FileUploader";
import axiosInstance from "../../Axios";

function WelcomePage() {
    const [signal, setSignal] = useState(false)
    const [posts, setPosts] = useState();
    const [update, setUpdate] = useState(false)
    const [comment, setComment] = useState()
    const [showComments, setShowComments] = useState(false)
    useEffect(() => {
        axios
            .get("http://localhost:8000/post/")
            .then((response) => {
                setPosts(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [signal]);

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

    return (
        <div>
            <Header/>
            <div className={'wrapper'}>
                <div className={'container'}>
                    <div className={'posts-container'} style={{paddingTop: '60px'}}>
                        {posts &&
                            posts.map((post) =>
                                <div className={'post'}>
                                    <div className={'post-header'}>
                                        <div className={'post-header-left'}>
                                            <div className={'post-author-avatar'}>
                                                <img src={post.avatar} alt='avatar'/>
                                            </div>
                                            <Link className={'post-author'}to={
                                                `/${post.author}`
                                            }>
                                                <div >{post.author}</div>
                                            </Link>
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

                                            </div>
                                            <div className={'title'}>{post.title}</div>
                                            <br/>
                                            <div className={'postbody'}>{post.body}</div>
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
                </div>
            </div>
        </div>
    )
}

export default WelcomePage