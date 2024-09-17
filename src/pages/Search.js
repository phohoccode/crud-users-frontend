import { useState, useContext, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { PostsContext } from "../store/PostsContext"
import Loading from "../components/Loading"
import Post from "../components/Post"
import ModalPost from "../components/ModalPost"
import ModalComment from "../components/ModalComment"
import ModalUsersLikePost from "../components/ModalUsersLikePost"

function Search() {
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
    const [postsSearch, setPostsSearch] = useState([])

    useEffect(() => {
        setPostsSearch(buildPostsDataByValueSearch())
    }, [posts])

    useEffect(() => {
        setIsLoading(true)
        setPostsSearch(buildPostsDataByValueSearch())
    }, [params.value])


    const buildPostsDataByValueSearch = () => {
        const valueSearch = params.value.toLowerCase()
        const data = posts.filter(post => {
            return post.title.toLowerCase().includes(valueSearch) ||
                post.content.toLowerCase().includes(valueSearch)
        })

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return data
    }

    return (
        <div className="container">
            {isLoading &&
                <Loading content="Đang tìm kiếm bài viết phù hợp..." />
            }
            {(postsSearch && postsSearch.length === 0 && !isLoading) &&
                <h4 className='text-center mt-5'>Không tìm thấy bài viết phù hợp cho từ khoá "{params.value}"</h4>
            }
            {(postsSearch && postsSearch.length > 0 && !isLoading) &&
                <div className='container mt-5'>
                    <h4 className='mb-5'>Tìm thấy {postsSearch.length} bài viết phù hợp cho từ khoá "{params.value}"</h4>
                    <div className='row row-gap-5'>
                        {postsSearch.map((post, index) => (
                            <Post
                                key={index}
                                index={index}
                                post={post}
                                posts={postsSearch}
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

export default Search;