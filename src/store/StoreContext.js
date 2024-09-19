import { useState, useEffect, createContext } from 'react'
import { decodeToken } from '../service/authService'
import { toast } from 'react-toastify'

const StoreContext = createContext(null)

function StoreProvider({ children }) {
    const defaultUser = {
        id: null,
        username: '',
        email: ''
    }
    const [userStore, setUserStore] = useState(defaultUser)
    const [isLogin, setIsLogin] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleReSize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleReSize)
        return () => document.removeEventListener('resize', handleReSize)
    }, [width])

    useEffect(() => {
        if (window.location.pathname !== '/login') {            
            fetchDataAccount()
        }
    }, [])

    const fetchDataAccount = async () => {
        const response = await decodeToken()
        console.log(response)
        if (response && +response.data.EC !== 0) {
            toast.error(response.data.EM)
            window.location.href = '/login'
            return
        }

        const data = response.data.DT.account
        console.log(data);
              
        setUserStore({
            id: data.id,
            username: data.username,
            email: data.email,
            phone: data.phone,
            address: data.address,
            gender: data.gender
        })
        setIsLogin(true)
        toast(response.data.EM)
    }

    const value = { defaultUser, width, isLogin, setIsLogin, userStore, setUserStore, fetchDataAccount }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}

export { StoreProvider, StoreContext };