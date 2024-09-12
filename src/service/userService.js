import axios from "../config/axios"

const changePass = (data) => {
    return axios.post('api/v1/user/change-password', { ...data })
}

const changeInfo = (data) => {
    return axios.post('api/v1/user/change-info', { ...data })

}

export {
    changePass, changeInfo
}