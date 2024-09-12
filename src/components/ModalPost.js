import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState, useContext } from 'react';
import _ from 'lodash';
import { createPost, updatePost } from '../service/postsService';
import { toast } from 'react-toastify';
import { handleOnchangeInputs } from '../utils';
import { StoreContext } from '../store/StoreContext';

function ModalPost(props) {
    const defaultPost = {
        id: null,
        title: '',
        content: ''
    }
    const { userStore } = useContext(StoreContext)
    const [post, setPost] = useState(defaultPost)

    useEffect(() => {
        props.actions === 'update'
            ? setPost({
                id: props.data.id,
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Huỷ
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmPost()}>
                        {props.actions === 'create' ? 'Tạo' : 'Lưu'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalPost;