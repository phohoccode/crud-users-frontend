import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://phosocial-frontend.vercel.app/'
});

instance.defaults.withCredentials = true

export default instance