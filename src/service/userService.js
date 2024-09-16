import axios from "../config/axios"

const changePass = (data) => {
    return axios.post('api/v1/user/change-password', { ...data })
}

const changeInfo = (data) => {
    return axios.post('api/v1/user/change-info', { ...data })
}

const search = (value) => {
    return axios.post('api/v1/user/search', value)
}

export {
    changePass, changeInfo, search
}