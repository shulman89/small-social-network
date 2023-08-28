import React, {useState} from "react";
import "../css/file-uploader.css";
import axiosInstance from "../Axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {faFolderOpen} from "@fortawesome/free-regular-svg-icons";
import {faSquarePlus} from "@fortawesome/free-regular-svg-icons";

function FileUploader({props}) {
    const [image, setImage] = useState();
    const [imageURL, setImageURL] = useState();
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const fileReader = new FileReader();
    const [newPost, setNewPost] = useState(false)
    fileReader.onloadend = () => {
        setImageURL(fileReader.result);
    };
    console.log(setNewPost)

    function createPost() {
        axiosInstance
            .post('post/', {
                title: title,
                body: body,
                pic: image
            })
            .then((response) => {
                console.log(response)
                console.log('файл загружен')
            })
            .catch((error) => {
                console.log(error)
                console.log('ошибка')
            })
        console.log('функция выполнена')
    }

    const handleOnChange = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0];
            setImage(file);
            fileReader.readAsDataURL(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files.length) {
            setImage(event.dataTransfer.files[0]);
            fileReader.readAsDataURL(event.dataTransfer.files[0]);
        }
    };

    const handleDragEmpty = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <>
            {!newPost &&
                <div className={'add-post'}
                     onClick={() => setNewPost(true)}
                >
                    <FontAwesomeIcon icon={faSquarePlus} />
                </div>}

            {newPost &&
                <form className="file-uploader">
                    <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>

                        <label
                            htmlFor="file-loader-button"
                            className="buttons"
                        >
                            <FontAwesomeIcon icon={faFolderOpen}/>
                        </label>

                        <div className={'buttons'} onClick={() => {
                            createPost();setNewPost(false)
                        }}>
                            <FontAwesomeIcon icon={faCircleCheck}/>
                        </div>
                        <div className={'reset'} onClick={() => setNewPost(false)}>
                            <FontAwesomeIcon icon={faCircleXmark}/>
                        </div>
                    </div>

                    <input
                        id="file-loader-button"
                        type="file"
                        className="file-uploader__upload-button"
                        onChange={handleOnChange}
                    />
                    {image &&
                        <img
                            src={imageURL ? imageURL : "no_photo.jpg"}
                            className="file-uploader__preview"
                            alt="preview"
                            onDrop={handleDrop}
                            onDragEnter={handleDragEmpty}
                            onDragOver={handleDragEmpty}
                        />}
                    <input
                        className={'post-body'}
                        name="title"
                        placeholder="Заголовок"
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        className={'post-body'}
                        name="body"
                        placeholder="Пост"
                        rows={5}
                        onChange={e => setBody(e.target.value)}
                    />
                </form>}
        </>


    )
}

export default FileUploader