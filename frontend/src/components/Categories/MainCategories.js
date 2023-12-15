import React, { useEffect, useState } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { useDispatch, useSelector } from 'react-redux';
import { CATEGORY_CREATE_RESET, CATEGORY_DELETE_RESET, CATEGORY_UPDATE_RESET } from "../../Redux/Constants/CategoryConstants";
import Toast from "../LoadingError/Toast";
import { deleteCategory, listCategory } from "../../Redux/Actions/CategoryAction";
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const MainCategories = () => {
  const dispatch = useDispatch();
  const MyVerticallyCenteredModal = (props) =>{
    const {data} = props
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Xóa 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chác chắn xóa <span className="text-danger">{data.name}</span> ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-danger" onClick={(e)=>{
            e.preventDefault()
            dispatch(deleteCategory(data._id))
            setModalShow(false)
          }}>Đồng ý</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = useState(false);
  const [createCallback, setCreateCallback] = useState('');
  const [editCallback, setEditcallback] = useState('');
  const [updateCallback, setUpdatecallback] = useState('');
  const [deleteCallback, setDeletecallback] = useState('');

  const CreateCallbackFunction = (childData) =>{
    setCreateCallback(childData)
  }
  const editCallbackFunction = (childData) =>{
    setEditcallback(childData)
  }
  const updateCallbackFunction = (childData) =>{
    setUpdatecallback(childData)
  }
  const deleteCallbackFunction = (childData) =>{
    setDeletecallback(childData)
  }
  const categoryList = useSelector((state)=> state.categoryList)
  const deleteCategorySelector = useSelector(state => state.categoryDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = deleteCategorySelector
  useEffect(()=>{
    if(createCallback){
      toast.success("Thêm nhóm sản phẩm thành công", ToastObjects);
      dispatch({ type: CATEGORY_CREATE_RESET })
      setCreateCallback(null)
    }
    if(updateCallback){
      toast.success("Nhóm sản phẩm đã được cập nhật", ToastObjects);
      dispatch({ type: CATEGORY_UPDATE_RESET })
      setUpdatecallback(null)
      setEditcallback("")
    }
    if(successDelete){
      toast.success("Nhóm sản phẩm đã xóa", ToastObjects);
      dispatch({ type: CATEGORY_DELETE_RESET })
      setDeletecallback("")
      setUpdatecallback(null)
      setEditcallback("")
    }
    dispatch(listCategory());
  },[dispatch, createCallback, updateCallback, successDelete])

  return (
    <>
      { errorDelete && (<Message variant="alert-danger">{errorDelete}</Message>) }
      { loadingDelete ? (<Loading/>) : (
        <MyVerticallyCenteredModal
        show={modalShow}
        data={deleteCallback}
        onHide={() => setModalShow(false)}
        />
      )}
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Danh sách nhóm sản phẩm</h2>
          <div>{ editCallback ? (
            <button onClick={(e)=>{
              e.preventDefault()
              setEditcallback('')
            }}className="btn btn-primary">
              Tạo mới
            </button>
           ) : ""}
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              {/* Create category */}
              <CreateCategory parentCallbackCreate={CreateCallbackFunction} parentCallbackUpdate={updateCallbackFunction} valueEdit={editCallback}/>
              {/* Categories table */}
              <CategoriesTable categoryList={categoryList} parentCallbackEdit={editCallbackFunction} parentCallbackDelete={deleteCallbackFunction} parentModal={setModalShow}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainCategories;
