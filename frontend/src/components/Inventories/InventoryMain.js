import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from '../LoadingError/Error';
import debounce from "lodash.debounce";
import InventoryTable from "./InventoryTable";
import { listInventory } from './../../Redux/Actions/InventoryAction';
import Toast from '../LoadingError/Toast';
import renderToast from "../../util/Toast";
import { Link } from "react-router-dom";
const MainInventory = () => {
  const dispatch = useDispatch()

  const [ isStop , setIsStop ] = useState(false)
  const [colorHSD, setColorHSD] = useState(false)
  const [colorOH, setColorOH] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const [keyword, setSearch] = useState()
  const [toggleSearch, setToggleSearch] = useState(false)
  const [data, setData] = useState({
    oh: '',
    exp: '',
    from: '',
    to: ''
  })
  const {from, to, oh, exp} = data
  
  const inventoryList = useSelector(state=> state.inventoryList)
  const { loading, error, inventories } = inventoryList

  const callApiKeywordSearch = (keyword, from, to, oh, exp) =>{
      dispatch(listInventory(keyword, oh, exp, from, to))
  }
  const debounceDropDown = useRef(debounce((keyword, oh, exp, from, to) => callApiKeywordSearch(keyword, from, to, oh, exp) , 300)).current;

  const handleSubmitSearch = e =>{
    e.preventDefault()
    setSearch(e.target.value)
    debounceDropDown(e.target.value, data.from, data.to, data.oh, data.exp);
  }

  const handleChange = e =>{
    e.preventDefault();
    const selectOH = document.querySelector('#OH-select');
    const selectedOptionOH = selectOH.options[selectOH.selectedIndex];
    selectOH.style.color = selectedOptionOH.id;

    const selectEXP = document.querySelector('#HSD-select');
    const selectedOptionEXP = selectEXP.options[selectEXP.selectedIndex];
    selectEXP.style.color = selectedOptionEXP.id;

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
      dispatch(listInventory(keyword, data.oh, data.exp, data.from, data.to)) 
    }
    else{
      setData({
        exp: '',
        oh: '',
        from: '',
        to: ''
      })
      dispatch(listInventory(keyword)) 
    }
    setToggleSearch(!toggleSearch)
  }

  useEffect(()=>{
      dispatch(listInventory(keyword, oh, exp, from, to)) 
     // eslint-disable-next-line
  },[dispatch, oh, exp])

  return (
    <>
    <Toast/>
    { error ? (<Message variant="alert-danger">{error}</Message>) : ''}
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách sản phẩm trong kho</h2>
      </div>

      <div className="card card-custom mb-4 shadow-sm">
        <header className="card-header bg-aliceblue">
          <div className="row gx-3 py-3 justify-content-between inventory-flex">
            <div className="col-lg-7 me-auto d-flex">
              <div className="me-1" style={{flexGrow: '2'}}>
                <input
                  type="search"
                  placeholder="Tìm kiếm tên thuốc, số lô"
                  className="form-control p-2"
                  value={keyword}
                  onChange={handleSubmitSearch}
                />
              </div>
              <div className="me-1" style={{flexGrow: '1'}}>
                <select defaultValue="" name="exp" className="p-2 form-select" id="HSD-select" style={{fontWeight: '500'}} onChange={handleChange}>
                  <option id='black'   className="text-dark"    style={{fontWeight: '500'}} value="">Tất cả HSD</option>
                  <option id='#28a745' className="text-success" style={{fontWeight: '500'}} value="HSD2">Còn hạn</option>
                  <option id='#ffc107' className="text-warning" value="HSD1">Cảnh báo</option>
                  <option id="#dc3545" className="text-danger"  value="HSD0">Hết hạn</option>
                </select>
              </div>
              <div className="me-1" style={{flexGrow: '1'}}>
                <select defaultValue=""  name="oh" className="form-control p-2 form-select" id="OH-select" style={{fontWeight: '500'}} onChange={handleChange} >
                  <option id='black'   className="text-dark" style={{fontWeight: '500'}} value="">Tất cả số lượng</option>
                  <option id='#28a745' className="text-success" style={{fontWeight: '500'}} value="OH2">Số lượng đủ</option>
                  <option id='#ffc107' className="text-warning" value="OH1">Số lượng sắp hết</option>
                  <option id="#dc3545" className="text-danger" value="OH0">Số lượng hết</option>
                </select>
              </div>
              <div>
                <button className="btn btn-success p-2" style={{width: 'max-content'}}onClick={(e)=>{
                  e.preventDefault()
                  setExpanded(prev => !prev)
                }}>{!expanded ? 'Mở rộng' : 'Thu gọn' }</button>
              </div>
              <div>
                <button className="btn btn-success p-2" style={{width: 'max-content', marginLeft: '5px'}}onClick={(e)=>{
                  e.preventDefault();
                  setColorHSD(prev => !prev);
                  if (colorOH) {
                    setColorOH(false);
                  }
                }}>{!colorHSD ? 'Màu HSD' : 'Tắt HSD' }</button>
              </div>
              <div>
                <button className="btn btn-success p-2" style={{width: 'max-content', marginLeft: '5px'}}onClick={(e)=>{
                  e.preventDefault()
                  setColorOH(prev => !prev);
                  if (colorHSD) {
                    setColorHSD(false);
                  }
                }}>{!colorOH ? 'Màu OH' : 'Tắt OH' }</button>
              </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-end">
            <div className="me-1" style={{flexGrow: '1'}}>
              <div className="d-flex">
                <span className="label-date">Từ: </span>
                <input
                    id="datePicker"
                    name="from"
                    value={from}
                    className="form-control p-2"
                    type='date'
                    onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="me-1" style={{flexGrow: '1'}}>
              <div className="d-flex">
                <span className="label-date">Đến: </span>
                <input
                    id="datePicker"
                    name="to"
                    value={to}
                    className="form-control p-2"
                    type='date'
                    onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="me-1" style={{flexGrow: '1'}}>
              {toggleSearch ? 
                <button className="btn btn-danger p-2" onClick={handleSearchDate}>Cancel</button>
              : 
                <button className="btn btn-success p-2" onClick={handleSearchDate}>Search</button>
              }
            </div>
            </div>

          </div>
        </header>

        <div>
          {inventories ?
            <InventoryTable
              inventory={inventories}
              loading={loading}
              colorHSD={colorHSD}
              colorOH={colorOH}
              expanded={expanded}
            /> : 
            <div>Không có dữ liệu</div>
          }
        </div>
      </div>
    </section>
    </>
  );
};

export default MainInventory;
