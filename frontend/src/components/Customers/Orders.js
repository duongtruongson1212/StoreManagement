import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "../../Redux/Actions/OrderActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { ORDER_LIST_RESET } from "../../Redux/Constants/OrderConstants";
const Orders = (props) => {
  const {orders}=props
  
  const dispatch = useDispatch();
  const history = useHistory()

  let createList=[]
  let conformList=[]
  let deliveredList=[]
  let successList=[]
  let cancelList=[]
  orders?.map(item=>{
    if(!item.isComformed&&!item.isDelivered&&!item.isReceived&&!item.isSuccess&&!item.isCanceled){
      createList.push(item)
    }
    else if(item.isComformed&&!item.isDelivered&&!item.isReceived&&!item.isSuccess&&!item.isCanceled){
      conformList.push(item)
    }
    else if(item.isComformed&&item.isDelivered&&!item.isReceived&&!item.isSuccess&&!item.isCanceled){
      deliveredList.push(item)
    }
    else if(item.isComformed&&item.isDelivered&&item.isDelivered&&item.isReceived&&item.isSuccess&&!item.isCanceled){
      successList.push(item)
    }else{
      cancelList.push(item)
    }
  })
  
  const handleClick = (e,order) => {
    e.preventDefault()
    history.push(`/order/${order._id}`)
    dispatch({type: ORDER_LIST_RESET})
  }

  return (

    <>
    
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button class="nav-link active" id="nav-create-tab" data-bs-toggle="tab" data-bs-target="#nav-create" type="button" role="tab" aria-controls="nav-create" aria-selected="true" >
          <OverlayTrigger
            key={"top"}
            placement={"top"}
            overlay={
              <Tooltip id={`tooltip-${"top"}`}>
                Chờ <strong>{"xác nhận"}</strong>.
              </Tooltip>
            }
          >
          <i class='far fa-clipboard'></i>
          </OverlayTrigger>
        </button>
        <button class="nav-link" id="nav-conform-tab" data-bs-toggle="tab" data-bs-target="#nav-conform" type="button" role="tab" aria-controls="nav-conform" aria-selected="true">
          
          <OverlayTrigger
            key={"top"}
            placement={"top"}
            overlay={
              <Tooltip id={`tooltip-${"top"}`}>
                Đang <strong>{"xử lý"}</strong>.
              </Tooltip>
            }
          >
          <i class='fas fa-archive'></i>
          </OverlayTrigger>
        
        </button>
        <button class="nav-link" id="nav-delivered-tab" data-bs-toggle="tab" data-bs-target="#nav-delivered" type="button" role="tab" aria-controls="nav-delivered" aria-selected="false">
          <OverlayTrigger
              key={"top"}
              placement={"top"}
              overlay={
                <Tooltip id={`tooltip-${"top"}`}>
                  Đang <strong>{"vận chuyển"}</strong>.
                </Tooltip>
              }
            >
            <i class='fas fa-truck'></i>
          </OverlayTrigger>
        </button>
        <button class="nav-link" id="nav-success-tab" data-bs-toggle="tab" data-bs-target="#nav-success" type="button" role="tab" aria-controls="nav-success" aria-selected="false">
          <OverlayTrigger
              key={"top"}
              placement={"top"}
              overlay={
                <Tooltip id={`tooltip-${"top"}`}>
                  Đã <strong>{"hoàn tất"}</strong>.
                </Tooltip>
              }
            >
            <i class='fas fa-tasks'></i>
          </OverlayTrigger>
        </button>
        <button class="nav-link" id="nav-cancel-tab" data-bs-toggle="tab" data-bs-target="#nav-cancel" type="button" role="tab" aria-controls="nav-cancel" aria-selected="false">
          <OverlayTrigger
              key={"top"}
              placement={"top"}
              overlay={
                <Tooltip id={`tooltip-${"top"}`}>
                  Đơn <strong>{"đã hủy"}</strong>.
                </Tooltip>
              }
            >
            <i class='far fa-trash-alt'></i>
          </OverlayTrigger>
        </button>

      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="nav-create" role="tabpanel" aria-labelledby="nav-create-tab" tabindex="0">
      {
        <div className="d-flex justify-content-center align-items-center flex-column">
          {
            
              createList && createList.length === 0 ? (<div className="col-12 alert alert-info text-center mt-3">
                Không có đơn đặt hàng nào
                
              </div>) :
                (
                  <div className="table-responsive w-100">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>TRẠNG THÁI</th>
                          <th>NGÀY ĐẶT</th>
                          <th>ĐƠN GIÁ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          createList.map((order, index) => (
                          <tr key={index} className={`link ${order.isSuccess ? "alert-success" : "alert-danger"}`} 
                              onClick={(e)=> handleClick(e,order)}>
                              <td>{index + 1}</td>
                              <td>{order.status[order.status.length-1].status}</td>
                              <td>{moment(order.createdAt).calendar()}</td>
                              <td>{order.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                )
          }
          
        </div>
      }
      </div>
      <div class="tab-pane fade" id="nav-conform" role="tabpanel" aria-labelledby="nav-conform-tab" tabindex="0">
      {
        <div className="d-flex justify-content-center align-items-center flex-column">
          {
            
              conformList && conformList.length === 0 ? (<div className="col-12 alert alert-info text-center mt-3">
                Không có đơn đặt hàng nào
                
              </div>) :
                (
                  <div className="table-responsive w-100">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>TRẠNG THÁI</th>
                          <th>NGÀY ĐẶT</th>
                          <th>ĐƠN GIÁ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          conformList.map((order, index) => (
                          <tr key={index} className={`link ${order.isSuccess ? "alert-success" : "alert-danger"}`} 
                              onClick={(e)=> handleClick(e,order)}>
                              <td>{index + 1}</td>
                              <td>{order.status[order.status.length-1].status}</td>
                              <td>{moment(order.createdAt).calendar()}</td>
                              <td>{order.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                )
          }
          
        </div>
      }
      </div>
      <div class="tab-pane fade" id="nav-delivered" role="tabpanel" aria-labelledby="nav-delivered-tab" tabindex="0">
      {
        <div className="d-flex justify-content-center align-items-center flex-column">
          {
            
              deliveredList && deliveredList.length === 0 ? (<div className="col-12 alert alert-info text-center mt-3">
                Không có đơn đặt hàng nào
                
              </div>) :
                (
                  <div className="table-responsive w-100">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>TRẠNG THÁI</th>
                          <th>NGÀY ĐẶT</th>
                          <th>ĐƠN GIÁ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          deliveredList.map((order, index) => (
                          <tr key={index} className={`link ${order.isSuccess ? "alert-success" : "alert-danger"}`} 
                              onClick={(e)=> handleClick(e,order)}>
                              <td>{index + 1}</td>
                              <td>{order.status[order.status.length-1].status}</td>
                              <td>{moment(order.createdAt).calendar()}</td>
                              <td>{order.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                )
          }
          
        </div>
      }
      </div>
      <div class="tab-pane fade" id="nav-success" role="tabpanel" aria-labelledby="nav-success-tab" tabindex="0">
      {
        <div className="d-flex justify-content-center align-items-center flex-column">
          {
            
              successList && successList.length === 0 ? (<div className="col-12 alert alert-info text-center mt-3">
                Không có đơn đặt hàng nào
                
              </div>) :
                (
                  <div className="table-responsive w-100">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>TRẠNG THÁI</th>
                          <th>NGÀY ĐẶT</th>
                          <th>ĐƠN GIÁ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          successList.map((order, index) => (
                          <tr key={index} className={`link ${order.isSuccess ? "alert-success" : "alert-danger"}`} 
                              onClick={(e)=> handleClick(e,order)}>
                              <td>{index + 1}</td>
                              <td>{order.status[order.status.length-1].status}</td>
                              <td>{moment(order.createdAt).calendar()}</td>
                              <td>{order.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                )
          }
          
        </div>
      }
      </div>
      <div class="tab-pane fade" id="nav-cancel" role="tabpanel" aria-labelledby="nav-cancel-tab" tabindex="0">
      {
        <div className="d-flex justify-content-center align-items-center flex-column">
          {
            
              cancelList && cancelList.length === 0 ? (<div className="col-12 alert alert-info text-center mt-3">
                Không có đơn đặt hàng nào
                
              </div>) :
                (
                  <div className="table-responsive w-100">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>TRẠNG THÁI</th>
                          <th>NGÀY ĐẶT</th>
                          <th>ĐƠN GIÁ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          cancelList.map((order, index) => (
                          <tr key={index} className={`link ${order.isSuccess ? "alert-success" : "alert-danger"}`} 
                              onClick={(e)=> handleClick(e,order)}>
                              <td>{index + 1}</td>
                              <td>{order.status[order.status.length-1].status}</td>
                              <td>{moment(order.createdAt).calendar()}</td>
                              <td>{order.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                )
          }
          
        </div>
      }   
      </div>
    </div>
    </>
  );
};

export default Orders;
