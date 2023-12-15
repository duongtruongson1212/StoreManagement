import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import Toast from '../LoadingError/Toast';
import { USER_CREATE_RESET, USER_SINGLE_RESET, USER_UPDATE_RESET } from '../../Redux/Constants/UserConstants';
import { createUser, listUser, updateUser } from './../../Redux/Actions/UserActions';
const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  const initialItems = [
    { id: 2, name: 'Kho', value: 'isInventory' },
    { id: 3, name: 'Bán hàng', value: 'isSaleAgent' },
    { id: 4, name: 'Quản trị', value: 'isAdmin' },
  ];
const AddUser = (props) => { 
    const {show, setShow} = props
    const dispatch = useDispatch();
    const handleClose = () => {
        setShow(false);
        dispatch({type: USER_SINGLE_RESET})
        setDataModal({
            name: '',
            email: '',
            role: '',
            phone: '',
            password: '',
            passwordAgain: ''

        })  
    };
    const [dataModal, setDataModal] = useState({
        name: '',
        email: '',
        role: '',
        phone: '',
        password: '',
        passwordAgain: ''
    })
    const handleSubmit = e => {
        e.preventDefault();
        if(successUserSingle){
            dispatch(updateUser({ ...dataModal, userID }));
        }
        else{
            if(dataModal.password !== dataModal.passwordAgain){
                toast.error("Mật khẩu không khớp", ToastObjects);
                return;
            }
            dispatch(createUser(dataModal));
        }
    }
      
    const handelChangeModal = e =>{
        // e.preventDefault();
        setDataModal(prev => {
          return {
            ...prev, [e.target.name]: e.target.value
          }
        })
    }
    const createUserStatus = useSelector((state)=> state.userCreate)
    const { error: errorCreate, success } = createUserStatus

    const userEditing = useSelector((state)=> state.userSingle)
    const {success: successUserSingle, user: userEdit } = userEditing
    const userID = userEdit._id

    const userUpdated = useSelector((state)=> state.userUpdate) 
    const {error: errorUpdate, success: successUserUpdated} = userUpdated

    useEffect(()=>{
        if (errorCreate || errorUpdate){
            if(errorCreate){
                toast.error( errorCreate, ToastObjects);
                dispatch({type: USER_CREATE_RESET})
            }
            else{
                toast.error( errorUpdate, ToastObjects);
                dispatch({type: USER_UPDATE_RESET})
            }
            setShow(false)
        }
        if(success || successUserUpdated){
            if(successUserUpdated){
                toast.success(`Cập nhật thành công`, ToastObjects);
                dispatch({type: USER_UPDATE_RESET})
            }
            else{
                toast.success(`Thêm thành công`, ToastObjects);
                dispatch({type: USER_CREATE_RESET})
            }
            setDataModal({
                name: '',
                email: '',
                role: '',
                phone: '',
                password: '',
                passwordAgain: ''
            })
            dispatch(listUser())
            setShow(false)
        }
        if(successUserSingle){
            setDataModal({
                name: userEdit.name,
                phone: userEdit.phone,
                role: userEdit.role,
                email: userEdit.email,
            })
        }
    }, [success, dispatch, setShow, successUserSingle, successUserUpdated, userEdit, errorCreate, errorUpdate])

    const { name, email, role, phone, password, passwordAgain } = dataModal
    return (
      <>
        <Toast />
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title  id="contained-modal-title-vcenter">{successUserSingle ? `Cập nhật ${name}` : 'Thêm người dùng'}</Modal.Title>
          </Modal.Header>
          <Modal.Body  className="show-grid">
            <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tên tài khoản</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Nhập tên người dùng"
                                    autoFocus
                                    onChange={handelChangeModal}
                                    name="name"
                                    value={name}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    autoComplete="off"
                                    placeholder="name@example.com"
                                    onChange={handelChangeModal}
                                    name="email"
                                    value={email}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Label>Quyền</Form.Label>
                            <Form.Group>
                                <div>
                                    {
                                        initialItems.map((item, index) => {
                                            return <div key={index} className="form-check form-check-inline">
                                            <Form.Check
                                            type="radio"
                                            label={item.name}
                                            name="role"
                                            value={item.value}
                                            inline
                                            required
                                            checked={role === item.value}
                                            onChange={handelChangeModal}
                                            />
                                        </div>
                                        })
                                    }
                                </div>
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                 <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    autoComplete="off"
                                    placeholder="name@example.com"
                                    onChange={handelChangeModal}
                                    name="email"
                                    value={email}
                                    required
                                />
                            </Form.Group> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Nhập số điện thoại"
                                    onChange={handelChangeModal}
                                    name="phone"
                                    value={phone}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    autoComplete="new-password"
                                    onChange={handelChangeModal}
                                    name="password"
                                    value={password}
                                    required={successUserSingle ? false : true}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                    <Form.Label>Xác nhận mật khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        autoComplete="new-password"
                                        onChange={handelChangeModal}
                                        name="passwordAgain"
                                        value={passwordAgain}
                                        required={successUserSingle ? false : true}
                                    />
                                </Form.Group>
                            </Col>
                        </Row> 
                </Container>       
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button type='submit' variant="primary">
                    {successUserSingle ? 'Cập nhật' : 'Thêm'}
                </Button>
                </Modal.Footer>     
            </Form>
          </Modal.Body>
       
        </Modal>
      </>
    );
  }



  export default AddUser;