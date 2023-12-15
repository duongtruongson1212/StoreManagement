import React from "react";
import { Link } from "react-router-dom";
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import moment from "moment/moment";
const OrderStatistics = (props) => {
  const {loading, error, orders} = props
  
  
  let _orders = []
  orders?.map(item=>item?.orderItems)?.map(item=>{
    _orders.push(...item)
  })

// Define an object to keep track of the total quantity for each name.
const nameToQty = {}
const nameToSellNum = {}
const filteredOrders = []

// Loop through the orders array and filter the fields.
for (const order of _orders) {
  const { drugstoreId, name, qty } = order//tạo fomat mới 
  if (name in nameToQty) {//name thuộc mảng -> cọng dồn
    nameToQty[name] += qty
    nameToSellNum[name] += 1
  } else {
    nameToQty[name] = qty
    nameToSellNum[name] = 1
  }
  filteredOrders.push({ drugstoreId, name, qty })//tạo mảng mới theo fomat mới
}

// Sum the quantity values for duplicated names and set sellNum to the total number of times the name appears.
const finalOrders = []
for (const order of filteredOrders) {
  const { drugstoreId, name } = order
  const qty = nameToQty[name]
  const sellNum = nameToSellNum[name]
  if (qty > 0) {
    finalOrders.push({ drugstoreId, name, qty, sellNum })
    nameToQty[name] = 0
  }
}

// Log the final orders array.
  return (
    <div className="card-body bg-white">
      <h5 className="card-title">Thống kê sản phẩm bán ra</h5>
      {
        loading ? <Loading/> : error ? <Message variant="alert-danger">{error}</Message> : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Số lượng mua</th>
                  <th scope="col">Số đơn mua</th>
                </tr>
              </thead>
              <tbody>
                {
                  finalOrders.length!=0?finalOrders?.map((order, index)=>(
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>
                        <b>{order?.name}</b>
                      </td>
                      <td>{order?.qty+" (sp)" || '---'}</td>
                      <td>{order?.sellNum+" (đơn)" || '---'}</td>
                      
                    </tr>
                  )):<p>Không có  bản ghi</p>
                }
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
};

export default OrderStatistics;
