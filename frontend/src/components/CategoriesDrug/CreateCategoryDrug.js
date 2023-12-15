import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryDrug, updateCategoryDrug } from "../../Redux/Actions/CategoryDrugAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { toast } from "react-toastify";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateCategoryDrug = (props) => {
  const {valueEdit} = props
  const categoryId = valueEdit._id
  const dispatch = useDispatch();
  const [data, setData] = useState({name: '', description: '', image: '', isActive: true})
  const categoryCreate = useSelector(state => state.categoryDrugCreate);
  const { loading, error, categoryDrug } = categoryCreate;

  const categoryUpdate = useSelector(state => state.categoryDrugUpdate);
  const { loading: loadingUpdateDrug, error: errorUpdateDrug ,success: successUpdateDrug, categoryDrug: categoryU } = categoryUpdate;
  
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
      toast.error("Tên không được bỏ trống", ToastObjects);
      return;
    }
    if (!description) {
      toast.error("Mô tả không được bỏ trống", ToastObjects);
      return;
    }
   
    dispatch(createCategoryDrug({ ...data }));
    setData({
      name: '',
      description: '',
      isActive: true
    })
  }

  const hanldeEdit = async(e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Tên không được bỏ trống", ToastObjects);
      return;
    }
    if (!description) {
      toast.error("Mô tả không được bỏ trống", ToastObjects);
      return;
    }
    dispatch(updateCategoryDrug({ ...data, categoryId }));
    setData({
      name: '',
      description: '',
      isActive: true
    })
  }
  useEffect(()=>{
    if(valueEdit){
      setData({
        name: valueEdit.name,
        description: valueEdit.description,
        isActive: valueEdit.isActive
      })
    }
    else{
      setData({
        name: '',
        description: '',
        isActive: true
      })
    }
    if(categoryDrug){
      props.parentCallbackCreate(categoryDrug)
    }
    if(successUpdateDrug){
      props.parentCallbackUpdate(categoryU)
    }
  },[categoryDrug, successUpdateDrug, categoryU, valueEdit, props])

  const { name, description, isActive } = data;
  return (
    <div className="col-md-12 col-lg-4">
      {
        loading || loadingUpdateDrug ? (<Loading />) : error || errorUpdateDrug ? (<Message>{error || errorUpdateDrug}</Message>) : ''
      }
      <form>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Tên nhóm thuốc
          </label>
          <input
            type="text"
            placeholder="Nhập tên nhóm thuốc"
            className="form-control py-3"
            id="category_name"
            required
            value={name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Mô tả</label>
          <textarea
            placeholder="Nhập mô tả"
            className="form-control"
            rows="4"
            required
            value={description}
            name="description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="form-label">Trạng thái</label>
          <label className="switch" htmlFor="checkbox">
            <input 
              type="checkbox" 
              id="checkbox"
              checked={isActive}
              name="isActive"
              onChange={() => setData(prev => {
                return {
                  ...prev, isActive :!isActive
                }
              })}
              />
            <div className="slider round"></div>
          </label>
        </div>
        <div className="d-grid">
          {
            valueEdit ? (
              <button className="btn btn-warning py-3" onClick={hanldeEdit}><h5>Cập nhật</h5></button>
            ): 
            (
              <button className="btn btn-primary py-3" onClick={handleSubmit}><h5>Tạo mới</h5></button>
            )
          }
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryDrug;
