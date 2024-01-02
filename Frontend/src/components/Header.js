import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from '../Redux/Actions/UserActions';
// import { changeTheme } from './../Redux/Actions/ThemeAction';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Select from "react-select";
import functionSys from "./../../src/util/functionSys.json"

const Header = () => {
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
  const MyVerticallyCenteredModal = (props) =>{
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-modal-simple"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Thông tin người dùng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="fw-bold">Quyền người dùng: {
            userInfo?.role === "isAdmin" ? (
              <p className="m-0 badge bg-danger" style={{fontSize: '16px'}}>{nameRole(userInfo?.role)}</p>
            )
            :
            (
              <p className="m-0 badge bg-primary text-wrap" style={{minWidth: '4rem', fontSize: '16px'}}>{nameRole(userInfo?.role)}</p>
            )
          }</div>
          <div className="fw-bold">Email: <span className="fw-normal">{userInfo.email}</span></div>
          <div className="fw-bold">Số điện thoại: <span className="fw-normal">{userInfo.phone}</span></div>
        </Modal.Body>
      </Modal>
    );
  }


  const history = useHistory();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    document.querySelector("button[data-trigger]").addEventListener("click",function (e) {
      document.querySelector("body").classList.remove("aside-mini");
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = this.getAttribute("data-trigger");
      document.querySelector(offcanvas_id).classList.toggle("show");
    });

    document.querySelector(".btn-aside-minimize").addEventListener("click", function(){
      document.querySelector("body").classList.toggle("aside-mini");
      
      var a = document.querySelector("button[data-trigger]")
      var offcanvas_id = a.getAttribute("data-trigger");
      document.querySelector(offcanvas_id).classList.remove("show");
    })
  }, []);

  // const data = useSelector((state)=> state.theme)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cloneFunctionSys = JSON.parse(JSON.stringify(functionSys))

  const filteredFunctionSys = () => {
    return cloneFunctionSys?.filter(functionItem => {
      return userInfo.isAdmin ? true : functionItem?.isAdmin === userInfo.isAdmin &&
        functionItem?.role?.includes(userInfo.role)
    })
  }
  const filteredOptions = filteredFunctionSys()
  // const handleChangeTheme = (e) =>{
  //   e.preventDefault();
  //   dispatch(changeTheme(data.theme === 'light' ? 'dark' : 'light'))
  //   var element = document.getElementById("radio-inner");
  //   element.classList.toggle("active");
  // }
  const handleLogout = (e) =>{
    e.preventDefault();
    dispatch(logout())
    history.push('/login');
  }

  const handleMyProfile = e =>{
    e.preventDefault();
    setModalShow(true);
  }

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    history.push(selectedOption.functionPath)
  };

  return (
    <>
      <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      />
      <header className="main-header navbar">
        <div className="col-search">
          <Select
            options={filteredOptions}
            // filterOption={(option) => 
            //   userInfo.isAdmin ? true : option.data.isAdmin === userInfo.isAdmin &&
            //   option?.data?.role?.includes(userInfo.role)
            // }
            value={selectedOption}
            onChange={handleChange}
            getOptionLabel={(option) => option.functionName}
            getOptionValue={(option) => option._id}
            placeholder="Chọn chức năng cần tìm"
          />
        </div>
        <div className="col-nav">
          <button
            className="btn btn-icon btn-mobile me-auto"
            data-trigger="#offcanvas_aside"
          >
            <i className="md-28 fas fa-bars"></i>
          </button>
          <ul className="nav">
            <li className="nav-item me-3">
              <Badge pill bg={userInfo.role === "isAdmin" ? 'danger' : 'primary'} >
                <Link className={`dropdown-item text-white fw-bold ${userInfo.role === "isAdmin" ? 'bg-danger' : 'bg-primary'}`} to="#" onClick={handleMyProfile}>
                  <span style={{fontSize:"16px"}}>{userInfo.name}</span>
                </Link>
                </Badge>
            </li>
            {/* <li className="nav-item">
              <div className="radio-btn nav-link btn-icon" onClick={handleChangeTheme}>
                <div id="radio-inner"><i className="fas fa-moon"></i></div>
              </div>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link btn-icon" to="#">
                <i className="fas fa-bell"></i>
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="#">
                <span style={{color: "white"}}>English</span>
              </Link>
            </li> */}

            <li className="dropdown nav-item">
              <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
                <img
                  className="img-xs rounded-circle"
                  src="/images/user_avatar_default.png"
                  alt="User"
                />
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="#" onClick={handleMyProfile}>
                  Thông tin người dùng
                </Link>
                {/* <Link className="dropdown-item" to="#">
                  Cài đặt
                </Link> */}
                <Link className="dropdown-item text-danger" to='#' onClick={handleLogout}>
                  Đăng xuất
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </header>
    </>

  );
};

export default Header;
