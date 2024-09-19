import { useState, useContext, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { PostsContext } from "../store/PostsContext"
import Loading from "../components/Loading"
import Post from "../components/Post"
import ModalPost from "../components/ModalPost"
import ModalComment from "../components/ModalComment"
import ModalUsersLikePost from "../components/ModalUsersLikePost"

function User() {
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const {
        isShowModalPost,
        dataPostEdit,
        postAction,
        isShowModalCommentPost,
        dataPostComment,
        isShowModalUsersLikePost,
        dataModalUsersLikePost,
        handleCancelPost,
        handleCloseModalComment,
        handleCloselModalUserLikePost,
        fetchAllPost,
        posts
    } = useContext(PostsContext)
    const [postsUser, setPostsUser] = useState([])

    useEffect(() => {
        setPostsUser(buildPostsDataByUser())
    }, [posts])

    useEffect(() => {
        setIsLoading(true)
        setPostsUser(buildPostsDataByUser())
    }, [params])

    const buildPostsDataByUser = () => {
        const { userId } = params
        const data = posts.filter(post => {
            return post.user_id === +userId
        })

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return data
    }

    return (
        <div className="container">
            {isLoading &&
                <Loading content="Đang tải danh sách bài viết..." />
            }
            {(postsUser && postsUser.length === 0 && !isLoading) &&
                <h4 className='text-center mt-5'>
                    <span style={{ color: 'rgb(13, 110, 253)' }}>{params.username} </span>
                    chưa đăng bất kì bài viết nào
                </h4>
            }
            {(postsUser && postsUser.length > 0 && !isLoading) &&
                <div className='container mt-5'>
                    <h4 className='mb-5'>
                        Danh sách bài viết của {
                            <span style={{ color: 'rgb(13, 110, 253)' }}>{params.username}</span>
                        }
                    </h4>
                    <div className='row row-gap-5'>
                        {postsUser.map((post, index) => (
                            <Post
                                key={index}
                                index={index}
                                post={post}
                                posts={postsUser}
                                fetchAllPost={fetchAllPost}
                            />
                        ))}
                    </div>
                </div>
            }

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
        </div>
    );
}

export default User;