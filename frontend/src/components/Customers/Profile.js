import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {singleCustomer,changeProfile,updateCustomerProfile } from "../../Redux/Actions/CustomerActions";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Toast from "../LoadingError/Toast";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import renderToast from "../../util/Toast";
import { CUSTOMER_CHANGE_RESET } from "../../Redux/Constants/CustomerConstants";

const ProfileTabs = (props) => {

    const {customerId} =props
    const dispatch = useDispatch();



    

  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  })
  const [dataModal, setDataModal] = useState({
    emailModal: '',
    passModal: '',
  })
  const { emailModal, passModal } = dataModal
  const [ isStop , setIsStop ] = useState(false)
  const { name, email, phone, password, passwordConfirm } = data;
  const handelChange = e => {
    e.preventDefault();
    setData(prev => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }
  const handelChangeModal = e =>{
    e.preventDefault();
    setDataModal(prev => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }
  const { loading, error, customer } = useSelector(state => state.customerSingle);
  const { loading: loadingUpdate} = useSelector(state => state.customerUpdateProfile);
  //const { loading: loadingChange, error: errorChange, success: successChange, info } = useSelector(state => state.customerChangeProfile);


  const handleClose = () => setShow(false);
  const handleSubmit = e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      if(!isStop){
        renderToast('Mật khẩu không khớp','error', setIsStop, isStop)
        return;
      }
    }
    else{
      dispatch(updateCustomerProfile(data,customerId));
      if(!isStop){
        renderToast('Thông tin đã được cập nhật','success', setIsStop, isStop)
        setData({
          password: '',
          passwordConfirm: ''
        })
        dispatch({type: CUSTOMER_CHANGE_RESET})
      }
    }
  }

  useEffect(() => {
    dispatch({type: CUSTOMER_CHANGE_RESET})
    if (customer) {
      setData({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        password: '',
        passwordConfirm: '',
      })
    }
  }, [dispatch, customer])
  useEffect(()=>{
    dispatch(singleCustomer(customerId))
  },[dispatch])
  
  return (
    <>
      <Toast />
      {
        loading ? (<Loading/>) : error ? (<Message>{error}</Message>) : ''
      }
      {
        loadingUpdate && (<Loading/>)
      }
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác thực tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                autoComplete="new-password"
                onChange={handelChangeModal}
                name="emailModal"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoComplete="new-password"
                autoFocus
                onChange={handelChangeModal}
                name='passModal'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button variant="primary" onClick={(e)=>{
            e.preventDefault();
            if(emailModal !== email){
              if(!isStop){
                renderToast('Email does not match','error', setIsStop, isStop)
                return;
              }
            }
            else{
              dispatch(changeProfile({emailModal, passModal}))
              setShow(false);
            }
          }}>
            Xác thực
          </Button>
        </Modal.Footer>
      </Modal>
      <form className="row  form-container" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">Tên đăng nhập</label>
            <input onChange={handelChange} value={name} name="name" className="form-control" type="text" autoComplete="off" disabled={ false}  required/>
          </div>
        </div>  

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">Địa chỉ E-mail</label>
            <input onChange={handelChange} value={email} name="email" className="form-control" type="email" autoComplete="off" disabled required/>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-phone">Điện thoại</label>
            <input onChange={handelChange} value={phone} name="phone" className="form-control" type="phone" autoComplete="off" disabled={ false }  required/>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Mật khẩu mới</label>
            <input onChange={handelChange} name="password" value={password} className="form-control" type="password" autoComplete="new-password" disabled={ false } />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Xác nhận lại mật khẩu</label>
            <input onChange={handelChange} name="passwordConfirm" value={passwordConfirm} className="form-control" type="password" autoComplete="new-password" disabled={ false} />
          </div>
        </div>
        <button className= "btn btn-warning" type="submit">Cập nhật</button>
      </form>
    </>
  );
};

export default ProfileTabs;
