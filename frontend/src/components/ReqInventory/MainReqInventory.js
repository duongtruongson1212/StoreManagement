import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Message from '../LoadingError/Error';
import debounce from "lodash.debounce";
import ReqInventory from "./ReqInventory";
import { listReqInventory } from "../../Redux/Actions/RequestInventoryAction";
import Toast from './../LoadingError/Toast';
import { toast } from "react-toastify";
import renderToast from "../../util/Toast";
import { SetOHNotification } from "../../Redux/Actions/NotificationAction";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const MainReqInventory = (props) => {
  const { pageNumber } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const [ isStop , setIsStop ] = useState(false)
  const [keyword, setSearch] = useState()
  const [toggleSearch, setToggleSearch] = useState(false)
  const [data, setData] = useState({
    from: '',
    to: ''
  })
  const {from,to} = data
  
  const reqInventoryList = useSelector(state=> state.reqInventoryList)
  const { loading, error, reqInventory } = reqInventoryList

  const updateStatus = useSelector(state => state.reqInventoryStatus)
  const {loading: loadingStatus, error: errorStatus, success} = updateStatus

  const cancelReq = useSelector(state => state.reqInventoryCancel)
  const {error: errorCancel} = cancelReq

  const callApiKeywordSearch = (keyword, pageNumber, from, to) =>{
      dispatch(listReqInventory(keyword, pageNumber, from, to))
  }
  const debounceDropDown = useRef(debounce((keyword, pageNumber, from, to) => callApiKeywordSearch(keyword, pageNumber, from, to) , 300)).current;

  const handleSubmitSearch = e =>{
    e.preventDefault()
    setSearch(e.target.value)
    debounceDropDown(e.target.value, pageNumber, data.from, data.to);
  }

  const handleAdd = (e) =>{
    e.preventDefault();
    history.push('/req-inventory/add');
    dispatch(SetOHNotification([]))
  }

  const handleChange = e =>{
    e.preventDefault();
    setData(prev => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }
  const handleSearchDate = (e) =>{
    e.preventDefault();
    if(!toggleSearch){
      if(!data.from || !data.to){
        if(!isStop){
          renderToast('Chưa chọn ngày','error', setIsStop, isStop)
        }
        return;
      }
      dispatch(listReqInventory(keyword, pageNumber, data.from, data.to)) 
    }
    else{
      setData({
        from: '',
        to: ''
      })
      dispatch(listReqInventory(keyword, pageNumber)) 
    }
    setToggleSearch(!toggleSearch)
  }

  useEffect(()=>{
    if(success){
      toast.success(`Cập nhật đơn thành công`, ToastObjects)
    }
    else{
      dispatch(listReqInventory(keyword, pageNumber)) 
    } // eslint-disable-next-line
  },[dispatch, pageNumber, success])

  return (
    <>
    <Toast/>
    { error || errorStatus || errorCancel ? (<Message variant="alert-danger">{error || errorStatus || errorCancel}</Message>) : ''}
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách yêu cầu đặt hàng</h2>
          <div>
            <button onClick={handleAdd} className="btn btn-primary">
              Tạo mới
            </button>
          </div>
      </div>

      <div className="card card-custom mb-4 shadow-sm">
        <header className="card-header bg-aliceblue ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Tìm kiếm yêu cầu đặt hàng..."
                className="form-control p-2"
                value={keyword}
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
                <span className="label-date">đến: </span>
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
                <button className="btn btn-danger" onClick={handleSearchDate}>Hủy tìm kiếm</button>
              : 
                <button className="btn btn-success" onClick={handleSearchDate}>Tìm kiếm</button>
              }
            </div>
          </div>
        </header>

        <div>
          <ReqInventory 
            reqInventory={reqInventory}
            loading={loading}
            loadingStatus={loadingStatus}
          />
        </div>
      </div>
    </section>
    </>
  );
};

export default MainReqInventory;
