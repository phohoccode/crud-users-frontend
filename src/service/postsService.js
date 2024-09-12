import axios from '../config/axios'

const getAllPosts = () => {
    return axios.get(`api/v1/posts/read`)
}

const createPost = (data) => {
    return axios.post('api/v1/posts/create', { ...data })
}

const deletePost = (postId) => {
    return axios.delete(`api/v1/posts/delete/${postId}`)
}

const updatePost = (data) => {
    return axios.put(`api/v1/posts/update/${data.id}`, { ...data })
}

export {
    getAllPosts,
    createPost,
    deletePost,
    updatePost
}