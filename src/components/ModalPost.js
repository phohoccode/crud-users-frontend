import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState, useContext } from 'react';
import _ from 'lodash';
import { createPost, updatePost } from '../service/postsService';
import { toast } from 'react-toastify';
import { handleOnchangeInputs } from '../utils';
import { StoreContext } from '../store/StoreContext';
import "../style/index.css"

function ModalPost(props) {
    const defaultPost = {
        id: null,
        title: '',
        content: ''
    }
    const { userStore } = useContext(StoreContext)
    const [images, setImages] = useState([])
    const [post, setPost] = useState(defaultPost)

    useEffect(() => {
        props.actions === 'update'
            ? setPost({
                id: props.data.post_id,
                title: props.data.title,
                content: props.data.content
            }) :
            setPost(defaultPost)
    }, [props.actions])

    const handleConfirmPost = async () => {
        if (!post.title || !post.content) {
            toast.error('Vui lòng nhập thông tin!')
            return
        }

        const data = {
            id: props.actions === 'create' ? userStore.id : post.id,
            title: post.title,
            content: post.content
        }

        const response =
            props.actions === 'create' ?
                await createPost(data) :
                await updatePost(data)

        if (response && +response.data.EC === 0) {
            toast(response.data.EM)
            props.handleClose()
            props.fetchAllPost()
            setPost(defaultPost)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages([...images, reader.result])
            }
            reader.readAsDataURL(file);
        }
    }

    const handleDeleteImage = (index) => {
        if (images.length > 1) {
            const newImages = [...images];
            newImages.splice(index, 1);
            setImages(newImages);
        } else {
            setImages([]);
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.actions === 'create' ? 'Thêm bài viết' : 'Chỉnh sửa bài viết'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control
                            onChange={(e) => handleOnchangeInputs(setPost, post, e.target.value, 'title')}
                            type="text" value={post.title || ''} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nội dung</Form.Label>
                        <Form.Control
                            onKeyDown={(e) => e.key === 'Enter' && handleConfirmPost()}
                            onChange={(e) => handleOnchangeInputs(setPost, post, e.target.value, 'content')}
                            as="textarea" rows={3}
                            value={post.content || ''}
                        />
                    </Form.Group>
                    <div className='row row-gap-4'>
                        {images && images.map((image, index) => (
                            <div key={index} className='col col-6 position-relative'>
                                <img
                                    className='w-100 h-100 rounded-3'
                                    src={image}
                                />
                                <svg
                                    style={{ position: 'absolute', top: '-8px', color: '#ccc', right: '6px' }}
                                    onClick={() => handleDeleteImage(index)}
                                    className='delete-image bi bi-x-circle-fill'
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                </svg>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <div className='d-flex justify-content-between'>
                    <Modal.Footer>
                        <input
                            accept="image/*"
                            className='d-none'
                            id='image'
                            type="file"
                            onChange={(e) => handleImageChange(e)}
                        />
                        <label htmlFor='image' className='btn btn-success'>Thêm ảnh</label>
                    </Modal.Footer>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Huỷ
                        </Button>
                        <Button variant="primary" onClick={() => handleConfirmPost()}>
                            {props.actions === 'create' ? 'Đăng' : 'Lưu'}
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
}

export default ModalPost;