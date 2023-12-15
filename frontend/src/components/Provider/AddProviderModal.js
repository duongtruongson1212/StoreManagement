import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from "react";
import { createProvider, updateProvider } from '../../Redux/Actions/ProviderAction';
import { useDispatch, useSelector } from 'react-redux';
import { listProvider } from './../../Redux/Actions/ProviderAction';
import { toast } from "react-toastify";
import Toast from '../LoadingError/Toast';
import { PROVIDER_CREATE_RESET, PROVIDER_SINGLE_RESET, PROVIDER_UPDATE_RESET } from '../../Redux/Constants/ProviderConstants';
const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
const AddProvider = (props) => {    
    const {show, setShow} = props
    const dispatch = useDispatch();
    const handleClose = () => {
        setShow(false);
        dispatch({type: PROVIDER_SINGLE_RESET});
    };
    const [dataModal, setDataModal] = useState({
        name: '',
        contactName: '',
        taxCode: '',
        invoiceSymbol: '',
        phone: '',
        email: '',
        address: '',
    })

    const handleSubmit = e => {
        e.preventDefault();
        if(successProviderSingle){
            dispatch(updateProvider({ ...dataModal, providerID }));
        }
        else{
            dispatch(createProvider(dataModal));
        }
    }
      
    const handelChangeModal = e =>{
        e.preventDefault();
        setDataModal(prev => {
          return {
            ...prev, [e.target.name]: e.target.value
          }
        })
    }
    const createProviderStatus = useSelector((state)=> state.providerCreate)
    const {error: errorCreate, success } = createProviderStatus

    const providerEditing = useSelector((state)=> state.providerSingle)
    const {success: successProviderSingle, provider: providerEdit } = providerEditing
    const providerID = providerEdit._id

    const providerUpdated = useSelector((state)=> state.providerUpdate) 
    const {error: errorUpdate, success: successProviderUpdated} = providerUpdated

    useEffect(()=>{
        if (errorCreate || errorUpdate){
            if(errorCreate){
                toast.error( errorCreate, ToastObjects);
                dispatch({type: PROVIDER_CREATE_RESET})
            }
            else{
                toast.error( errorUpdate, ToastObjects);
                dispatch({type: PROVIDER_UPDATE_RESET})
            }
            setShow(false)
        }
        if(success || successProviderUpdated){
            if(successProviderUpdated){
                toast.success(`Cập nhật thành công`, ToastObjects);
                dispatch({type: PROVIDER_UPDATE_RESET})
            }
            else{
                toast.success(`Thêm thành công`, ToastObjects);
                dispatch({type: PROVIDER_CREATE_RESET})
            }
            setDataModal({
                name: '',
                contactName: '',
                taxCode: '',
                invoiceSymbol: '',
                phone: '',
                email: '',
                address: '',
            })
            dispatch(listProvider())
            setShow(false)
        }
        if(successProviderSingle){
            setDataModal({
                name: providerEdit.name,
                contactName: providerEdit.contactName,
                taxCode: providerEdit.taxCode,
                invoiceSymbol: providerEdit.invoiceSymbol,
                phone: providerEdit.phone,
                email: providerEdit.email,
                address: providerEdit.address,
            })
        }
    }, [success, dispatch, setShow, successProviderSingle, successProviderUpdated, providerEdit, errorCreate, errorUpdate])

    const { name, contactName, taxCode, invoiceSymbol, phone, email, address } = dataModal

    return (
      <>
        <Toast />
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title  id="contained-modal-title-vcenter">Thêm nhà cung cấp</Modal.Title>
          </Modal.Header>
          <Modal.Body  className="show-grid">
            <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col xs={12} md={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nhà cung cấp</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập nhà cung cấp"
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
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Người liên hệ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập người liên hệ"
                                        onChange={handelChangeModal}
                                        name="contactName"
                                        value={contactName}
                                        required
                                    />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Mã số thuế</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập mã số thuế"
                                    onChange={handelChangeModal}
                                    name="taxCode"
                                    value={taxCode}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Ký hiệu hóa đơn</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập ký hiệu"
                                    onChange={handelChangeModal}
                                    name="invoiceSymbol"
                                    value={invoiceSymbol}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    onChange={handelChangeModal}
                                    name="email"
                                    value={email}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
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
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    type="text"
                                    onChange={handelChangeModal}
                                    name="address"
                                    value={address}
                                    required
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
                        {successProviderSingle ? 'Cập nhật' : 'Thêm'}
                    </Button>
          </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }


  export default AddProvider;