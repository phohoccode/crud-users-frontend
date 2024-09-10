import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { updatePost } from '../service/postsService';
import { toast } from 'react-toastify';

function ModalEditPost(props) {
    const [valueEdit, setValueEdit] = useState({
        title: '',
        content: ''
    })

    useEffect(() => {        
        setValueEdit(props.data)
    }, [props.data])

    const handleOnchangeInputs = (value, name) => {
        const _valueEdit = _.cloneDeep(valueEdit)
        _valueEdit[name] = value
        setValueEdit(_valueEdit)
    }

    const handleSaveEditPost = async () => {
        const data = {
            id: props.data.id,
            title:valueEdit.title,
            content:valueEdit.content
        }
        const response = await updatePost(data)

        if (response && +response.data.EC === 0) {
            toast(response.data.EM)
            props.handleClose()
            props.fetchAllPost()
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa bài viết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control
                            onChange={(e) => handleOnchangeInputs(e.target.value, 'title')}
                        type="text" value={valueEdit.title} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nội dung</Form.Label>
                        <Form.Control
                            onChange={(e) => handleOnchangeInputs(e.target.value, 'content')}
                        type="text" value={valueEdit.content} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Huỷ
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveEditPost()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditPost;