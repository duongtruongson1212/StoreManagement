import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import debounce from "lodash.debounce";
import Message from "../components/LoadingError/Error";
import renderToast from "../util/Toast";
import Toast from "../components/LoadingError/Toast";
import CustomLoader from "../util/LoadingTable";
import DataTable from "react-data-table-component";
import { listProduct } from "../Redux/Actions/ProductActions";
import { tagInventory } from "../Redux/Actions/InventoryAction";
import NoRecords from "../util/noData";

const TagInventory = () => {
  const textNoRecord = "vui lòng chọn thông tin để thống kê"
  const dispatch = useDispatch()
  const [ isStop , setIsStop ] = useState(false)
  const [keyword, setSearch] = useState()
  const [toggleSearch, setToggleSearch] = useState(false)
  const [data, setData] = useState({
    from: '',
    to: ''
  })
  const {from,to} = data
  
  const productList = useSelector((state)=>state.productList)
  const { products } = productList

  const tagInventoryStock = useSelector(state=> state.inventoryTag)
  const { loading, error, inventoryItem } = tagInventoryStock

  const callApiKeywordSearch = (keyword, from, to) =>{
      dispatch(tagInventory(keyword, from, to))
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
      dispatch(tagInventory(keyword, data.from, data.to)) 
    }
    else{
      setData({
        from: '',
        to: ''
      })
      dispatch(tagInventory(keyword)) 
    }
    setToggleSearch(!toggleSearch)
  }

  const columns = [
    {
        name: "STT",
        selector: (row, index) => <b>{index+1}</b>,
        reorder: true,
        width: '60px'

    },
    {
        name: "Số lô",
        selector: (row) => row?.lotNumber,
        sortable: true,

        reorder: true,
        grow: 3
    },
    {
        name: "Tồn đầu kỳ",
        selector: (row) => row?.TDK,
        sortable: true,
        reorder: true,
        grow: 2
    },
    {
        name: "Nhập",
        selector: (row) => row?.N,
        sortable: true,
        reorder: true,
        grow: 2
    },
    {
        name: "Xuất",
        selector: (row) => row?.X,
        sortable: true,
        reorder: true,
        grow: 2
    },
    {
        name: "Tồn cuối kỳ",
        selector: (row) => row?.TCK,
        sortable: true,
        reorder: true,
        grow: 2
    }
];

const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL"
};

const customStyles = {
    rows: {
        highlightOnHoverStyle: {
        backgroundColor: 'rgb(230, 244, 244)',
        borderBottomColor: '#FFFFFF',
        // borderRadius: '25px',
        outline: '1px solid #FFFFFF',
        },
    },
    header: {
        style: {
            minHeight: '56px',
        },
    },
    headRow: {
        style: {
            fontSize: '16px',
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderTopColor:'grey',
        },
    },
    headCells: {
        style: {
        '&:not(:last-of-type)': {
            borderRightStyle: 'solid',
            borderRightWidth: '1px',
            borderRightColor: 'grey',
        },
        },
    },
    cells: {
        style: {
          fontSize: '16px',
        '&:not(:last-of-type)': {
            borderRightStyle: 'solid',
            borderRightWidth: '1px',
            borderRightColor: 'grey',
        },
        },
    },
};



  useEffect(()=>{
    dispatch(listProduct())
    if(keyword && data.from && data.to){
      dispatch(tagInventory(keyword, data.from, data.to)) 
    }
  },[dispatch, keyword, data.from, data.to])

  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      <Toast/>
      { error ? (<Message variant="alert-danger">{error}</Message>) : ''}

      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Thẻ kho</h2>
        </div>

        <div className="card card-custom mb-4 shadow-sm">
          <header className="card-header bg-aliceblue ">
            <div className="row gx-3 py-3">
              <div className="col-lg-4 col-md-6 me-auto ">
                <select
                  id="select-product"
                  value={keyword}
                  name="keyword"
                  onChange={handleSubmitSearch}
                  className="form-control"
                  required >
                  <option value=''>Chọn thuốc</option>
                    {products?.map((item, index)=>(
                      <option key={index} value={item._id}>{item.name}</option>
                    ))}
                </select>
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
              <div style={{display: 'none'}} className="col-lg-1">
                {toggleSearch ? 
                  <button className="btn btn-danger" onClick={handleSearchDate}>Hủy tìm kiếm</button>
                : 
                  <button className="btn btn-success" onClick={handleSearchDate}>Tìm kiếm</button>
                }
              </div>
            </div>
          </header>

          <div>
            <DataTable
              // theme="solarized"
              columns={columns}
              noDataComponent={NoRecords(textNoRecord)}
              data={inventoryItem}
              customStyles={customStyles}
              defaultSortFieldId
              pagination
              // onRowClicked={handleRowClicked}
              paginationComponentOptions={paginationComponentOptions}
              progressPending={loading}
              progressComponent={<CustomLoader />}
              highlightOnHover
              pointerOnHover
            />
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default TagInventory;
