import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/UserActions";
// import { changeTheme } from './../Redux/Actions/ThemeAction';
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import functionSys from "./../../src/util/functionSys.json";
import {
  SetOHNotification,
  listNotification,
  updateNotification,
} from "../Redux/Actions/NotificationAction";
import moment from "moment";
import socketIO from "socket.io-client";
import Loading from "./LoadingError/Loading";
import Message from "./LoadingError/Error";
const Header = () => {
  const nameRole = (role) => {
    if (role === "isAdmin") {
      return "Quản trị viên";
    } else if (role === "isInventory") {
      return "Nhân viên kho";
    } else if (role === "isSaleAgent") {
      return "Nhân viên bán hàng";
    }
  };
  const MyVerticallyCenteredModal = (props) => {
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
          <div className="fw-bold">
            Quyền người dùng:{" "}
            {userInfo?.role === "isAdmin" ? (
              <p className="m-0 badge bg-danger" style={{ fontSize: "16px" }}>
                {nameRole(userInfo?.role)}
              </p>
            ) : (
              <p
                className="m-0 badge bg-primary text-wrap"
                style={{ minWidth: "4rem", fontSize: "16px" }}
              >
                {nameRole(userInfo?.role)}
              </p>
            )}
          </div>
          <div className="fw-bold">
            Email: <span className="fw-normal">{userInfo.email}</span>
          </div>
          <div className="fw-bold">
            Số điện thoại: <span className="fw-normal">{userInfo.phone}</span>
          </div>
        </Modal.Body>
      </Modal>
    );
  };
  const ModalNotification = (props) => {
    const groupedNotifications = dataNoti?.listItem?.reduce((groups, item) => {
      const name = item?.name;
      if (!groups[name]) {
        groups[name] = [];
      }
      groups[name].push(item);
      return groups;
    }, {});

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-modal-simple"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Thông báo {dataNoti?.contents} (
            {moment(dataNoti?.createdAt).format("DD-MM-YYYY HH:mm:ss")})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {groupedNotifications && (
            <>
              <div className="table-responsive">
                <table className="table table-bordered">
                  {/* Header for the table */}
                  <thead>
                    <tr>
                      <th>
                        <strong>Tên</strong>
                      </th>
                      <th>
                        <strong>Số lô</strong>
                      </th>
                      <th>
                        <strong>Tình trạng</strong>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.entries(groupedNotifications).map(
                      ([name, notificationsForName], index) => (
                        <React.Fragment key={index}>
                          {/* Display notifications for the current name */}
                          {notificationsForName.length > 1 ? (
                            <tr>
                              <td>{name}</td>
                              <td>
                                {notificationsForName.map((item, subIndex) => (
                                  <div key={subIndex}>{item?.lotNumber}</div>
                                ))}
                              </td>
                              <td>
                                {notificationsForName.map((item, subIndex) => (
                                  <div key={subIndex}>{item?.status}</div>
                                ))}
                              </td>
                            </tr>
                          ) : (
                            // Single lotNumber
                            notificationsForName.map((item, subIndex) => (
                              <tr key={subIndex}>
                                <td>{name}</td>
                                <td>{item?.lotNumber}</td>
                                <td>{item?.status}</td>
                              </tr>
                            ))
                          )}
                        </React.Fragment>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              { dataNoti?.signature === 'OH' &&
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary" onClick={e=>{
                    history.push('/req-inventory/add')
                    dispatch(SetOHNotification(dataNoti?.listItem))
                  }}>
                    Yêu cầu đặt hàng
                  </button>
                </div>
              }
            </>
          )}
        </Modal.Body>
      </Modal>
    );
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(socketIO.connect(process.env.REACT_APP_BE_URL));
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [modalNotiShow, setModalNotiShow] = useState(false);
  const [dataNoti, setDataNoti] = useState(null);
  const [isLimit, setIsLimit] = useState(false);

  useEffect(() => {
    document
      .querySelector("button[data-trigger]")
      .addEventListener("click", function (e) {
        document.querySelector("body").classList.remove("aside-mini");
        e.preventDefault();
        e.stopPropagation();
        var offcanvas_id = this.getAttribute("data-trigger");
        document.querySelector(offcanvas_id).classList.toggle("show");
      });

    document
      .querySelector(".btn-aside-minimize")
      .addEventListener("click", function () {
        document.querySelector("body").classList.toggle("aside-mini");

        var a = document.querySelector("button[data-trigger]");
        var offcanvas_id = a.getAttribute("data-trigger");
        document.querySelector(offcanvas_id).classList.remove("show");
      });
  }, []);

  // const data = useSelector((state)=> state.theme)
  const notificationList = useSelector((state) => state.notificationList);
  const { loading, error, notifications, numberUnread } = notificationList;
  const notificationUpdate = useSelector((state) => state.notificationUpdate);
  const {
    loading: loadingNotiUpdate,
    success: successNotiUpdate,
    notifications: notiUpdate,
  } = notificationUpdate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cloneFunctionSys = JSON.parse(JSON.stringify(functionSys));
  // const readCount = notifications?.filter((item) => item.isReaded === false).length;
  const filteredFunctionSys = () => {
    return cloneFunctionSys?.filter((functionItem) => {
      return userInfo.isAdmin
        ? true
        : functionItem?.isAdmin === userInfo.isAdmin &&
            functionItem?.role?.includes(userInfo.role);
    });
  };
  const filteredOptions = filteredFunctionSys();
  // const handleChangeTheme = (e) =>{
  //   e.preventDefault();
  //   dispatch(changeTheme(data.theme === 'light' ? 'dark' : 'light'))
  //   var element = document.getElementById("radio-inner");
  //   element.classList.toggle("active");
  // }
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/login");
  };

  const handleMyProfile = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    history.push(selectedOption.functionPath);
  };

  useEffect(() => {
    dispatch(listNotification(isLimit));
  }, [dispatch, successNotiUpdate, isLimit]);

  useEffect(() => {
    socket?.on("changeNotification", function (message) {
      dispatch(listNotification(isLimit));
    });
  }, [socket]);

  const notificationElements = notifications?.map((item) => {
    return (
      <a
        key={item._id}
        className="dropdown-item d-flex align-items-center"
        style={{
          gap: 20,
          background: item?.isReaded ? "" : "mistyrose",
          cursor: "pointer",
          marginBottom: 2,
        }}
        onClick={(e) => {
          setModalNotiShow(true);
          setDataNoti(item);
          dispatch(updateNotification(item?._id));
        }}
      >
        <div className="mr-3">
          <div className="icon-circle" style={{fontSize: 20}}>
            <i className={`${item?.signature === 'EXP' ?  'fas fa-calendar-times ' : 'fas fa-exclamation-circle'} text-black`} />
          </div>
        </div>
        <div>
          <div className="small text-gray-500" style={{ color: "cadetblue" }}>
            {moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </div>
          <div className="font-weight-bold" style={{ color: "black" }}>
            {item.contents}
          </div>
        </div>
      </a>
    );
  });

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ModalNotification
        show={modalNotiShow}
        onHide={() => setModalNotiShow(false)}
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
              <Badge
                pill
                bg={userInfo.role === "isAdmin" ? "danger" : "primary"}
              >
                <Link
                  className={`dropdown-item text-white fw-bold ${
                    userInfo.role === "isAdmin" ? "bg-danger" : "bg-primary"
                  }`}
                  to="#"
                  onClick={handleMyProfile}
                >
                  <span style={{ fontSize: "16px" }}>{userInfo.name}</span>
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
            <li className="dropdown nav-item me-4">
              <Link
                className="dropdown-toggle-no-arrow"
                data-bs-toggle="dropdown"
                to="#"
              >
                <i className="fas fa-bell" style={{ color: "white" }} />
                {numberUnread > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {numberUnread}
                  </span>
                )}
              </Link>

              <div
                className="dropdown-menu dropdown-menu-end"
                style={{
                  height: 400,
                  width: 263,
                  overflowY: "auto",
                  background: "white",
                  paddingBottom: 0,
                  paddingTop: 0,
                }}
              >
                <div
                  className="dropdown-header"
                  style={{
                    borderBottom: "1px solid black",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Thông báo
                </div>
                {loading ? (
                  <div
                    style={{
                      height: 320,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Loading />
                  </div>
                ) : error ? (
                  <Message>{error}</Message>
                ) : (
                  notificationElements
                )}
                <div
                  className="dropdown-item text-center small text-gray-500"
                  style={{
                    background: "aliceblue",
                    marginTop: 5,
                    color: "black",
                    fontSize: 16,
                    fontWeight: 400,
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLimit(!isLimit);
                  }}
                >
                  {isLimit ? "Thu gọn" : "Xem tất cả"}
                </div>
              </div>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="#">
                <span style={{color: "white"}}>English</span>
              </Link>
            </li> */}

            <li className="dropdown nav-item">
              <Link
                className="dropdown-toggle-no-arrow"
                data-bs-toggle="dropdown"
                to="#"
              >
                <img
                  className="img-xs rounded-circle"
                  src="/images/user_avatar_default.png"
                  alt="User"
                />
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={handleMyProfile}
                >
                  Thông tin người dùng
                </Link>
                {/* <Link className="dropdown-item" to="#">
                  Cài đặt
                </Link> */}
                <Link
                  className="dropdown-item text-danger"
                  to="#"
                  onClick={handleLogout}
                >
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
