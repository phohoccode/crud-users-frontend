import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
    createComment,
    deleteComment,
    getAllComments,
    updateComment
} from '../service/commentService';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from 'react-toastify'
import { StoreContext } from '../store/StoreContext';
import Spinner from 'react-bootstrap/Spinner';

function ModalComment(props) {
    const { width } = useContext(StoreContext)
    const { userStore } = useContext(StoreContext)
    const [commentList, setCommentList] = useState([])
    const [valueComment, setValueComment] = useState('')
    const [indexInputComment, setIndexInputComment] = useState(-1)
    const [valueEditComment, setValueEditComment] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        props.show && fetchAllComments()
    }, [props.show])

    const fetchAllComments = async () => {
        const response = await getAllComments(props.data.post_id)

        if (response && +response.data.EC === 0) {
            setCommentList(response.data.DT)
        }
    }

    const handleComment = async () => {
        if (!valueComment) {
            toast.error('Vui lòng nhập bình luận')
            return
        }

        setIsLoading(true)

        const data = {
            userId: userStore.id,
            postId: props.data.post_id,
            content: valueComment
        }
        const response = await createComment(data)

        if (response && +response.data.EC === 0) {
            await props.fetchAllPost()
            toast(response.data.EM)
            fetchAllComments()
            setIsLoading(false)
            setValueComment("")
        }
    }

    const handleClose = () => {
        props.handleClose()
        setCommentList([])
    }

    const handleDeleteComment = async (comment) => {

        const response = await deleteComment(comment.comment_id)

        if (response && +response.data.EC === 0) {
            fetchAllComments()
            props.fetchAllPost()
            toast(response.data.EM)
        }
    }

    const handleEditComment = (index, comment) => {
        setIndexInputComment(index)
        setValueEditComment(comment.content)
    }

    const handleSaveEditComment = async (comment) => {
        const data = {
            id: comment.comment_id,
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
            <Modal show={props.show} onHide={handleClose} fullscreen={width < 467}>
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
                                                    className='d-flex align-items-center gap-1'
                                                    onClick={() => handleDeleteComment(comment)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                    </svg>
                                                    Xoá
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    className='d-flex align-items-center gap-1'
                                                    onClick={() => handleEditComment(index, comment)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                    </svg>
                                                    Chỉnh sửa
                                                </Dropdown.Item>
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
                        <Button
                            disabled={valueComment === ''}
                            onClick={() => handleComment()}>
                            Bình luận
                        </Button>
                    }

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalComment;