import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import './CSS/NewPost.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditPost({ onClose }) {
    const { id } = useParams()
    const mdlRef = useRef();
    const { register, handleSubmit, setValue } = useForm();

    // CREATING A REF FOR THE MODAL 
    const closeModal = (e) => {
        if (mdlRef.current === e.target) {
            onClose();
        }
    };

    useEffect(() => {
        axios.get('http://localhost:2001/post/' + id)
            .then(res => {
                setValue('title', res.data.title);
                setValue('description', res.data.description);
            })
            .catch(err => {
                console.error('Error fetching post data:', err);
            });
    },[]);

    const onSubmit = async (data) => {
        try {
            onClose();
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div>
                <div className='modal' ref={mdlRef} onClick={closeModal}>
                    <div className='modal-full bg'>
                        <button onClick={onClose}><X /></button>
                        <div className='modal-info'>
                            <div>
                                <h1>Edit the post</h1>
                            </div>
                            <hr />
                            <form onSubmit={handleSubmit(onSubmit)}>

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
            </div>
        </>
    )
}

export default EditPost
