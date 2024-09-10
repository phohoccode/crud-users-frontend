import { useState, useEffect } from 'react'
import _ from 'lodash'
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from 'react-toastify'

import { createPost, deletePost, getAllPosts } from '../service/postsService'
import ModalEditPost from './ModalEditPost';
import ModalComment from './ModalComment';

function Posts() {
    const defaultValuePost = {
        title: '',
        content: ''
    }
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({ defaultValuePost })
    const [userData, setUserData] = useState(() => {
        return JSON.parse(localStorage.getItem('data-user'))
    })

    const [isShowCreatePost, setIsShowCreatePost] = useState(false)
    const [isShowModalUpdatePost, setIsShowModalUpdatePost] = useState(false)
    const [isShowModalCommentPost, setIsShowModalCommentPost] = useState(false)
    const [dataPostEdit, setDataPostEdit] = useState({})
    const [dataPostComment, setDataPostComment] = useState({})

    useEffect(() => {
        fetchAllPost()
    }, [])

    const fetchAllPost = async () => {
        const response = await getAllPosts()

        if (response && +response.data.EC === 0) {
            setPosts(response.data.DT)
        }
    }

    const handleOnchangeInputs = (value, name) => {
        const _post = _.cloneDeep(post)
        _post[name] = value
        setPost(_post)
    }

    const handleCreatePost = async () => {
        if (!post.title || !post.content) {
            toast.error('Vui lòng nhập thông tin!')
            return
        }

        const response = await createPost({
            userId: userData.id,
            title: post.title,
            content: post.content
        })

        if (response && +response.data.EC === 0) {
            setPost(defaultValuePost)
            setIsShowCreatePost(false)
            fetchAllPost()
        }
    }

    const handleDeletePost = async (post) => {
        const response = await deletePost(post.id)

        if (response && +response.data.EC === 0) {
            fetchAllPost()
            toast(response.data.EM)
        }
    }

    const handleEditPost = (post) => {
        setIsShowModalUpdatePost(true)
        setDataPostEdit(post)
    }

    const handleCancelEditPost = () => {
        setIsShowModalUpdatePost(false)
    }

    const handleCommentPost = (post) => {
        setIsShowModalCommentPost(true)
        setDataPostComment(post)
    }

    const handleCloseModalComment = () => {
        setIsShowModalCommentPost(false)
    }

    return (
        <>
            <div>
                <div className='d-flex justify-content-between'>
                    <h1>Xin chào {userData.username}</h1>
                    <button
                        onClick={() => setIsShowCreatePost(true)}
                        className='btn btn-primary'>Tạo bài viết mới</button>
                </div>

                {isShowCreatePost &&
                    <div className='mt-5'>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Tiêu đề</label>
                            <input
                                onChange={(e) => handleOnchangeInputs(e.target.value, 'title')}
                                value={post.title}
                                type="text" className="form-control" id="title" placeholder="Tiêu đề bài viết" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Nội dung</label>
                            <input
                                onChange={(e) => handleOnchangeInputs(e.target.value, 'content')}
                                value={post.content}
                                type="text" className="form-control" id="content" placeholder="Nội dung bài viết" />
                        </div>
                        <div className='d-flex justify-content-end gap-2'>
                            <button
                                onClick={() => setIsShowCreatePost(false)}
                                className='btn btn-secondary'>Huỷ</button>
                            <button
                                onClick={() => handleCreatePost()}
                                className='btn btn-primary'>Tạo</button>
                        </div>
                    </div>}

                <div className='container mt-5'>
                    <div className='row row-gap-5'>
                        {posts.map((post, index) => (
                            <div className="card col-12" key={index}>
                                <div className="card-body">
                                    <div className='my-2'>
                                        <div className='d-flex justify-content-between'>
                                            <h5>{post.username} - {post.user_id}</h5>
                                            {userData.id === post.user_id &&
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
                                        <span>Thời gian tạo {post.created_at}</span>
                                    </div>
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.content}</p>
                                    <button onClick={() => handleCommentPost(post)} className="btn btn-primary">Bình luận</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ModalEditPost
                show={isShowModalUpdatePost}
                handleClose={handleCancelEditPost}
                data={dataPostEdit}
                fetchAllPost={fetchAllPost}
            />

            <ModalComment
                show={isShowModalCommentPost}
                handleClose={handleCloseModalComment}
                data={dataPostComment}
            />
        </>
    );
}

export default Posts;