import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Message from '../LoadingError/Error';
import { listProduct } from "../../Redux/Actions/ProductActions";
import debounce from "lodash.debounce";
import Toast from './../LoadingError/Toast';
import { toast } from "react-toastify";

import DataTableProduct from "./DataTable";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const MainProducts = (props) => {
  const { pageNumber } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const [keyword, setSearch] = useState()
  const [sort, setSort] = useState()
  // const [dessert, setDessert] = useState(false)
  const productList = useSelector((state)=> state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete
  
  const handleSelected = (e)=>{
    e.preventDefault();
    let sortPrice = e.target.value
    dispatch(listProduct(keyword, pageNumber, sortPrice))
    setSort(e.target.value)
  }
  const callApiKeywordSearch = (keyword, pageNumber, sort) =>{
    if( keyword.trim() !== ''){
      dispatch(listProduct(keyword, pageNumber, sort))
    }
    else{
      history.push('/products');
    }
  }
  const debounceDropDown = useRef(debounce((keyword, pageNumber, sort) => callApiKeywordSearch(keyword, pageNumber, sort) , 300)).current;

  const handleSubmitSearch = e =>{
    setSearch(e.target.value)
    debounceDropDown(e.target.value, pageNumber, sort);
  }

  useEffect(()=>{
    if(successDelete){
      toast.success("Xóa thành công", ToastObjects);
    }
    else{
      dispatch(listProduct(keyword, pageNumber)) 
    }// eslint-disable-next-line
  },[dispatch, successDelete, pageNumber])

  return (
    <>
    <Toast />
    { error || errorDelete ? (<Message variant="alert-danger">{error || errorDelete}</Message>) : ''}
    <section className="content-main">
      <div className="content-header">
        <h3 className="content-title">Danh sách thông tin thuốc</h3>
        <div className="d-flex">
        <div style={{marginRight: '10px'}}>
            {/* <Link to="#" className="btn btn-primary" onClick={(e)=>{
              e.preventDefault()
              setDessert(prev => !prev)
            }}>
              Đổ màu
            </Link> */}
          </div>
          <div style={{marginRight: '10px'}}>
            <Link to="/product/excel" className="btn btn-primary">
              Excel & CSV 
            </Link>
          </div>
          <div>
            <Link to="/product/add" className="btn btn-primary">
              Tạo mới thuốc
            </Link>
          </div>
        </div>
      </div>

      <div className="card card-custom mb-4 shadow-sm">
        <header className="card-header bg-aliceblue ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Tìm kiếm thuốc..."
                className="form-control p-2"
                value={keyword}
                onChange={handleSubmitSearch}
              />
            </div>
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>All category</option>
                <option>Electronics</option>
                <option>Clothings</option>
                <option>Something else</option>
              </select>
            </div> */}
            <div className="col-lg-2 col-6 col-md-3">
              <select  defaultValue="" className="form-select" onChange={handleSelected}>
                <option value="">---Chọn giá--</option>
                <option value="cheap">(10.000 vnđ - 100.000 vnđ)</option>
                <option value="expensive">(100.000 vnđ - 100.000 vnđ)</option>
              </select>
            </div>
          </div>
        </header>

        <div>
          <DataTableProduct 
            products={products}
            // dessert={dessert}
            loading={loading}
            loadingDelete={loadingDelete}
          />
        </div>
          {/* <Pagination 
            totalPage={totalPage} 
            currentPage={currentPage} 
            keyword={keyword ? keyword : ""}
            sort= {sort ? sort : ""}
            handlePage={handlePaginate}
          /> */}
      </div>
    </section>
    </>
  );
};

export default MainProducts;
