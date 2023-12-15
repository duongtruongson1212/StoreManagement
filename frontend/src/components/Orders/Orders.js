import React from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
// import {useSelector} from 'react-redux'
const Orders = (props) => {
  const { orders } = props
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Tên</th>
          <th scope="col">Email</th>
          <th scope="col">Tổng cộng</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Ngày đặt</th>
          <th>Trạng thái</th>
          <th scope="col" className="text-end">
            Chi tiết
          </th>
        </tr>
      </thead>
      <tbody>
        {
          orders?.map((order, index) => (
            <tr key={index}>
              <td>
                <b>{order?.user?.name}</b>
              </td>
              <td>{order?.user?.email}</td>
              <td style={{textAlign:'right'}}>{order?.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
              <td>{
                  order.isPaid ? (
                    <span className="badge rounded-pill alert-success">Trả ngày {moment(order.paidAt).format("MMM Do YY")}</span>
                  ) : 
                  (
                    <span className="badge rounded-pill alert-danger">Chưa trả</span>
                  ) 
                }
              </td>
              <td>{moment(order.createdAt).format("MMM Do YY")}</td>
              <td>{
                  order.isDelivered ? (
                    <span className="badge btn-success">Đã vận chuyển</span>
                  ) : 
                  (
                    <span className="badge btn-dark">Chưa vận chuyển</span>
                  ) 
                }
              </td>
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
  );
};

export default Orders;
