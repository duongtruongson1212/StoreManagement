import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { singleCustomer } from "../../Redux/Actions/CustomerActions";
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import AddCustomer from "./AddCustomerModal";
import { useHistory } from 'react-router-dom';
import ProfileTabs from "./Profile";
import Orders from "./Orders";


const CustomerDetailMain = (props) => {
  const {customerId} = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { customer } = useSelector(state => state.customerSingle);

  const {orders}=useSelector(state => state.orderList)
  const orderFilter= orders?.filter(item => item?.user?._id === customerId)




  useEffect(() => {
    dispatch(singleCustomer(customerId))
    
  }, [dispatch])

  const nameRole =  (role) => {
    if(role === "isAdmin"){
      return "Quản trị viên"
    }
    else if(role === "isInventory"){
      return "Nhân viên kho"
    }
    else if(role === "isSaleAgent"){
      return "Nhân viên bán hàng"
    }
  }

  return (
    <>
    <section className="content-main">
      <div className="content-header">
        <button  className="btn btn-dark text-white" onClick={(e)=>{
          e.preventDefault()
          history.push('/customers')
        }}>
          Quay về
        </button>
        <h2 className="content-title">Chi tiết khách hàng</h2>
        <div>
          
        </div>
      </div>

      <div className="card card-custom mb-4 shadow-sm">
        <div className="card-body">
          <div className="row align-items-start" style={{padding: "10px 20px"}}>
            <div className="col-lg-4 p-0 shadow ">
              <div className="author-card pb-0 pb-md-3 wizard">
                <div className="author-card-cover"></div>
                <div className="author-card-profile row nav button ">
                  <div className="author-card-avatar col-md-5">
                    <img src={`http://localhost:${process.env.REACT_PORT}/images/user.png`} alt="userprofileimage" />
                  </div>
                  <div className="author-card-details col-md-7">
                    <h5 className="author-card-name mb-2">
                      <strong>{customer?.name}</strong>
                    </h5>
                    <span className="author-card-position">
                      <>Ngày đăng kí {moment(customer?.createdAt).format('LL')}</>
                      <p >Coin : {(customer?.pCoin)?.toFixed(2)}</p>
                    </span>
                  </div>
                </div>
              </div>
              <div className="wizard pt-3 ">
                <div className="d-flex align-items-start">
                  <div
                    className="nav align-items-start flex-column col-12 nav-pills me-3 "
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      className="nav-link active"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      Cập nhật thông tin
                    </button>
                    <button
                      className="nav-link d-flex justify-content-between"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      Danh sách đơn hàng
                      <span className="badge2">{orderFilter?orderFilter.length:0}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* panels */}
            <div
              className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
              id="v-pills-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <ProfileTabs customerId={customerId}/>
              </div>
              <div
                className="tab-pane fade "
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <Orders orders={orderFilter}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>

  );
};

export default CustomerDetailMain
