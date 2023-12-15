
import React, { useState, useEffect, useRef } from "react";
import Orders from "./Orders";
import {useDispatch, useSelector} from 'react-redux'
import debounce from "lodash.debounce";
import {searchD2DListOrder} from "../../Redux/Actions/OrderActions"
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error'
import renderToast from '../../util/Toast'
const OrderMain = () => {
  //const orderList = useSelector(state => state.orderList)
  //const { loading, error, orders } = orderList;

  const dispatch = useDispatch()

  const orderSearchD2DList = useSelector(state => state.orderSearchD2DList)
  const { loading,error, orders:ordersSearch,success:successSearch } = orderSearchD2DList;


  const productList = useSelector(state => state.productList)
  const { products} = productList
  
  const [ isStop , setIsStop ] = useState(false)
  const [toggleSearch, setToggleSearch] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [data, setData] = useState({
    from: '',
    to: ''
  })
  const [orders,setOrders] = useState([])
  const {from,to} = data
  
  const [keyword, setSearch] = useState()

  const callApiKeywordSearch = (keyword, from, to) =>{
      dispatch(searchD2DListOrder(keyword, from, to))
  }
  const debounceDropDown = useRef(debounce((keyword, from, to) => callApiKeywordSearch(keyword, from, to) , 300)).current;

  const handleSubmitSearch = e =>{
    e.preventDefault()
    setSearch(e.target.value)
    debounceDropDown(e.target.value, data.from, data.to);
  }

  const handleChange = e =>{
    e.preventDefault();
    setData(prev => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
    if(toggleSearch) dispatch(searchD2DListOrder(data.from,data.to))   
  }
  const handleSearchDate = (e) =>{
    e.preventDefault();
    if(!toggleSearch){
      if(!data.from || !data.to){
        if(!isStop){
          renderToast('Chua chọn ngày','error', setIsStop, isStop)
        }
        return;
      }
      setData({
        from: data.from,
        to: data.to
      })
    }
    else{//nút cancel->click
      setData({
        from: '',
        to: ''
      })
      
      dispatch(searchD2DListOrder (keyword,'',''))
    }
    setToggleSearch(!toggleSearch)
    setIsSearch(!isSearch)
  }
  useEffect(()=>{
    if(successSearch)
       setOrders(ordersSearch)
    
  },[successSearch])

  useEffect(()=>{
    if(toggleSearch)
      dispatch(searchD2DListOrder(keyword,data.from,data.to))   
  },[data,toggleSearch])
  useEffect(()=>{
    dispatch(searchD2DListOrder(keyword,data.from,data.to))   
  },[])


  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách đơn đặt hàng</h2>
      </div>

      <div className="card card-custom mb-4 shadow-sm">
        <header className="card-header bg-aliceblue">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Tìm kiếm đơn đặt hàng..."
                className="form-control p-2"
                onChange={handleSubmitSearch}
              />
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <div className="d-flex">
                <span className="label-date">Từ: </span>
                <input
                    id="datePicker"
                    name="from"
                    value={from}
                    className="form-control"
                    type='date'
                    onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <div className="d-flex">
                <span className="label-date">Ðến: </span>
                <input
                    id="datePicker"
                    name="to"
                    value={to}
                    className="form-control"
                    type='date'
                    onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="col-lg-1">
              {toggleSearch ? 
                <button className="btn btn-danger" onClick={handleSearchDate}>Hủy</button>
              : 
                <button className="btn btn-success" onClick={handleSearchDate}>Tìm</button>
              }
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {
              loading ? (<Loading />) : error ? (<Message>{error}</Message>)
                :
                <Orders orders={ordersSearch} />
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
