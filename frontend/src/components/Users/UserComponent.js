import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUser, singleUser } from "../../Redux/Actions/UserActions";
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import AddUser from "./AddUserModal";
import debounce from 'lodash.debounce';
import { useHistory } from 'react-router-dom';
import { withAuthorization } from "../../util/withAuthorization ";
import { PERMISSIONS } from "../../util/RolesContanst";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { USER_DELETE_RESET } from "../../Redux/Constants/UserConstants";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const UserComponent = (props) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList 
  const userDelete = useSelector(state => state.userDelete)
  const {success: successDelete} = userDelete

  const [show, setShow] = useState(false);
  const [modalShow,setModalShow]=useState(false);
  const [dataModal,setDataModal]=useState();

  const MyVerticallyCenteredModal=(props) => {
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
                <p>Bạn có muốn xóa <span className="text-danger">{dataModal?.name}</span> ?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-danger" onClick={() => {
                    dispatch(deleteUser(dataModal?._id))
                    setModalShow(false)
                }}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}
  const { pageNumber } = props
    const [keyword, setSearch] = useState()
    const history = useHistory()
    const callApiKeywordSearch = (keyword, pageNumber) =>{
        if( keyword.trim() !== ''){
          dispatch(listUser(keyword, pageNumber))
        }
        else{
          history.push('/users');
        }
      }
    const debounceDropDown = useRef(debounce((keyword, pageNumber) => callApiKeywordSearch(keyword, pageNumber) , 300)).current;
    const handleSubmitSearch = e =>{
        setSearch(e.target.value)
        debounceDropDown(e.target.value, pageNumber);
      }
  const handleAdd = (e) =>{
    setShow(true)
  }
  useEffect(() => {
    dispatch((listUser()));
    if(successDelete) {
      dispatch({type: USER_DELETE_RESET});
      toast.success("Xóa người dùng thành công", ToastObjects);
      dispatch(listUser())
  }
  }, [dispatch, successDelete])
  const nameRole =  (role) => {
    if(role === "isAdmin"){
      return "Quản trị viên"
    }
    else if(role === "isInventory"){
      return "Nhân viên kho"
    }
    else if(role === "isSaleAgent"){
      return "Nhân viên bán hàng"
    }
  }
  return (
    <>
    <Toast />
    <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
    <AddUser show={show} setShow={setShow}/>
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách người dùng</h2>
        <div>
          {/* <Link to="#" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </Link> */}
            <button onClick={handleAdd} className="btn btn-primary">
              Tạo mới
            </button>
        </div>
      </div>

      <div className="card card-custom mb-4 shadow-sm">
        <header className="card-header bg-aliceblue ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="form-control"
                value={keyword}
                onChange={handleSubmitSearch}
              />
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (<Loading />) : error ? (<Message variant="alert-danger" >{error}</Message>) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {
                users.filter((user) => !user.isAdmin).map((user, index) => (
                  <div className="col" key={index}>
                    <div className="card card-user shadow-sm">
                    <div className="card-header">
                      { userInfo?.isAdmin ? 
                        <div className="user-effect">
                          <div className="user-effect-delete" onClick={e=>{
                            e.preventDefault();
                            setModalShow(true)
                            setDataModal(user)
                          }}><i className="far fa-trash"></i></div>

                          <div className="user-effect-edit" onClick={e=>{
                            e.preventDefault();
                            dispatch(singleUser(user._id))
                            setShow(true)
                          }}><i className="far fa-edit"></i></div>
                        </div>
                        :
                          <div className="user-effect-edit" onClick={e=>{
                            e.preventDefault();
                            dispatch(singleUser(user._id))
                            setShow(true)
                          }}><i className="far fa-edit"></i></div>
                        }
                        <img
                          className="img-md img-avatar"
                          src="images/user_avatar_default.png"
                          // src="https://tpone.vn/webinfo_files/images/57c57e30-461d-11ed-a701-9b027010aa3d--XMLID_92_.png"
                          alt="User pic"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mt-5">{user.name}</h5>
                        <div className="card-text text-muted">
                          {
                            user?.role === "isAdmin" ? (
                              <p className="m-0 badge bg-danger" style={{fontSize: '16px'}}>{nameRole(user?.role)}</p>
                            )
                            :
                            (
                              <p className="m-0 badge bg-primary text-wrap" style={{minWidth: '4rem', fontSize: '16px'}}>{nameRole(user?.role)}</p>
                            )
                          }
                          <h6 className="mt-2 card-title">{user.phone}</h6>
                          <p style={{fontWeight: "bold"}}>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </div>
    </section>
    </>

  );
};

export default withAuthorization(UserComponent,[PERMISSIONS.isAdmin]);
