import axios from "../config/axios";

const likePost = (data) => {
    return axios.post('api/v1/like/like-post', {...data})
}

const unLikePost = (data) => {
    return axios.post('api/v1/like/unlike-post', {...data})
}


export {
    likePost,
    unLikePost
}