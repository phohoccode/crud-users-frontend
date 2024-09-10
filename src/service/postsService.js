import axios from "axios";

const getAllPosts = () => {
    return axios.get(`http://localhost:5000/api/v1/posts/read`)
}

const createPost = (data) => {
    return axios.post('http://localhost:5000/api/v1/posts/create', { ...data })
}

const deletePost = (postId) => {
    return axios.delete(`http://localhost:5000/api/v1/posts/delete/${postId}`)
}

const updatePost = (data) => {
    return axios.put(`http://localhost:5000/api/v1/posts/update/${data.id}`, { ...data })
}

export {
    getAllPosts,
    createPost,
    deletePost,
    updatePost
}