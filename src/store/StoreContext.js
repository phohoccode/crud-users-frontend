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

    useEffect(() => {
        fetchDataAccount()
    }, [])

    const fetchDataAccount = async () => {
        const response = await decodeToken()
        
        if (response && +response.data.EC !== 0) {
            toast.error(response.data.EM)
            return
        }

        console.log(response.data.DT.account);
        
        const data = response.data.DT.account
        setUserStore({
            id: data.id,
            username: data.username,
            email: data.email
        })
        setIsLogin(true)
        toast(response.data.EM)
    }

    const value = { defaultUser, isLogin, setIsLogin, userStore, setUserStore, fetchDataAccount }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}

export { StoreProvider, StoreContext };