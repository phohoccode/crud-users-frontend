import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { handleOnchangeInputs } from '../utils';
import { changePass } from '../service/userService';
import { toast } from 'react-toastify';
import { StoreContext } from '../store/StoreContext'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function ModalChangePass(props) {
    const { width } = useContext(StoreContext)
    const defaultData = {
        pass: '',
        newPass: ''
    }
    const [data, setData] = useState(defaultData)
    const [isLoading, setIsLoading] = useState(false)

    const handleCloseModal = () => {
        setData(defaultData)
        props.handleClose()
    }

    const handleChangePass = async () => {

        setIsLoading(true)

        const response = await changePass({
            idUser: props.idUser,
            pass: data.pass,
            newPass: data.newPass
        })

        if (response && +response.data.EC === 0) {
            toast(response.data.EM)
            props.handleClose()
            setData(defaultData)
        } else {
            toast.error(response.data.EM)
        }
        
        setIsLoading(false)
    }

    return (
        <Modal show={props.show} onHide={handleCloseModal} centered={width < 467}>
            <Modal.Header closeButton>
                <Modal.Title>Thay đổi mật khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel controlId="oldPass" label="Mật khẩu cũ">
                    <Form.Control
                        value={data.pass || ''}
                        onChange={(e) => handleOnchangeInputs(setData, data, e.target.value, 'pass')}
                        type="password" placeholder="Password" />
                </FloatingLabel>
                <FloatingLabel className='mt-3' controlId="floatingPassword" label="Mật khẩu mới">
                    <Form.Control
                        value={data.newPass || ''}
                        onChange={(e) => handleOnchangeInputs(setData, data, e.target.value, 'newPass')}
                        type="password" placeholder="Password" />
                </FloatingLabel>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Huỷ
                </Button>
                {isLoading ?
                    (<Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                    </Button>
                    ) : (<Button
                        disabled={!data.pass || !data.newPass}
                        variant="primary" onClick={() => handleChangePass()}>
                        Xác nhận
                    </Button>)}
            </Modal.Footer>
        </Modal >
    );
}

export default ModalChangePass;