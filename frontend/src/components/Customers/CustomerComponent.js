import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listCustomer,deleteCustomer } from "../../Redux/Actions/CustomerActions";
import {CUSTOMER_DELETE_RESET} from "../../Redux/Constants/CustomerConstants"
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import AddCustomer from "./AddCustomerModal";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import debounce from 'lodash.debounce';
import { Link, useHistory } from 'react-router-dom';
import { withAuthorization } from "../../util/withAuthorization ";
import { PERMISSIONS } from "../../util/RolesContanst";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CustomerComponent = (props) => {
  const dispatch = useDispatch();
  const customerList = useSelector(state => state.customerList);
  const customerDelete = useSelector(state => state.customerDelete)
  const {success: successDelete} = customerDelete

  const { loading, error, customers } = customerList 
  const [show, setShow] = useState(false);
  const [modalShow,setModalShow]=useState(false);
  const [dataModal,setDataModal]=useState();
  const usageTime=(date)=>{
    const createdAt = new Date(date);
    const now = new Date();
    const monthNumber=(now.getFullYear() - createdAt.getFullYear()) * 12 + (now.getMonth() - createdAt.getMonth())
    return monthNumber
  }



  const MyVerticallyCenteredModal=(props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="my-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Khóa tài khoản
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có muốn khóa tài khoản <span className="text-danger">{dataModal?.name}</span> ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-danger" onClick={() => {
                    dispatch(deleteCustomer(dataModal?._id))
                    setModalShow(false)
                }}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}
  const { pageNumber } = props
    const [keyword, setSearch] = useState()
    const history = useHistory()

    const callApiKeywordSearch = (keyword, pageNumber) =>{
        if( keyword.trim() !== ''){
          dispatch(listCustomer(keyword, pageNumber))
        }
        else{
          history.push('/customers');
        }
      }
    const debounceDropDown = useRef(debounce((keyword, pageNumber) => callApiKeywordSearch(keyword, pageNumber) , 300)).current;
    const handleSubmitSearch = e =>{
        setSearch(e.target.value)
        debounceDropDown(e.target.value, pageNumber);
      }
  const handleAdd = (e) =>{
    setShow(true)
  }
  useEffect(() => {
    dispatch((listCustomer()));
    if(successDelete) {
      dispatch({type: CUSTOMER_DELETE_RESET});
      toast.success("Đã khóa tài khoản khách hàng", ToastObjects);
      dispatch(listCustomer())
  }
  }, [dispatch,successDelete])
  
  return (
    <>
    <AddCustomer show={show} setShow={setShow}/>
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách khách hàng</h2>
        <div>
          {/* <Link to="#" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </Link> */}
            <button onClick={handleAdd} className="btn btn-primary">
              Tạo mới
            </button>
        </div>
      </div>

      <div className="card card-custom mb-4 shadow-sm">
        <header className="card-header bg-aliceblue ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="form-control"
                value={keyword}
                onChange={handleSubmitSearch}
              />
            </div>
          </div>
        </header>

        {/* Card */}
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <div className="card-body">
          {loading ? (<Loading />) : error ? (<Message variant="alert-danger" >{error}</Message>) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {
                customers.filter((customer) => !customer.isAdmin).map((customer, index) => (
                  new Date().getTime() < new Date(customer?.lockTo).getTime()?
                  <div className="col" key={index}>
                    <div className="card card-user shadow-sm">
                      <div className="card-header bg-danger opacity-70">
                      <div className="user-effect" >
                          <div className="user-effect-delete" onClick={e=>{
                            e.preventDefault();
                            setModalShow(true)
                            setDataModal(customer)
                          }} style={{pointerEvents:'none'}}><i className="far fa-lock" ></i></div>

                          <div className="user-effect-edit" onClick={e=>{
                            e.preventDefault();
                        
                            history.push(`/customer/${customer._id}`)
                            
                          }}><i className="fas fa-eye"></i></div>
                        </div>
                        
                        <img
                          className="img-md img-avatar"
                          src="images/tpone.png"
                          // src="https://tpone.vn/webinfo_files/images/57c57e30-461d-11ed-a701-9b027010aa3d--XMLID_92_.png"
                          alt="Customer pic"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mt-5">{customer.name}</h5>
                        <div className="card-text text-muted">
                          {// (now.getFullYear() - createdAt.getFullYear()) * 12 + (now.getMonth() - createdAt.getMonth())
                            usageTime(customer.createdAt)>12&&(customer?.totalOrder/usageTime(customer.createdAt)) >5 ? (
                              <p className="m-0 badge bg-danger" style={{fontSize: '16px'}}>{"Khách hàng thân thiết"}</p>
                            )
                            //:(customer?.totalOrder/usageTime(customer?.createdAt))>10?
                            :(customer?.totalOrder)>10?
                            (
                              <p className="m-0 badge bg-primary text-wrap" style={{minWidth: '4rem', fontSize: '16px'}}>{"Khách hàng tiềm năng"}</p>
                            )
                            //:(customer?.totalOrder/usageTime(customer?.createdAt))<=10&&(customer?.totalOrder/usageTime(customer?.createdAt))>0?
                            :(customer?.totalOrder)<=10&&(customer?.totalOrder)>0?
                            (
                              <p className="m-0 badge bg-success  text-wrap" style={{minWidth: '4rem', fontSize: '16px'}}>{"Khách hàng thường"}</p>
                            ):
                            (
                              <p className="m-0 badge bg-secondary text-wrap" style={{minWidth: '4rem', fontSize: '16px'}}>{"Khách hàng mới"}</p>
                            )
                          }
                          <h6 className="mt-2 card-title">{customer.phone}</h6>
                          <p style={{fontWeight: "bold"}}>
                            <a href={`mailto:${customer.email}`}>{customer.email}</a>
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  <div className="col" key={index}>
                    <div className="card card-user shadow-sm">
                      <div className="card-header">
                      <div className="user-effect">
                          <div className="user-effect-delete" onClick={e=>{
                            e.preventDefault();
                            setModalShow(true)
                            setDataModal(customer)
                          }}><i className="far fa-lock"></i></div>

                          <div className="user-effect-edit" onClick={e=>{
                            e.preventDefault();
                        
                            history.push(`/customer/${customer._id}`)
                            
                          }}><i className="fas fa-eye"></i></div>
                        </div>
                        
                        <img
                          className="img-md img-avatar"
                          src="images/tpone.png"
                          // src="https://tpone.vn/webinfo_files/images/57c57e30-461d-11ed-a701-9b027010aa3d--XMLID_92_.png"
                          alt="Customer pic"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mt-5">{customer.name}</h5>
                        <div className="card-text text-muted">
                          {// (now.getFullYear() - createdAt.getFullYear()) * 12 + (now.getMonth() - createdAt.getMonth())
                            usageTime(customer.createdAt)>12&&(customer?.totalOrder/usageTime(customer.createdAt)) >5 ? (
                              <p className="m-0 badge bg-danger" style={{fontSize: '16px'}}>{"Khách hàng thân thiết"}</p>
                            )
                            //:(customer?.totalOrder/usageTime(customer?.createdAt))>10?
                            :(customer?.totalOrder)>10?
                            (
                              <p className="m-0 badge bg-primary text-wrap" style={{minWidth: '4rem', fontSize: '16px'}}>{"Khách hàng tiềm năng"}</p>
                            )
                            //:(customer?.totalOrder/usageTime(customer?.createdAt))<=10&&(customer?.totalOrder/usageTime(customer?.createdAt))>0?
                            :(customer?.totalOrder)<=10&&(customer?.totalOrder)>0?
                            (
                              <p className="m-0 badge bg-success  text-wrap" style={{minWidth: '4rem', fontSize: '16px'}}>{"Khách hàng thường"}</p>
                            ):
                            (
                              <p className="m-0 badge bg-secondary text-wrap" style={{minWidth: '4rem', fontSize: '16px'}}>{"Khách hàng mới"}</p>
                            )
                          }
                          <h6 className="mt-2 card-title">{customer.phone}</h6>
                          <p style={{fontWeight: "bold"}}>
                            <a href={`mailto:${customer.email}`}>{customer.email}</a>
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }

            </div>
          )}
        </div>
      </div>
    </section>
    </>

  );
};

export default withAuthorization(CustomerComponent,[PERMISSIONS.isSaleAgent.access_customer]);
