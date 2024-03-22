import React, { useRef } from 'react'
import './CSS/NewPost.css'
import { X } from 'lucide-react'

function NewPost({onClose}) {

    const mdlRef = useRef();

    const closeModal = (e) =>{
        if(mdlRef.current === e.target){
            onClose();
        }
    }

    return (
        <div className='modal' ref={mdlRef} onClick={closeModal}>
            <div className='modal-full bg'>
            <button onClick={onClose}><X /></button>
                <div className='modal-info'>
                    <div>
                        <h1>Create a New Post</h1>
                    </div>
                    <hr />
                    <form>
                        <div className='inputs'>
                            <label >Image Url</label>
                            <input type="text" name='url' />
                        </div>
                        <div className='inputs'>
                            <label>Title</label>
                            <input type="text" name='title' />
                        </div>
                        <div className='inputs'>
                            <label> Description </label>
                            <textarea name="description" cols="30" rows="5"></textarea>
                        </div>
                    </form>
                    <div className='modal-btns'>
                        <button onClick={onClose}>Back</button>
                        <button>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPost
