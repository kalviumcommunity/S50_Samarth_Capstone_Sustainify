import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import Cookies from 'js-cookies'
import './CSS/NewPost.css';
import axios from 'axios';

function NewPost({ onClose }) {
    const mdlRef = useRef();
    const { register, handleSubmit, setValue } = useForm();
    const [selectedOption, setSelectedOption] = useState('file');

    // CREATING A REF FOR THE MODAL 
    const closeModal = (e) => {
        if (mdlRef.current === e.target) {
            onClose();
        }
    };

    //CREATING A FUNCTION TO CONVERT IMAGE FILE TO URL
    const covertImage = (file) => {
        return new Promise((resolve, reject) => {
            const render = new FileReader();
            render.readAsDataURL(file)
            render.onload = () => resolve(render.result)
            render.onerror = err => reject(err)
        })
    }


    const onSubmit = async (data) => {
        try {
            const Id = Cookies.getItem('Id')
            // CODE FOR STORING FILE OR URL INPUT
            if (selectedOption === 'file') {
                const formData = new FormData();
                formData.append("image", data.file[0]);
                const imgURL = await covertImage(data.file[0])



                const postData = {
                    img: imgURL,
                    title: data.title,
                    description: data.description,
                    createdBy: Id
                }
                console.log(postData);
                const res = await axios.post('http://localhost:2001/post', postData);
                console.log(res.data);
                alert("Posted")

            }
            else if (selectedOption === 'url') {
                const postData = {
                    img: data.url,
                    title: data.title,
                    description: data.description,
                    createdBy: Id
                };
                const res = await axios.post('http://localhost:2001/post', postData);
                console.log(res.data);
                alert("Posted")
            }
            onClose();
        }
        catch (error) {
            console.error(error);
        }
    };


    // SETTING STATE FOR ( FILE OR URL ) INPUT OPTION CHANGE
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setValue('file', null);
    };


    // CODE FOR DISPLAYING FILE OR URL INPUT
    const renderInput = () => {
        if (selectedOption === 'file') {
            return <input type="file" {...register("file")} />;
        }
        else {
            return <input type="text" {...register("url")} />;
        }
    };

    return (
        <div className='modal' ref={mdlRef} onClick={closeModal}>
            <div className='modal-full bg'>
                <button onClick={onClose}><X /></button>
                <div className='modal-info'>
                    <div>
                        <h1>Create a New Post</h1>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* CHOICE FOR UPLOADING IMAGE */}

                        <div className='option'>
                            <label>
                                <input
                                    type="radio"
                                    value="file"
                                    checked={selectedOption === 'file'}
                                    onChange={handleOptionChange}
                                />
                                Choose a File
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="url"
                                    checked={selectedOption === 'url'}
                                    onChange={handleOptionChange}
                                />
                                Image URL
                            </label>
                        </div>

                        {/* DISPLAYING FILE OR URL INPUT DEPENDING ON THE CHECKBOX  */}

                        <div className='inputs'>
                            <label>{selectedOption === 'file' ? 'File' : 'Image URL'}</label>
                            {renderInput()}
                        </div>
                        <div className='inputs'>
                            <label>Title</label>
                            <input type="text" {...register("title")} />
                        </div>
                        <div className='inputs'>
                            <label>Description</label>
                            <textarea {...register("description")} cols="30" rows="5"></textarea>
                        </div>

                        <div className='modal-btns'>
                            <button type="button" onClick={onClose}>Back</button>
                            <button type="submit">Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewPost;
