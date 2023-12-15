import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Message from '../LoadingError/Error';
import debounce from "lodash.debounce";
import ExportStock from "./ExportStock";
import { listExportStock } from "../../Redux/Actions/ExportStockAction";
import Toast from '../LoadingError/Toast';
import { toast } from "react-toastify";
import renderToast from "../../util/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const MainExportStock = (props) => {
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

  const exportedStockList = useSelector((state)=> state.exportStockList)
  const { loading, error, stockExported} = exportedStockList

  const updateStatus = useSelector(state => state.exportStockStatus)
  const {loading: loadingStatus, error: errorStatus, success} = updateStatus

  const cancelExport = useSelector(state => state.exportStockCancel)
  const {error: errorCancel} = cancelExport

  const callApiKeywordSearch = (keyword, pageNumber, from, to) =>{
      dispatch(listExportStock(keyword, pageNumber, from, to))
  }
  const debounceDropDown = useRef(debounce((keyword, pageNumber, from, to) => callApiKeywordSearch(keyword, pageNumber, from, to) , 300)).current;

  const handleSubmitSearch = e =>{
    e.preventDefault()
    setSearch(e.target.value)
    debounceDropDown(e.target.value, pageNumber, data.from, data.to);
  }

  const handleAdd = (e) =>{
    e.preventDefault();
    history.push('/export-stock/add');
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
      dispatch(listExportStock(keyword, pageNumber, data.from, data.to)) 
    }
    else{
      setData({
        from: '',
        to: ''
      })
      dispatch(listExportStock(keyword, pageNumber)) 
    }
    setToggleSearch(!toggleSearch)
  }

  useEffect(()=>{
    if(success){
      toast.success(`Cập nhật thành công`, ToastObjects)
    }
    dispatch(listExportStock(keyword, pageNumber)) // eslint-disable-next-line
  },[dispatch, pageNumber, success])

  return (
    <>
    <Toast/>
    { error || errorStatus || errorCancel ? (<Message variant="alert-danger">{error || errorStatus || errorCancel}</Message>) : ''}
    <section className="content-main">
      <div className="content-header">
        <h3 className="content-title">Danh sách phiếu xuất</h3>
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
                placeholder="Tìm kiếm..."
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
                <span className="label-date">Đến: </span>
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
                <button className="btn btn-success" onClick={handleSearchDate}>Tìm kiếm</button>
              }
            </div>
          </div>
        </header>

        <div>
        { stockExported ? 
          <ExportStock 
            exportStock={stockExported} 
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

export default MainExportStock;
