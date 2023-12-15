import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, updateCategory } from "../../Redux/Actions/CategoryAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrlFile } from "../../util/fileUploader";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const CreateCategory = (props) => {
  const {valueEdit} = props
  const categoryId = valueEdit._id
  const dispatch = useDispatch();
  const [file, setImg] = useState(null) ;
  const [data, setData] = useState({name: '', description: '', image: '', isActive: true})
  const categoryCreate = useSelector(state => state.categoryCreate);
  const { loading, error, category } = categoryCreate;

  const categoryUpdate = useSelector(state => state.categoryUpdate);
  const { loading: loadingUpdateDrug, error: errorUpdateDrug , success: successUpdate, category: categoryU } = categoryUpdate;
  
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
    if (!file) {
      toast.error("Hình ảnh không được bỏ trống", ToastObjects);
      return;
    }
    if(file){
      const formData = new FormData();
      formData.append('image', file);
      const { data: dataUp } = await axios.post(`/api/category/single`, formData);
      data.image = `${backendUrlFile.image}/${dataUp.filename}`
      dispatch(createCategory({ ...data }));
      setData({
        name: '',
        description: '',
        image: '',
        isActive: true
      })
      setImg(null);
      document.getElementById('uploadFile').value = "";

    }
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
    if (!data.image && !file) {
      toast.error("Hình ảnh không được bỏ trống", ToastObjects);
      return;
    }
    if(file){
      const formData = new FormData();
      formData.append('image', file);
      const { data: dataUp } = await axios.post(`/api/category/single`, formData);
      data.image = `${backendUrlFile.image}/${dataUp.filename}`
    }
    dispatch(updateCategory({ ...data, categoryId }));
    setData({
      name: '',
      description: '',
      image: '',
      isActive: true
    })
    setImg(null);
    document.getElementById('uploadFile').value = "";
  }
  useEffect(()=>{
    if(valueEdit){
      setData({
        name: valueEdit.name,
        description: valueEdit.description,
        image: valueEdit.image,
        isActive: valueEdit.isActive
      })
    }
    else{
      setData({
        name: '',
        description: '',
        image: '',
        isActive: true
      })
    }
    if(category){
      props.parentCallbackCreate(category)
    }
    if(successUpdate){
      props.parentCallbackUpdate(categoryU)
    }
  },[category, successUpdate, categoryU, valueEdit, props])

  const { name, description, image, isActive } = data;
  return (
    <div className="col-md-12 col-lg-4">
      {
        loading || loadingUpdateDrug ? (<Loading />) : error || errorUpdateDrug ? (<Message>{error || errorUpdateDrug}</Message>) : ''
      }
      <form>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Tên nhóm sản phẩm
          </label>
          <input
            type="text"
            placeholder="Nhập tên nhóm sản phẩm"
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
          <label className="form-label">Ảnh</label>
          <input
          id="uploadFile"
          required={image ? false : true} 
          onChange={e => {
            setData(prev => ({ ...prev, image: null }))
            
            if (e.target.files[0].size > 1024 * 1024){
              toast.error("File có kích thước quá 1MB.",ToastObjects);
              return
            }
            else if (e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/png'){
              toast.error("File không đúng định dạng.",ToastObjects);
              return   
            }
            setImg(e.target.files[0])
          }}
          className="form-control" 
          type="file" />
          { (image || file)  && (
            <div>     
              <img src={(image ? image : URL.createObjectURL(file))}
                alt="Product"
                className="mt-3" 
                style={{width: '250px', marginTop: '5px'}}/>
              <span 
                className="delete-button"
                onClick={e => {
                  setImg(null)
                  setData(prev => ({ ...prev, image: null }))
                  document.getElementById('uploadFile').value = "";
                }}
                >&times;</span>
            </div>
          )}
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

export default CreateCategory;
