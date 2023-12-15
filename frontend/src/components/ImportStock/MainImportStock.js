import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Message from '../LoadingError/Error';
import debounce from "lodash.debounce";
import ImportStock from "./ImportStock";
import { listImportStock } from "../../Redux/Actions/ImportStockAction";
import Toast from './../LoadingError/Toast';
import { toast } from "react-toastify";
import renderToast from "../../util/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const MainImportStock = (props) => {
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
  
  const importedStockList = useSelector(state=> state.importStockList)
  const { loading, error, stockImported } = importedStockList

  const updateStatus = useSelector(state => state.importStockStatus)
  const {loading: loadingStatus, error: errorStatus, success} = updateStatus

  const cancelImport = useSelector(state => state.importStockCancel)
  const {error: errorCancel} = cancelImport

  const callApiKeywordSearch = (keyword, pageNumber, from, to) =>{
      dispatch(listImportStock(keyword, pageNumber, from, to))
  }
  const debounceDropDown = useRef(debounce((keyword, pageNumber, from, to) => callApiKeywordSearch(keyword, pageNumber, from, to) , 300)).current;

  const handleSubmitSearch = e =>{
    e.preventDefault()
    setSearch(e.target.value)
    debounceDropDown(e.target.value, pageNumber, data.from, data.to);
  }

  const handleAdd = (e) =>{
    e.preventDefault();
    history.push('/import-stock/add');
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
      dispatch(listImportStock(keyword, pageNumber, data.from, data.to)) 
    }
    else{
      setData({
        from: '',
        to: ''
      })
      dispatch(listImportStock(keyword, pageNumber)) 
    }
    setToggleSearch(!toggleSearch)
  }

  useEffect(()=>{
    if(success){
      toast.success(`Cập nhật đơn thành công`, ToastObjects)
    }
    else{
      dispatch(listImportStock(keyword, pageNumber)) 
    } // eslint-disable-next-line
  },[dispatch, pageNumber, success])
  
  return (
    <>
    <Toast/>
    { error || errorStatus || errorCancel ? (<Message variant="alert-danger">{error || errorStatus || errorCancel}</Message>) : ''}
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách nhập kho</h2>
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
                placeholder="Tìm kiếm đơn nhập kho..."
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
          {stockImported ?
            <ImportStock 
              importStock={stockImported}
              loading={loading}
              loadingStatus={loadingStatus}
            /> : 
            <div>Không có dữ liệu</div>
          }
        </div>
      </div>
    </section>
    </>
  );
};

export default MainImportStock;
