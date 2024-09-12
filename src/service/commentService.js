import axios from '../config/axios'


const getAllComments = (postId) => {
    return axios.get(`api/v1/comments/read/${postId}`)
}

const createComment = (data) => {
    return axios.post('api/v1/comments/create', { ...data })
}

const deleteComment = (commentId) => {
    return axios.delete(`api/v1/comments/delete/${commentId}`)
}

const updateComment = (data) => {
    return axios.put(`api/v1/comments/update/${data.id}`, { ...data })
}

export {
    getAllComments,
    createComment,
    deleteComment,
    updateComment
}