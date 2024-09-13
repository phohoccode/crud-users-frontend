import { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from 'react-toastify'
import Alert from 'react-bootstrap/Alert';

import { deletePost, getAllPosts } from '../service/postsService'
import ModalComment from './ModalComment';
import { StoreContext } from '../store/StoreContext';
import ModalPost from './ModalPost';
import { formatDate } from '../utils';
import { likePost, unLikePost } from '../service/likeService';
import ModalUsersLikePost from './ModalUsersLikePost';

function Posts() {
    const { userStore } = useContext(StoreContext)
    const [posts, setPosts] = useState([])
    const [postAction, setPostAction] = useState('create')
    const [dataPostComment, setDataPostComment] = useState({})
    const [dataPostEdit, setDataPostEdit] = useState({})
    const [dataModalUsersLikePost, setDataModalUsersLikePost] = useState([])
    const [isShowModalPost, setIsShowModalPost] = useState(false)
    const [isShowModalCommentPost, setIsShowModalCommentPost] = useState(false)
    const [isShowModalUsersLikePost, setIsShowModalUsersLikePost] = useState(false)

    useEffect(() => {
        fetchAllPost()
    }, [])

    const fetchAllPost = async () => {
        const response = await getAllPosts()

        if (response && +response.data.EC === 0) {
            setPosts(response.data.DT)
        } else {
            toast.error(response.data.EM)
        }
    }

    const handleCreatePost = () => {
        setIsShowModalPost(true)
        setPostAction('create')
    }

    const handleDeletePost = async (post) => {
        const response = await deletePost(post.post_id)

        if (response && +response.data.EC === 0) {
            fetchAllPost()
            toast(response.data.EM)
        }
    }

    const handleEditPost = (post) => {
        setPostAction('update')
        console.log(post);
        
        setIsShowModalPost(true)
        setDataPostEdit(post)
    }

    const handleCancelPost = () => {
        setIsShowModalPost(false)
    }

    const handleCommentPost = (post) => {
        setIsShowModalCommentPost(true)
        setDataPostComment(post)
    }

    const handleCloseModalComment = () => {
        setIsShowModalCommentPost(false)
    }

    const handleActionsLikePost = async (post, type) => {
        const data = {
            userId: userStore.id,
            postId: post.post_id
        }
        const response =
            type === 'like' ?
                await likePost(data) :
                await unLikePost(data)

        if (response && +response.data.DT === 0) {
            toast(response.data.EM)
            fetchAllPost()
        }
    }

    const getAllUsersLikePost = (postId) => {
        const data = posts.filter(post => post.post_id === postId)
        setIsShowModalUsersLikePost(true)
        setDataModalUsersLikePost(data[0].usersLikePost)
    }

    const handleCloselModalUserLikePost = () => {
        setIsShowModalUsersLikePost(false)
    }

    return (
        <>
            <div>
                <h1>Xin chào {userStore.username}!</h1>

                <Alert onClick={() => handleCreatePost()} className='mt-5' variant={'secondary'}>
                    {userStore.username} ơi, bạn đang nghĩ gì thế?
                </Alert>

                <div className='container mt-5'>
                    <div className='row row-gap-5'>
                        {posts.map((post, index) => (
                            <div className="card col-12" key={index}>
                                <div className="card-body">
                                    <div className='my-2'>
                                        <div className='d-flex justify-content-between'>
                                            <span
                                                className='d-flex align-items-center gap-1'
                                                style={{ color: '#0d6efd', fontWeight: '600' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                                </svg>
                                                {post.username} · {(formatDate(post.created_at))}
                                            </span>
                                            {userStore.id === post.user_id &&
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                        Tuỳ chọn
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            onClick={() => handleDeletePost(post)}
                                                            className='d-flex align-items-center gap-1'
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                            </svg>
                                                            Xoá
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => handleEditPost(post)}
                                                            className='d-flex align-items-center gap-1'
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                            </svg>
                                                            Chỉnh sửa
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>}
                                        </div>
                                    </div>
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.content}</p>
                                    <div className='d-flex justify-content-between mb-3'>
                                        <span
                                            style={{ color: '#0d6efd', cursor: 'pointer' }}
                                            onClick={() => getAllUsersLikePost(post.post_id)}
                                        >{post.usersLikePost.length} lượt thích</span>
                                        <span
                                            style={{ color: '#0d6efd', cursor: 'pointer' }}
                                            onClick={() => handleCommentPost(post)}>
                                            {post.comment_count} bình luận
                                        </span>
                                    </div>
                                    <div className='d-flex gap-3'>
                                        {post.usersLikePost.some(user =>
                                            user.post_id === post.post_id && user.user_id === userStore.id
                                        ) ? (
                                            <button
                                                onClick={() => handleActionsLikePost(post, "unLike")}
                                                className='btn btn-success'
                                            >
                                                Bỏ Thích
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleActionsLikePost(post, "like")}
                                                className='btn btn-success'
                                            >
                                                Thích
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleCommentPost(post)}
                                            className="btn btn-primary d-flex gap-1 align-items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
                                                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                            </svg>
                                            Bình luận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >

            <ModalPost
                show={isShowModalPost}
                handleClose={handleCancelPost}
                data={dataPostEdit}
                fetchAllPost={fetchAllPost}
                actions={postAction}
            />

            <ModalComment
                show={isShowModalCommentPost}
                handleClose={handleCloseModalComment}
                data={dataPostComment}
                fetchAllPost={fetchAllPost}
            />

            <ModalUsersLikePost
                show={isShowModalUsersLikePost}
                handleClose={handleCloselModalUserLikePost}
                data={dataModalUsersLikePost}
            />
        </>
    );
}

export default Posts;