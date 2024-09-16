import { useState, useContext, useEffect } from "react"
import { StoreContext } from "../store/StoreContext"
import {search} from '../service/userService'
import { toast } from "react-toastify"

function Search() {
    const { userStore } = useContext(StoreContext)
    const [posts, setPosts] = useState([])
    const [isShowModalPost, setIsShowModalPost] = useState(false)
    const [postAction, setPostAction] = useState('create')
    const [dataPostComment, setDataPostComment] = useState({})
    const [dataPostEdit, setDataPostEdit] = useState({})
    const [images, setImages] = useState([])
    const [dataModalUsersLikePost, setDataModalUsersLikePost] = useState([])
    const [isShowModalCommentPost, setIsShowModalCommentPost] = useState(false)
    const [isShowModalUsersLikePost, setIsShowModalUsersLikePost] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [indexLoadingLikeOrUnlike, setIndexLoadingLikeOrUnlike] = useState(-1)

    useEffect(() => {
        fetchAllPost()
    }, [])

    const fetchAllPost = async () => {
        const response = await search()

        if (response && +response.data.EC === 0) {
            setPosts(response.data.DT)
            setImages(response.data.DT.images)
            setIsLoading(true)
        } else {
            toast.error(response.data.EM)
        }
    }

    return (
        <div>

        </div>
    );
}

export default Search;