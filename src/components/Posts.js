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

    return (
        <>
            <div>
                <h1>Xin chào! {userStore.username}</h1>

                <Alert
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleCreatePost()} className='mt-5' variant={'secondary'}>
                    {userStore.username} ơi, bạn đang nghĩ gì thế?
                </Alert>

                {!isLoading &&
                    <Loading content="Đang tải danh sách bài viết..." />
                }
                {(posts.length === 0 && isLoading) &&
                    <div className='d-flex align-items-center mt-5 justify-content-center gap-3'>
                        <h4>Chưa có bài viết nào tại đây!</h4>
                        <button
                            onClick={() => handleCreatePost()}
                            className='btn btn-primary'>Tạo ngay</button>
                    </div>
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