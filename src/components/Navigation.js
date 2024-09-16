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
    const [valueSearch, setValueSearch] = useState("")

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

    const handleSearchPosts = () => {
        navigate(`/search/${valueSearch}`)
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
                            <Link to='/' className='nav-link'>Trang chủ</Link>
                            <NavDropdown title="Tuỳ chọn" id="navbarScrollingDropdown">
                                <Link to='/user' className='dropdown-item d-flex align-items-center gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                    </svg>
                                    Thông tin người dùng
                                </Link>
                                <Nav.Item onClick={() => handleChangePass()} className='dropdown-item d-flex align-items-center gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                    </svg>
                                    Đổi mật khẩu
                                </Nav.Item>
                                <Nav.Item onClick={() => handleLogout()} className='dropdown-item d-flex align-items-center gap-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                    </svg>
                                    Đăng xuất
                                </Nav.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                onChange={(e) => setValueSearch(e.target.value)}
                                value={valueSearch}
                                type="search"
                                placeholder="Tìm kiếm bài viết..."
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button
                                onClick={() => handleSearchPosts()}
                            variant="outline-success">Tìm</Button>
                        </Form>
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