import React from "react";
import {Link} from "react-router-dom";

const OrderDetailProducts=(props) => {
  const {order,loading}=props
  const {status}=order
  if(!loading) {
    const addDecimals=(num) => {
      return (Math.round(num*100)/100)
    }
    order.itemsPrice=addDecimals(
      order.orderItems.reduce((acc,item) => acc+item.price*item.qty*(1-item.discount/100),0)
    )
  }
  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{width: "40%"}}>Sản phẩm</th>
          <th style={{width: "20%"}}>Giá</th>
          <th style={{width: "20%"}}>Số lượng</th>
          <th style={{width: "20%"}} className="text-end">
            Tổng cộng
          </th>
        </tr>
      </thead>
      <tbody>
        {
          order.orderItems.map((item,index) => (
            <tr key={index}>
              <td>
                <Link className="itemside" to="#">
                  <div className="left">
                    <img
                      src={item.image?.slice(0,0+1)[0]}
                      alt={item.name}
                      style={{width: "40px",height: "40px"}}
                      className="img-xs"
                    />
                  </div>
                  <div className="info">
                    {item.name}
                  </div>
                </Link>
              </td>
              <td>{(item.price*(1-item.discount/100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
              <td>{item.qty}</td>
              <td className="text-end">{(item.price*item.qty*(1-item.discount/100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</td>
            </tr>
          ))
        }
        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Tổng tiền hàng:</dt> <dd>{order?.itemsPrice?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</dd>
              </dl>
              <dl className="dlist">
                <dt>Phí vận chuyển:</dt> <dd>{order.shippingPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</dd>
              </dl>
              <dl className="dlist">
                <dt>Vouncher:</dt> <dd>{order.taxPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</dd>
              </dl>
              <dl className="dlist">
                <dt>Điểm quy đồi:</dt> <dd>-{order.discountPoint.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</dd>
              </dl>
              <dl className="dlist">
                <dt>Tổng thanh toán:</dt>
                <dd>
                  <b className="h5">{order.totalPrice?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" đ"}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Trạng thái: </dt>
                <dd>
                  {
                    status[(status.length-1)].level==7||status[(status.length-1)].level==6? (
                      <span className="badge rounded-pill alert alert-success text-success">
                        {status[(status.length-1)].status}
                      </span>
                    ):status[(status.length-1)].level==0?
                      (
                        <span className="badge rounded-pill alert alert-success text-dark">
                          {status[(status.length-1)].status}
                        </span>
                      )
                      :
                      (
                        <span className="badge rounded-pill alert alert-success text-danger">
                          {status[(status.length-1)].status}
                        </span>
                      )
                  }
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
