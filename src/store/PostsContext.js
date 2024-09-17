import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deletePost } from "../service/postsService";
import { likePost, unLikePost } from "../service/likeService";
import { StoreContext } from "./StoreContext";
import { getAllPosts } from "../service/postsService";

const PostsContext = createContext(null)
function PostsProvider({ children }) {
    const { userStore } = useContext(StoreContext)
    const [posts, setPosts] = useState([])
    const [postAction, setPostAction] = useState('create')
    const [dataPostComment, setDataPostComment] = useState({})
    const [dataPostEdit, setDataPostEdit] = useState({})
    const [dataModalUsersLikePost, setDataModalUsersLikePost] = useState([])
    const [isShowModalPost, setIsShowModalPost] = useState(false)
    const [isShowModalCommentPost, setIsShowModalCommentPost] = useState(false)
    const [isShowModalUsersLikePost, setIsShowModalUsersLikePost] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [indexLoadingLikeOrUnlike, setIndexLoadingLikeOrUnlike] = useState(-1)

    useEffect(() => {
        fetchAllPost()
    }, [])

    const fetchAllPost = async () => {
        const response = await getAllPosts()

        if (response && +response.data.EC === 0) {
            setPosts(response.data.DT)
            setIsLoading(true)

            return response.data.DT
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
            await fetchAllPost()
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

    const handleActionsLikePost = async (post, type, postIndex) => {

        setIndexLoadingLikeOrUnlike(postIndex)

        const data = {
            userId: userStore.id,
            postId: post.post_id
        }
        const response =
            type === 'like' ?
                await likePost(data) :
                await unLikePost(data)

        if (response && +response.data.DT === 0) {
            await fetchAllPost()
            toast(response.data.EM)
            setIndexLoadingLikeOrUnlike(-1)
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

    const value = {
        posts,
        userStore,
        isShowModalPost,
        dataPostEdit,
        dataPostComment,
        postAction,
        dataModalUsersLikePost,
        isShowModalUsersLikePost,
        isShowModalCommentPost,
        isLoading,
        indexLoadingLikeOrUnlike,
        setIsLoading,
        handleCreatePost,
        handleDeletePost,
        handleEditPost,
        handleCommentPost,
        handleCancelPost,
        handleCloseModalComment,
        handleActionsLikePost,
        getAllUsersLikePost,
        handleCloselModalUserLikePost,
        fetchAllPost
    }

    return (
        <PostsContext.Provider value={value}>
            {children}
        </PostsContext.Provider>
    )
}

export { PostsProvider, PostsContext };