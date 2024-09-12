import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../service/authService';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { StoreContext } from '../store/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import ModalChangePass from './ModalChangePass';

function Navigation() {
    const { userStore, setUserStore, defaultUser, setIsLogin } = useContext(StoreContext)
    const navigate = useNavigate()
    const [isShowModalChangePass, setIsShowModalChangePass] = useState(false) 

    
    const handleLogout = async () => {
        const response = await logout()

        if (response && +response.data.EC === 0) {
            toast(response.data.EM)
            setUserStore(defaultUser)
            setIsLogin(false)
            navigate('/login')
        }
    }

    const handleChangePass = () => {
        setIsShowModalChangePass(true)
    }

    const handleCancelChangePass = () => {
        setIsShowModalChangePass(false)
    }

    return (
       <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">PHOSOCICALS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href='/' >Trang chủ</Nav.Link>
                            <NavDropdown title="Tuỳ chọn" id="navbarScrollingDropdown">
                                <Link to='/user' className='dropdown-item'>Thông tin người dùng</Link>
                                <Nav.Item onClick={() => handleChangePass()} className='dropdown-item'>Đổi mật khẩu</Nav.Item>
                                <Nav.Item onClick={() => handleLogout()} className='dropdown-item'>
                                    Đăng xuất
                                </Nav.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <ModalChangePass
                show={isShowModalChangePass}
                handleClose={handleCancelChangePass}
                idUser={userStore.id}
            />
       </>
    );
}

export default Navigation;