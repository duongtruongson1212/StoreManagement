import React from "react";
import { Link } from "react-router-dom";
import Loading from './../LoadingError/Loading';
import Message from './../LoadingError/Error';
import moment from "moment/moment";
const LatestOrder = (props) => {
  const {loading, error, orders} = props
  return (
    <div className="card-body bg-white" >
      <h5 className="card-title">Đơn đặt hàng gần đây</h5>
      {
        loading ? <Loading/> : error ? <Message variant="alert-danger">{error}</Message> : (
          <div className="table-responsive">
            <table className="table">
              <tbody>
                {
                  orders?.slice(0,5).map((order, index)=>(
                    <tr key={index}>
                      <td>
                        <b>{order?.user?.name}</b>
                      </td>
                      <td>{order?.user?.email || '---'}</td>
                      <td>{order?.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ" || '---'}</td>
                      <td>{
                          order.isSuccess ? (
                            <span className="badge rounded-pill alert-success">Đã hoàn tất {moment(order.receivedAt).format("MMM Do YY")}</span>
                          ) : 
                          (
                            <span className="badge rounded-pill alert-danger">Chưa hoàn tất</span>
                          ) 
                        }
                      </td>
                      <td>{moment(order.createdAt).calendar()}</td>
                      <td className="d-flex justify-content-end align-item-center">
                        <Link to={`/order/${order._id}`} className="text-success">
                          <i className="fas fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
};

export default LatestOrder;
