import React, { useEffect ,useState} from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listOrder,getOrderDetails,getOrderConform ,getOrderCanceled,getOrderReceived,getOrderCompleted} from "../../Redux/Actions/OrderActions";
import { getOrderDelivered } from '../../Redux/Actions/OrderActions';
import printReport from "../Orders/PrintReport";
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment/moment';

import Toast from "./../LoadingError/Toast";
import { toast } from "react-toastify";

const OrderDetailMain = (props) => {
  const {orderId} = props;
  const dispatch = useDispatch()
  const orderList = useSelector((state)=> state.orderList)

  const orderDetail = useSelector((state)=> state.orderDetail)
  const {loading, error, orderItems} = orderDetail

  const orderDelivered = useSelector((state)=> state.orderDelivered)
  const {loading: loadingDelivered, success: successDelivered} = orderDelivered

  const orderCanceled = useSelector((state)=> state.orderCanceled)
  const {loading: loadingCanceled, success: successCanceled} = orderCanceled

  const orderReceived = useSelector((state)=> state.orderReceived)
  const {loading: loadingReceived, success: successReceived} = orderReceived

  const orderConform = useSelector((state)=> state.orderConform)
  const {loading: loadingConform, success: successConform} = orderConform

  const orderCompleted = useSelector((state)=> state.orderCompleted)
  const {loading: loadingCompleted, success: successCompleted} = orderCompleted

  const [modalShow,setModalShow]=useState(false);
  const [reportShow, setReportShow] = useState(false);
  const [dataModal, setDataModal] = useState();

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
                        Xác nhận hủy đơn
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bạn có chắc muốn hủy đơn <span className="text-danger">{" "+orderItems?._id}</span> ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-danger" onClick={(e) => {
                        canceledHanlder(e)
                        setModalShow(false)
                    }}>OK</Button>
                </Modal.Footer>
            </Modal>
        );
  }

  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };



  useEffect(()=>{
    dispatch(getOrderDetails(orderId))
    dispatch(listOrder())

    if(successCanceled){
      toast.success("Đã hủy đơn hàng", ToastObjects)
    }
    if(successConform){
      toast.success("Đã xác nhận đơn hàng", ToastObjects)
    }
    if(successDelivered){
      toast.success("Đơn hàng đã được vận chuyển", ToastObjects)
    }
    if(successCompleted){
      toast.success("Đơn hàng đã hoàn tất", ToastObjects)
    }
    if(reportShow){
      printReport(dataModal)
      setReportShow(false)
      setDataModal(null)
    }
  },[dispatch, orderId, successDelivered,successCanceled,successReceived,successConform,modalShow,successCompleted,reportShow])
  
  const deliveredHanlder = ((e)=>{ 
    e.preventDefault()
    dispatch(getOrderDelivered(orderItems))
  })
  const completedHanlder = ((e)=>{ 
    e.preventDefault()
    dispatch(getOrderCompleted(orderItems))
  })
  const conformHanlder = ((e)=>{ 
    e.preventDefault()
    dispatch(getOrderConform(orderItems))
  })
  const canceledHanlder = ((e)=>{ 
    e.preventDefault()
    dispatch(getOrderCanceled(orderItems))
  })

  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white">
          Quay về danh sách đơn đặt hàng
        </Link>
      </div>
      <Toast />
      
      <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
      />
      { loading ? <Loading/> : error ? <Message variant="alert-danger">{error}</Message> : (
        
        <div className="card">
        <header className="card-header p-3 Header-green">
          <div className="row align-items-center ">
            <div className="col-lg-6 col-md-6">
              <span>
                <i className="far fa-calendar-alt mx-2"></i>
                <b className="text-white">
                  {moment(orderItems.createdAt).format("llll")}
                </b>
              </span>
              <br />
              <small className="text-white mx-3 ">
                ID đơn đặt hàng: {orderItems._id}
              </small>
            </div>
            <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
              <select
                className="form-select d-inline-block"
                style={{ maxWidth: "200px" }}
              >
                <option>Change status</option>
                <option>Awaiting payment</option>
                <option>Confirmed</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
              <button className="btn btn-success ms-2"
                onClick={(e)=>{
                  e.preventDefault()
                  setReportShow(true)
                  setDataModal(orderItems)
                }}
              >
                <i className="fas fa-print"></i>
              </button>
            </div>
          </div>
        </header>
        <div className="card-body">
          {/* Order info */}
          <OrderDetailInfo order={orderItems}/>
          

          <div className="row">
            <div className="col-lg-9">
              <div className="table-responsive">
                <OrderDetailProducts order={orderItems} loading={loading}/>
              </div>
            </div>
            {/* Payment Info */}
            <div className="col-lg-3">
              <div className="box shadow-sm bg-light">
                {
                  orderItems.isComformed?
                  <>
                    {
                      orderItems.isComformed? (
                        <button className="btn btn-success col-12 mt-2">
                          {`ĐÃ XÁC NHẬN  ${moment(orderItems.conformedAt).format("MMM Do YY")}`}
                        </button>
                      ) :
                        <>
                          {loadingConform && <Loading/>}
                          <button onClick={conformHanlder} className="btn btn-dark col-12 user-select-none mt-2">
                            XÁC NHẬN ĐƠN HÀNG
                          </button>
                        </>        
                    }
                    {
                      (orderItems.isDelivered && orderItems.isPaid)||(orderItems.isDelivered && orderItems.paymentMethod=="COD") ? (
                        <button className="btn btn-success col-12 mt-2">
                          {`ĐÃ GIAO ${moment(orderItems.isDeliveredAt).format("MMM Do YY")}`}
                        </button>
                      ) : !orderItems.isPaid&& orderItems.paymentMethod=="COD"?
                          <>
                            <div className="btn btn-success col-12 pe-none mt-2"> 
                              TRẢ SAU
                            </div>
                          </>
                          :
                          !orderItems.isPaid&& orderItems.paymentMethod=="Paypal" ? (
                            <>
                              <div className="btn btn-danger col-12 pe-none mt-2"> 
                                CHƯA TRẢ
                              </div>
                            </>
                          ) : ""
                                         
                    }
                    {
                      orderItems.isComformed&&orderItems.isPaid&&!orderItems.isDelivered||
                      orderItems.isComformed&&!orderItems.isPaid&&orderItems.paymentMethod=="COD"&&!orderItems.isDelivered?
                        <>
                          {loadingDelivered && <Loading/>}
                          <button onClick={deliveredHanlder} className="btn btn-dark col-12 user-select-none mt-2">
                            VẬN CHUYỂN
                          </button>
                        </>
                        :""
                    }
                    {
                      orderItems.isReceived?""
                      :
                      <>
                        {
                          orderItems.isDelivered&&orderItems.isCanceled? (
                            <button className="btn btn-success col-12 mt-2">
                              {`ĐÃ HỦY  ${moment(orderItems.canceledAt).format("MMM Do YY")}`}
                            </button>
                          ) :orderItems.isDelivered&&!orderItems.isCanceled?
                            <>
                              {loadingCanceled && <Loading/>}
                              <button onClick={(e)=>{e.preventDefault();setModalShow(true)}} className="btn btn-dark col-12 user-select-none mt-2">
                                HỦY ĐƠN
                              </button>
                            </>   
                            :""     
                        }
                      </>
                    }

                  </>
                  
                  :
                  <>
                    {
                        orderItems.isComformed? (
                          <button className="btn btn-success col-12 mt-2">
                            {`ĐÃ XÁC NHẬN  ${moment(orderItems.conformedAt).format("MMM Do YY")}`}
                          </button>
                        ) :
                          <>
                            {loadingConform && <Loading/>}
                            <button onClick={conformHanlder} className="btn btn-dark col-12 user-select-none mt-2">
                              XÁC NHẬN ĐƠN HÀNG
                            </button>
                          </>        
                      }
                  </>
                }
                {
                  (orderItems.isReceived)? (
                    <button className="btn btn-success col-12 mt-2">
                      {`ĐÃ NHẬN HÀNG ${moment(orderItems.receivedAt).format("MMM Do YY")}`}
                    </button>
                  ) :""
                     
                }
                {
                    orderItems.isReceived&&orderItems.isSuccess? (
                      <button className="btn btn-success col-12 mt-2">
                        {`ĐÃ HOÀN TẤT  ${moment(orderItems.conformedAt).format("MMM Do YY")}`}
                      </button>
                    ) :"" 
                  }
                  {
                    orderItems.isReceived&&!orderItems.isSuccess?
                    <>
                      <button onClick={completedHanlder} className="btn btn-dark col-12 user-select-none mt-2">
                        HOÀN TẤT ĐƠN HÀNG
                      </button>
                    </>
                    :""    
                  }
              </div>

              
            </div>
          </div>
        </div>
      </div>
      )}
    </section>
  );
};

export default OrderDetailMain;
