import axios from "axios";

const getAllComments = (postId) => {
    return axios.get(`http://localhost:5000/api/v1/comments/read/${postId}`)
}

const createComment = (data) => {
    return axios.post('http://localhost:5000/api/v1/comments/create', { ...data })
}

const deleteComment = (commentId) => {
    return axios.delete(`http://localhost:5000/api/v1/comments/delete/${commentId}`)
}

const updateComment = (data) => {
    return axios.put(`http://localhost:5000/api/v1/comments/update/${data.id}`, { ...data })
}

export {
    getAllComments,
    createComment,
    deleteComment,
    updateComment
}