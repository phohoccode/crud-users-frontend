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
import { likePost, unLikePost, getAllLikesPost } from '../service/likeService';
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
            console.log(response.data.DT);
        }
    }

    const handleCreatePost = () => {
        setIsShowModalPost(true)
        setPostAction('create')
    }

    const handleDeletePost = async (post) => {
        const response = await deletePost(post.id)

        if (response && +response.data.EC === 0) {
            fetchAllPost()
            toast(response.data.EM)
        }
    }

    const handleEditPost = (post) => {
        setPostAction('update')
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
            postId: post.id
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
        const data = posts.filter(post => post.id === postId)
        setIsShowModalUsersLikePost(true)
        setDataModalUsersLikePost(data[0].finalLikePost)
    }

    const handleCloselModalUserLikePost = () => {
        setIsShowModalUsersLikePost(false)
    }

    return (
        <>
            <div>
                <h1>Xin chào {userStore.username}!</h1>

                <Alert onClick={() => handleCreatePost()} className='mt-5' variant={'secondary'}>
                    {userStore.username}, bạn đang nghĩ gì thế?
                </Alert>

                <div className='container mt-5'>
                    <div className='row row-gap-5'>
                        {posts.map((post, index) => (
                            <div className="card col-12" key={index}>
                                <div className="card-body">
                                    <div className='my-2'>
                                        <div className='d-flex justify-content-between'>
                                            <h6 style={{ color: '#0d6efd', fontWeight: '600' }}>
                                                {post.username} · {(formatDate(post.created_at))} · {post.id}
                                            </h6>
                                            {userStore.id === post.user_id &&
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                        Tuỳ chọn
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            onClick={() => handleDeletePost(post)}
                                                        >Xoá</Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => handleEditPost(post)}
                                                        >Chỉnh sửa</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>}
                                        </div>
                                    </div>
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.content}</p>
                                    <div className='d-flex justify-content-between mb-3'>
                                        <span
                                            onClick={() => getAllUsersLikePost(post.id)}
                                        >{post.finalLikePost.length} lượt thích</span>
                                        <span onClick={() => handleCommentPost(post)}>
                                            {post.countComment} bình luận
                                        </span>
                                    </div>
                                    <div className='d-flex gap-3'>
                                        {post.finalLikePost.some(likePost =>
                                            likePost.post_id === post.id && likePost.user_id === userStore.id
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
                                            className="btn btn-primary"
                                        >
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