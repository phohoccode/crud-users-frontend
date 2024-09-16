import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../store/StoreContext";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { handleOnchangeInputs } from "../utils";
import { changeInfo } from "../service/userService";
import { toast } from "react-toastify";

function User() {
    const navigate = useNavigate()
    const { userStore, setIsLogin } = useContext(StoreContext)
    const defaultValue = {
        id: null,
        username: '',
        email: '',
        gender: 1,
        phone: '',
        address: ''
    }
    const [isEdit, setIsEdit] = useState(false)
    const [dataUser, setDataUser] = useState(defaultValue)

    useEffect(() => {
        setDataUser(userStore)
    }, [userStore])

    const handleCancelChangeInfo = () => {
        setIsEdit(false)
        setDataUser(userStore)
    }

    const handleSave = async () => {
        if (!dataUser.email || !dataUser.username) {
            toast.error('Tên người dùng hoặc email không trống!')
            return
        }

        const response = await changeInfo(dataUser)

        if (response && +response.data.EC === 0) {
            toast(response.data.EM)
            navigate('/login')
            setIsLogin(false)
        } else {
            toast.error(response.data.EM)
        }
    }

    return (
        <div className="mt-5 container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Thông tin người dùng</Accordion.Header>
                    <Accordion.Body className="container">
                        <div className="row">
                            <Form.Group className="mb-3 col-12 col-sm-3 ">
                                <Form.Label>Tên người dùng</Form.Label>
                                <Form.Control
                                    onChange={(e) => handleOnchangeInputs(setDataUser, dataUser, e.target.value, 'username')}
                                    disabled={!isEdit}
                                    value={dataUser.username}
                                    type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-12 col-sm-6">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    onChange={(e) => handleOnchangeInputs(setDataUser, dataUser, e.target.value, 'email')}
                                    disabled={!isEdit}
                                    value={dataUser.email}
                                    type="email" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-12 col-sm-3">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    onChange={(e) => handleOnchangeInputs(setDataUser, dataUser, e.target.value, 'phone')}
                                    disabled={!isEdit}
                                    value={dataUser.phone}
                                    type="phone" />
                            </Form.Group>
                        </div>
                        <div className="row">
                            <Form.Group className="mb-3 col-12 col-sm-3">
                                <Form.Label>Giới tính</Form.Label>
                                <Form.Select
                                    value={dataUser.gender}
                                    onChange={(e) => handleOnchangeInputs(setDataUser, dataUser, e.target.value, 'gender')}
                                    disabled={!isEdit}
                                >
                                    <option>-- Chọn giới tính của bạn</option>
                                    <option value="0">Nam</option>
                                    <option value="1">Nữ</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 col-12 col-sm-9">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control
                                    onChange={(e) => handleOnchangeInputs(setDataUser, dataUser, e.target.value, 'address')}
                                    disabled={!isEdit}
                                    value={dataUser.address}
                                    type="text" />
                            </Form.Group>
                        </div>
                        <div className="d-flex gap-2 ">
                            {isEdit &&
                                <>
                                    <button
                                        onClick={() => handleCancelChangeInfo()}
                                        className="btn btn-secondary">Huỷ</button>
                                    <button
                                        onClick={() => handleSave()}
                                        className="btn btn-primary">Lưu</button>
                                </>
                            }
                            {!isEdit &&
                                <div className="d-flex flex-column mt-3 flex-sm-row gap-2 align-items-sm-center">
                                    <button onClick={() => setIsEdit(true)} className="btn btn-primary">
                                        Thay đổi thông tin
                                    </button>

                                    <span style={{ color: 'red' }}>* Khi thay đổi thông tin bạn sẽ cần đăng nhập lại để cập nhật thông tin mới nhất</span>
                                </div>
                            }
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default User;