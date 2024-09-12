import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createComment, deleteComment, getAllComments, updateComment } from '../service/commentService';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from 'react-toastify'
import { StoreContext } from '../store/StoreContext';


function ModalComment(props) {
    const { userStore } = useContext(StoreContext)
    const [commentList, setCommentList] = useState([])
    const [valueComment, setValueComment] = useState('')

    const [indexInputComment, setIndexInputComment] = useState(-1)
    const [valueEditComment, setValueEditComment] = useState('')

    useEffect(() => {
        props.show && fetchAllComments()
    }, [props.show])

    const fetchAllComments = async () => {
        const response = await getAllComments(props.data.id)
        console.log(response);

        if (response && +response.data.EC === 0) {
            setCommentList(response.data.DT)
        }
    }

    const handleComment = async () => {
        if (!valueComment) {
            toast.error('Vui lòng nhập bình luận')
            return
        }

        const data = {
            userId: userStore.id,
            postId: props.data.id,
            content: valueComment
        }
        const response = await createComment(data)

        if (response && +response.data.EC === 0) {
            toast(response.data.EM)
            fetchAllComments()
            props.fetchAllPost()
            setValueComment("")
        }
    }

    const handleClose = () => {
        props.handleClose()
        setCommentList([])
    }

    const handleDeleteComment = async (comment) => {

        const response = await deleteComment(comment.id)

        if (response && +response.data.EC === 0) {
            fetchAllComments()
            toast(response.data.EM)
        }
    }

    const handleEditComment = (index, comment) => {
        setIndexInputComment(index)
        setValueEditComment(comment.content)
    }

    const handleSaveEditComment = async (comment) => {
        const data = {
            id: comment.id,
            content: valueEditComment
        }
        const response = await updateComment(data)

        if (response && +response.data.EC === 0) {
            fetchAllComments()
            setIndexInputComment(-1)
            toast(response.data.EM)
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Bình luận</Modal.Title>
                </Modal.Header>

                {commentList && commentList.length > 0 ?
                    <Modal.Body>
                        {commentList.map((comment, index) => (
                            <Alert key={index} variant={'light'}>
                                <div className='d-flex justify-content-between'>
                                    <h6>{comment.username}</h6>
                                    {userStore.id === comment.user_id &&
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                Tuỳ chọn
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    onClick={() => handleDeleteComment(comment)}
                                                >Xoá</Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => handleEditComment(index, comment)}
                                                >Chỉnh sửa</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>}
                                </div>
                                {index !== indexInputComment &&
                                    <span>{comment.content}</span>}
                                {index === indexInputComment &&
                                    <Form.Group className='mt-3'>
                                        <Form.Control
                                            value={valueEditComment || ''}
                                            onChange={(e) => setValueEditComment(e.target.value)}
                                            type="text"
                                        />
                                        <div className='mt-3 d-flex justify-content-end gap-2'>
                                            <button
                                                onClick={() => setIndexInputComment(-1)}
                                                className='btn btn-secondary'>Huỷ</button>
                                            <Button onClick={() => handleSaveEditComment(comment)}>Lưu</Button>
                                        </div>
                                    </Form.Group>
                                }
                            </Alert>
                        ))}
                    </Modal.Body> :
                    <Modal.Body>Chưa có bình luận</Modal.Body>
                }
                <Modal.Footer>
                    <Form.Group className='flex-fill'>
                        <Form.Control
                            value={valueComment || ''}
                            onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                            onChange={(e) => setValueComment(e.target.value)}
                            type="text" placeholder="Nhập nội dung..."
                        />
                    </Form.Group>
                    <Button
                        disabled={valueComment === ''}
                        onClick={() => handleComment()}>Bình luận</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalComment;