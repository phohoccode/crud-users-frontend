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
        email: ''
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
                    <Accordion.Body className="d-flex gap-3">
                        <Form.Group className="mb-3 col-5">
                            <Form.Label>Tên người dùng</Form.Label>
                            <Form.Control
                                onChange={(e) => handleOnchangeInputs(setDataUser, dataUser, e.target.value, 'username')}
                                disabled={!isEdit}
                                value={dataUser.username}
                                type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3 col-6">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                onChange={(e) => handleOnchangeInputs(setDataUser, dataUser, e.target.value, 'email')}
                                disabled={!isEdit}
                                value={dataUser.email}
                                type="email" />
                        </Form.Group>
                    </Accordion.Body>
                    <div className="d-flex gap-2 px-4 pb-3">
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
                            <button onClick={() => setIsEdit(true)} className="btn btn-primary">
                                Thay đổi thông tin
                            </button>}
                    </div>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default User;