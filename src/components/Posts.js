import { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import { toast } from 'react-toastify'
import Alert from 'react-bootstrap/Alert';
import { deletePost, getAllPosts } from '../service/postsService'
import ModalComment from './ModalComment';
import { StoreContext } from '../store/StoreContext';
import ModalPost from './ModalPost';
import { likePost, unLikePost } from '../service/likeService';
import ModalUsersLikePost from './ModalUsersLikePost';
import Post from './Post';
import Loading from './Loading';
import { PostsContext } from '../store/PostsContext';

function Posts() {
    // const { userStore } = useContext(StoreContext)
    // const [posts, setPosts] = useState([])
    // const [images, setImages] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    const {
        isLoading,
        isShowModalPost,
        dataPostEdit,
        postAction,
        isShowModalCommentPost,
        dataPostComment,
        isShowModalUsersLikePost,
        dataModalUsersLikePost,
        handleCreatePost,
        handleCancelPost,
        handleCloseModalComment,
        handleCloselModalUserLikePost,
        fetchAllPost,
        userStore,
        posts
    } = useContext(PostsContext)

    useEffect(() => {
        fetchAllPost()
    }, [])

    // const fetchAllPost = async () => {
    //     const response = await getAllPosts()

    //     if (response && +response.data.EC === 0) {
    //         console.log(response.data.DT);
    //         setPosts(response.data.DT)
    //         setImages(response.data.DT.images)
    //         setIsLoading(true)
    //     } else {
    //         toast.error(response.data.EM)
    //     }
    // }

    // const handleCreatePost = () => {
    //     setIsShowModalPost(true)
    //     setPostAction('create')
    // }

    // const handleDeletePost = async (post) => {
    //     const response = await deletePost(post.post_id)

    //     if (response && +response.data.EC === 0) {
    //         fetchAllPost()
    //         toast(response.data.EM)
    //     }
    // }

    // const handleEditPost = (post) => {
    //     setPostAction('update')
    //     setIsShowModalPost(true)
    //     setDataPostEdit(post)
    // }

    // const handleCancelPost = () => {
    //     setIsShowModalPost(false)
    // }

    // const handleCommentPost = (post) => {
    //     setIsShowModalCommentPost(true)
    //     setDataPostComment(post)
    // }

    // const handleCloseModalComment = () => {
    //     setIsShowModalCommentPost(false)
    // }

    // const handleActionsLikePost = async (post, type, postIndex) => {

    //     setIndexLoadingLikeOrUnlike(postIndex)

    //     const data = {
    //         userId: userStore.id,
    //         postId: post.post_id
    //     }
    //     const response =
    //         type === 'like' ?
    //             await likePost(data) :
    //             await unLikePost(data)

    //     if (response && +response.data.DT === 0) {
    //         await fetchAllPost()
    //         toast(response.data.EM)
    //         setIndexLoadingLikeOrUnlike(-1)
    //     }
    // }

    // const getAllUsersLikePost = (postId) => {
    //     const data = posts.filter(post => post.post_id === postId)
    //     setIsShowModalUsersLikePost(true)
    //     setDataModalUsersLikePost(data[0].usersLikePost)
    // }

    // const handleCloselModalUserLikePost = () => {
    //     setIsShowModalUsersLikePost(false)
    // }

    return (
        <>
            <div>
                <h1>Xin chào {userStore.username}!</h1>

                <Alert onClick={() => handleCreatePost()} className='mt-5' variant={'secondary'}>
                    {userStore.username} ơi, bạn đang nghĩ gì thế?
                </Alert>

                {!isLoading &&
                    <Loading content="Đang tải danh sách bài viết..." />
                }
                {(posts.length === 0 && isLoading) &&
                    <h4 className='text-center mt-5'>Chưa có bài viết</h4>
                }
                {(posts && posts.length > 0 && isLoading) &&
                    <div className='container mt-5'>
                        <div className='row row-gap-5'>
                            {posts.map((post, index) => (
                                <Post
                                    key={index}
                                    index={index}
                                    post={post}
                                    posts={post}
                                    fetchAllPost={fetchAllPost}
                                />
                            ))}
                        </div>
                    </div>}
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