import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState, useContext } from 'react';
import { createPost, updatePost } from '../service/postsService';
import { toast } from 'react-toastify';
import { handleOnchangeInputs } from '../utils';
import { StoreContext } from '../store/StoreContext';
import "../style/index.css"
import Image from './Image';
import UploadImage from './UploadImage';

function ModalPost(props) {
    const { width } = useContext(StoreContext)
    const defaultPost = {
        id: null,
        title: '',
        content: ''
    }
    const { userStore } = useContext(StoreContext)
    const [images, setImages] = useState([])
    const [post, setPost] = useState(defaultPost)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log(props.actions)
        if (props.actions === 'update') {
            setPost({
                id: props.data.post_id,
                title: props.data.title,
                content: props.data.content,
            })
            setImages(props.data.images)
        } else {
            setPost(defaultPost)
            setImages([])
        }
    }, [props.actions, props.data])

    const handleConfirmPost = async () => {
        if (!post.title || !post.content) {
            toast.error('Vui lòng nhập thông tin!')
            return
        }

        setIsLoading(true)

        let imagesUpdate = []
        if (props.actions === 'update') {
            imagesUpdate = images.map(image => {
                return image.url || image
            })
        }

        const data = {
            userId: userStore.id,
            id: props.actions === 'create' ? userStore.id : post.id,
            title: post.title,
            content: post.content,
            images: props.actions === 'create' ? images : imagesUpdate
        }

        const response = props.actions === 'create' ?
            await createPost(data) :
            await updatePost(data)

        if (response && +response.data.EC === 0) {
            toast(response.data.EM)
            setPost(defaultPost)
            setIsLoading(false)
            images.length > 0 && setImages([])
            props.handleClose()
            props.fetchAllPost()
        }

    }

    return (
        <>
            <Modal 
                show={props.show} 
                onHide={props.handleClose} 
                fullscreen={width < 467}>
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
                            <Image
                                col={'6'}
                                width={'100'}
                                height={'100'}
                                key={index}
                                setImages={setImages}
                                show={true}
                                data={{
                                    image: image,
                                    index,
                                    images
                                }}
                            />
                        ))}
                    </div>
                </Modal.Body>
                <div className={`d-flex justify-content-between`}>
                    <Modal.Footer>
                        <UploadImage
                            setImages={setImages}
                            images={images}
                        />
                        {images.length > 0 && <span style={{ color: '#0d6efd' }}>Đã tải lên {images.length} ảnh</span>}
                    </Modal.Footer>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Huỷ
                        </Button>
                        {isLoading ?
                            <Button variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <span className="visually-hidden">Loading...</span>
                            </Button> :
                            <Button variant="primary" onClick={() => handleConfirmPost()}>
                                {props.actions === 'create' ? 'Đăng' : 'Lưu'}
                            </Button>
                        }
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
}

export default ModalPost;