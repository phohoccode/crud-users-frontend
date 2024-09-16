import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navigation';
import { useContext } from 'react';
import { StoreContext } from './store/StoreContext';
import User from './pages/User';
import Search from './pages/Search';

function App() {
    const { isLogin } = useContext(StoreContext)

    return (
        <>
            <Router>
                {isLogin && <Navigation />}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/search/:value' element={<Search />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </Router>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
