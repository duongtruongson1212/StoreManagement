import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPromotion, updatePromotion } from "../../Redux/Actions/PromotionAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import axios from "axios";
import { toast } from "react-toastify";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreatePromotion = (props) => {
  const {valueEdit} = props
  const promotionId = valueEdit._id
  const dispatch = useDispatch();
  const [file, setImg] = useState(null) ;
  const [data, setData] = useState({name: '', discount: '', startOn: '', endOn: ''})
  const promotionCreate = useSelector(state => state.promotionCreate);
  const { loading, error, promotion } = promotionCreate;

  const promotionUpdate = useSelector(state => state.promotionUpdate);
  const { loading: loadingUpdateDrug, error: errorUpdateDrug , success: successUpdate, promotion: promotionU } = promotionUpdate;

  
  const handleChange = e => {
    setData(prev => {
      return {
        ...prev, [e.target.name] : e.target.value
      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Tên khuyến mãi không được bỏ trống", ToastObjects);
      return;
    }
    if (!discount) {
      toast.error("Giảm giá không được bỏ trống không được bỏ trống", ToastObjects);
      return;
    }
    if (!startOn) {
      toast.error("Ngày bắt đầu không được bỏ trống không được bỏ trống", ToastObjects);
      return;
    }
    if (!endOn) {
      toast.error("Ngày kết thúc không được bỏ trống không được bỏ trống", ToastObjects);
      return;
    }
    dispatch(createPromotion({ ...data }));
    setData({
        name: '',
        discount: '',
        startOn: '',
        endOn: ''
    })
    
  }

  const hanldeEdit = async(e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Tên khuyến mãi không được bỏ trống", ToastObjects);
      return;
    }
    if (!discount) {
      toast.error("Giảm giá không được bỏ trống không được bỏ trống", ToastObjects);
      return;
    }
    if (!startOn) {
      toast.error("Ngày bắt đầu không được bỏ trống không được bỏ trống", ToastObjects);
      return;
    }
    if (!endOn) {
      toast.error("Ngày kết thúc không được bỏ trống không được bỏ trống", ToastObjects);
      return;
    }
    
    
    dispatch(updatePromotion({ ...data, promotionId }));
    setData({
        name: '',
        discount: '',
        startOn: '',
        endOn: ''
    })
  }
 // `${new Date(startOn).getFullYear()}-${String(new Date(startOn).getMonth() + 1).padStart(2, '0')}-${String(new Date(startOn).getDate()).padStart(2, '0')}`;
  useEffect(()=>{
    if(valueEdit){
      setData({
        name: valueEdit.name,
        discount: valueEdit.discount,
        startOn: `${new Date(valueEdit.startOn).getFullYear()}-${String(new Date(valueEdit.startOn).getMonth() + 1).padStart(2, '0')}-${String(new Date(valueEdit.startOn).getDate()).padStart(2, '0')}`,
        endOn: `${new Date(valueEdit.endOn).getFullYear()}-${String(new Date(valueEdit.endOn).getMonth() + 1).padStart(2, '0')}-${String(new Date(valueEdit.endOn).getDate()).padStart(2, '0')}`
      })
    }
    else{
      setData({
        name: '',
        discount: '',
        startOn: '',
        endOn: ''
      })
    }
    if(promotion){
      props.parentCallbackCreate(promotion)
    }
    if(successUpdate){
      props.parentCallbackUpdate(promotionU)
    }
  },[promotion, successUpdate, promotionU, valueEdit, props])

  const { name, discount, startOn, endOn } = data;
  return (
    <div className="col-md-12 col-lg-4">
      {
        loading || loadingUpdateDrug ? (<Loading />) : error || errorUpdateDrug ? (<Message>{error || errorUpdateDrug}</Message>) : ''
      }
      <form>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Tên khuyến mãi
          </label>
          <input
            type="text"
            placeholder="Nhập tên khuyến mãi"
            className="form-control py-3"
            id="product_name"
            required
            value={name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category_name" className="form-label">
            % khuyến mãi
          </label>
          <input
            type="number"
            placeholder="Nhập tỉ lệ khuyến mãi"
            className="form-control py-3"
            id="category_name"
            required
            value={discount}
            name="discount"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startOn_name" className="form-label">
            Ngày bắt đầu
          </label>
          <input
            type="date"
            placeholder="Nhập ngày bắt đầu"
            className="form-control py-3"
            id="startOn_name"
            required
            value={startOn}
            name="startOn"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startOn_name" className="form-label">
            Ngày kết thúc
          </label>
          <input
            type="date"
            placeholder="Nhập ngày kết thúc"
            className="form-control py-3"
            id="startOn_name"
            required
            value={endOn}
            name="endOn"
            onChange={handleChange}
          />
        </div>
        
        
        
        
        <div className="d-grid">
          {
            valueEdit ? (
              <button type="submit" className="btn btn-warning py-3" onClick={hanldeEdit}><h5>Cập nhật</h5></button>
            ): 
            (
              <button type="submit" className="btn btn-primary py-3" onClick={handleSubmit}><h5>Tạo mới </h5></button>
            )
          }
        </div>
      </form>
    </div>
  );
};

export default CreatePromotion;
