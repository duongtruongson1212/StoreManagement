import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { singleContent } from "../../Redux/Actions/ContentAction";
import Toast from "../LoadingError/Toast";
import axios from "axios";
import {
  PAGE_CREATE_RESET,
  PAGE_DELETE_RESET,
} from "../../Redux/Constants/PageConstants";
import {
  CONTACT_CREATE_RESET,
  CONTACT_DELETE_RESET,
} from "../../Redux/Constants/ContactConstants";
import renderToast from "../../util/Toast";
import { updateContent } from "../../Redux/Actions/ContentAction";
import { CONTENT_UPDATE_RESET } from "../../Redux/Constants/ContentConstants";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const EditContentMain = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [itemPage, setItemPage] = useState([]);
  const [fieldBanner, setFieldBanner] = useState({
    image: null,
    link: "",
  });
  const [fieldPage, setFieldPage] = useState({
    name: "",
    link: "",
  });
  const [itemContact, setItemContact] = useState([]);
  const [fieldContact, setFieldContact] = useState({
    type: "",
    phoneNum: "",
  });
  const [isStop, setIsStop] = useState(false);

  // const [isEdited, setIsEdited] = useState(false);

  const [images, setImages] = useState([]);
  const [imageLogo, setImageLogo] = useState("");
  const [imageQR, setImageQR] = useState("");

  const [data, setData] = useState({
    logo: "",
    phone: "",
    companyName: "",
    banners: [],
    companyAddress: "",
    fbUrl: "",
    zaloUrl: "",
    qrCode: "",
  });

  const contentUpdate = useSelector((state) => state.contentSingle);
  const {  contentUp } = contentUpdate;
  const contentUpdated = useSelector((state) => state.contentUpdate);
  const { success } = contentUpdated;
  const pageCreated = useSelector((state) => state.pageCreate);
  const {
    success: successPageCreate,
  } = pageCreated;

  const pageDeleted = useSelector((state) => state.pageDelete);
  const {
 
    success: successPageDelete,
  } = pageDeleted;

  const contactCreated = useSelector((state) => state.contactCreate);
  const {
   
    success: successContactCreate,
  } = contactCreated;

  const contactDeleted = useSelector((state) => state.contactDelete);
  const {
  
    success: successContactDelete,
  } = contactDeleted;

  //! Handler
  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  //! PAGE
  const handleChangePage = (e) => {
    setFieldPage((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddPage = (e) => {
    e.preventDefault();
    let flag = false;

    if (!fieldPage.name) {
      if (!isStop) {
        renderToast("Tên trang bị bỏ trống", "error", setIsStop, isStop);
      }
      return;
    } else if (!fieldPage.link) {
      if (!isStop) {
        renderToast("Link liên kết bị bỏ trống", "error", setIsStop, isStop);
      }
      return;
    } else {
      if (!flag) {
        setItemPage((prev) => [...prev, { ...fieldPage }]);
        toast.success("Thêm trang thành công.", ToastObjects);
        setFieldPage({
          name: "",
          link: "",
        });
      }
    }
  };

  const handleEditPage = (e, item) => {
    e.preventDefault();
    setFieldPage({ name: item.name, link: item.link });
  };

  const handleDeletePage = (e, index) => {
    e.preventDefault();
    const newArr = [...itemPage];
    newArr.splice(index, 1);
    setItemPage(newArr);
  };

  //! Contact
  const handleChangeContact = (e) => {
    setFieldContact((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    let flag = false;

    if (!fieldContact.type) {
      if (!isStop) {
        renderToast("Loại liên hệ bị bỏ trống.", "error", setIsStop, isStop);
      }
      return;
    } else if (!fieldContact.phoneNum) {
      if (!isStop) {
        renderToast("Số diện thoại bị bỏ trống", "error", setIsStop, isStop);
      }
      return;
    } else {
      if (!flag) {
        setItemContact((prev) => [...prev, { ...fieldContact }]);
        toast.success("Thêm liên hệ thành công.", ToastObjects);
        setFieldContact({
          type: "",
          phoneNum: "",
        });
      }
    }
  };

  const handleDeleteContact = (e, index) => {
    e.preventDefault();
    const newArr = [...itemContact];
    newArr.splice(index, 1);
    setItemContact(newArr);
  };
  const handleEditContact = (e, item) => {
    e.preventDefault();

    setFieldContact({ type: item.type, phoneNum: item.phoneNum });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var imgNewFiles = images.filter((img) => img.image.name);
    var imgOldURL = images.filter((img) => !img.image.name); //[url for banner]
    let bannerNew = [];
    let logoNew = "";
    let qrNew = "";
    if (imgNewFiles) {
      for (const image of imgNewFiles) {
        let formData = new FormData();
        formData.append("image", image.image);
        let { data: dataUpdate } = await axios.post(
          `/api/products/single`,
          formData
        );
        imgOldURL.push({
          link: image.link,
          image: process.env.REACT_APP_BE_URL+"/upload/" + dataUpdate.filename,
        });
      }
      bannerNew = imgOldURL;
    }

    //upload logo
    if (imageLogo?.name) {
      let formData = new FormData();
      formData.append("image", imageLogo);
      let { data: dataUpdate } = await axios.post(
        `/api/products/single`,
        formData
      );
      const imglogoUrl = dataUpdate.filename;
      logoNew =process.env.REACT_APP_BE_URL+"/upload/"+ imglogoUrl;
    }

    //upload qrCode
    if (imageQR?.name) {
      var formData = new FormData();
      formData.append("image", imageQR);
      var { data: dataUpdate } = await axios.post(
        `/api/products/single`,
        formData
      );
      const imgqrCodeUrl = dataUpdate.filename;
      qrNew = process.env.REACT_APP_BE_URL+"/upload/"+imgqrCodeUrl;
    }

    const dataPost = {
      ...data,
      banners: [...bannerNew],
      logo: logoNew!=""?logoNew:data.logo,
      qrCode: qrNew!=""?qrNew:data.qrCode,
      links: [...itemPage],
      contacts: [...itemContact],
    };
    dispatch(
      updateContent({
        ...dataPost,
      })
    );
  };

  useEffect(() => {
    if (success) {
      toast.success("Nội dung đã được cập nhật", ToastObjects);
      dispatch(singleContent());
      dispatch({ type: CONTENT_UPDATE_RESET });
    }
    if (successPageCreate) {
      toast.success("Trang đã được thêm", ToastObjects);
      dispatch({ type: PAGE_CREATE_RESET });
    }
    if (successPageDelete) {
      toast.success("Trang đã được xóa", ToastObjects);
      dispatch({ type: PAGE_DELETE_RESET });
    }
    if (successContactCreate) {
      toast.success("Liên hệ đã được thêm", ToastObjects);
      dispatch({ type: CONTACT_CREATE_RESET });
    }
    if (successContactDelete) {
      toast.success("Liên hệ đã được xóa", ToastObjects);
      dispatch({ type: CONTACT_DELETE_RESET });
    }
  }, [
    dispatch,
    successPageCreate,
    successPageDelete,
    successContactCreate,
    successContactDelete,
    success
  ]);

  useEffect(() => {
   
    if (!contentUp?._id) {
      dispatch(singleContent());
    } else if (contentUp?._id) {
      setData({
        logo: contentUp.logo,
        phone: contentUp.phone,
        companyName: contentUp.companyName,
        companyAddress: contentUp.companyAddress,
        fbUrl: contentUp.fbUrl,
        zaloUrl: contentUp.zaloUrl,
        qrCode: contentUp.qrCode,
        banners: contentUp.banners,
      });
      setImages(contentUp.banners);
      setImageLogo(contentUp.logo);
      setImageQR(contentUp.qrCode);
      setItemPage(contentUp.links);
      setItemContact(contentUp.contacts);
    }
    // eslint-disable-next-line
  }, [dispatch, contentUp?._id]);

  

  const {  phone, companyName, companyAddress, fbUrl, zaloUrl } =
    data;

  const handleUploadInputLogo = (e) => {
    const file = [...e.target.files];
    setImageLogo(file?.[0]);
  };

  const handleUploadInputQR = (e) => {
    const file = [...e.target.files];
    setImageQR(file?.[0]);
  };
  const handleChangeBanner = (e) => {
    const { name, value, files } = e.target;
    setFieldBanner((prevState) => ({
      ...prevState,
      [name]: name === "image" ? files[0] : value,
    }));
  };
  const handleAddBanner = (e) => {
    e.preventDefault();
    let flag = false;

    if (!fieldBanner.image) {
      if (!isStop) {
        renderToast("Chưa chọn file.", "error", setIsStop, isStop);
      }
      return;
    } else if (!fieldBanner.link) {
      if (!isStop) {
        renderToast("Link liên kết bị bỏ trống", "error", setIsStop, isStop);
      }
      return;
    } else {
      if (!flag) {
        if (images.length < 7) {
          setImages((prev) => [...prev, { ...fieldBanner }]);
          toast.success("Thêm Banner thành công.", ToastObjects);
        } else toast.error("Vượt quá số lượng cho phép.", ToastObjects);
      }
    }
    setFieldBanner({
      image: null,
      link: "",
    });
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };
  return (
    <>
      <Toast />

      <section className="content-main">
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <div
              className="content-title d-flex"
              onClick={(e) => {
                e.preventDefault();
                history.push("/products");
              }}
            >
              <h4 className="arrow-breadcrum">
                <i className="fas fa-arrow-left"></i>
              </h4>
              <h4>Quản lý nội dung trang bán hàng</h4>
            </div>
          </div>

          <div className="mb-4">
            <div className="">
              <h3>Header</h3>
              <div className="card card-custom mb-4">
                <div className="card-body">
                  <div className="mb-4 form-divided-2">
                    <div>
                      <div className="mb-3">
                        <label className="form-label">Logo công ty</label>
                        <input
                          type="file"
                          className="form-control"
                          id="uploadFileLogo"
                          onChange={handleUploadInputLogo}
                        />
                      </div>
                      <div className="row img-up">
                        <div key="" className="file_img my-1 w-50 h-50">
                          <img
                            src={
                              imageLogo?.name
                                ? URL.createObjectURL(imageLogo)
                                : imageLogo
                            }
                            alt=""
                            className="img-thumbnail rounded"
                          />

                          <span onClick={() => setImageLogo("")}>X</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="form-label">
                        Số điện thoại
                      </label>
                      <input
                        onChange={handleChange}
                        value={phone}
                        name="phone"
                        type="text"
                        placeholder="Nhập tên biệt dược"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3>Banners</h3>
            <div className="card card-custom mb-4">
              <div className="card-body">
                {/* // ! (hoạt chất -hàm lượng)*/}
                <div className="mb-4 form-divided-custom-1">
                  <div className="d-flex flex-wrap">
                    <div
                      style={{
                        display: "flex",
                        gridGap: "30px",
                        width: "-webkit-fill-available",
                      }}
                    >
                      <div className="d-flex align-items-end w-50 mb-3">
                        <div style={{ flexGrow: "1" }}>
                          <label htmlFor="unit" className="form-label">
                            Hình ảnh
                          </label>

                          <input
                            type="file"
                            name="image"
                            className="form-control"
                            id="uploadFileBanner"
                            onChange={handleChangeBanner}
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-end w-50 mb-3">
                        <div style={{ flexGrow: "1" }}>
                          <label
                            htmlFor="product_packing"
                            className="form-label"
                          >
                            Link liên kết
                          </label>
                          <input
                            name="link"
                            value={fieldBanner.link}
                            onChange={handleChangeBanner}
                            type="text"
                            placeholder="Nhập liên kết"
                            className="form-control"
                            id="product_packing"
                          />
                        </div>
                        <div
                          style={{
                            marginLeft: "10px",
                            transform: "translateY(-3px)",
                          }}
                        >
                          <button
                            className="btn btn-success"
                            onClick={handleAddBanner}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-100">
                      <div className="card card-custom">
                        <header
                          className="card-header bg-white"
                          style={{ height: "170px", overflowY: "scroll" }}
                        >
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">Link liên kết</th>
                                <th scope="col-2">Hành động</th>
                              </tr>
                            </thead>
                            <tbody>
                              {images?.map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    <img
                                    alt="banner"
                                      src={
                                        item?.image?.name
                                          ? URL.createObjectURL(item.image)
                                          : item.image
                                      }
                                      className=""
                                      style={{ width: "200px" }}
                                    />
                                  </td>
                                  <td>{item.link}</td>
                                  <td>
                                    {/*<button className="dropdown-item text-warning" onClick={(e) => handleDele(e,index)}>
                                      <i className="fas fa-edit"></i>
                                    </button>*/}
                                  </td>
                                  <td>
                                    <button
                                      className="dropdown-item text-danger"
                                      onClick={(e) => deleteImage(e, index)}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </header>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3>Footer</h3>
            <div className="card card-custom mb-4">
              <div className="card-body">
                {/* // ! tên cty - đại chỉ */}
                <div className="mb-4 form-divided-2">
                  <div>
                    <label className="form-label">Tên công ty</label>
                    <textarea
                      name="companyName"
                      placeholder="Nhập tên Công ty"
                      className="form-control"
                      rows="4"
                      required
                      onChange={handleChange}
                      value={companyName}
                    ></textarea>
                  </div>
                  <div>
                    <label className="form-label">Địa chỉ</label>
                    <textarea
                      name="companyAddress"
                      placeholder="Nhập địa chỉ công ty"
                      className="form-control"
                      rows="4"
                      required
                      onChange={handleChange}
                      value={companyAddress}
                    ></textarea>
                  </div>
                </div>

                {/* // ! liên kết - liên hệ */}
                <div className="mb-4 form-divided-2">
                  <div className="d-flex flex-wrap">
                    <div
                      style={{
                        display: "flex",
                        gridGap: "30px",
                        width: "-webkit-fill-available",
                      }}
                    >
                      <div className="d-flex align-items-end w-50 mb-3">
                        <div style={{ flexGrow: "1" }}>
                          <label htmlFor="unit" className="form-label">
                            Tên trang
                          </label>
                          <input
                            name="name"
                            value={fieldPage.name}
                            onChange={handleChangePage}
                            type="text"
                            placeholder="Nhập tên trang"
                            className="form-control"
                            id="product_packing"
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-end w-50 mb-3">
                        <div style={{ flexGrow: "1" }}>
                          <label
                            htmlFor="product_packing"
                            className="form-label"
                          >
                            Liên kết
                          </label>
                          <input
                            name="link"
                            value={fieldPage.link}
                            onChange={handleChangePage}
                            type="text"
                            placeholder="Nhập liên kết"
                            className="form-control"
                            id="product_packing"
                          />
                        </div>
                        <div
                          style={{
                            marginLeft: "10px",
                            transform: "translateY(-3px)",
                          }}
                        >
                          <button
                            className="btn btn-success"
                            onClick={handleAddPage}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-100">
                      <div className="card card-custom">
                        <header
                          className="card-header bg-white"
                          style={{ height: "170px", overflowY: "scroll" }}
                        >
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Trang</th>
                                <th scope="col">Link liên kết</th>
                                <th scope="col">Hành động</th>
                              </tr>
                            </thead>
                            <tbody>
                              {itemPage?.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.name}</td>
                                  <td>{item.link}</td>
                                  <td>
                                    <button
                                      className="dropdown-item text-warning"
                                      onClick={(e) => handleEditPage(e, item)}
                                    >
                                      <i className="fas fa-edit"></i>
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      className="dropdown-item text-danger"
                                      onClick={(e) =>
                                        handleDeletePage(e, index)
                                      }
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </header>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap">
                    <div
                      style={{
                        display: "flex",
                        gridGap: "30px",
                        width: "-webkit-fill-available",
                      }}
                    >
                      <div className="d-flex align-items-end w-50 mb-3">
                        <div style={{ flexGrow: "1" }}>
                          <label htmlFor="unit" className="form-label">
                            Loại liên lạc
                          </label>
                          <input
                            name="type"
                            value={fieldContact.type}
                            onChange={handleChangeContact}
                            type="text"
                            placeholder="Nhập loại liên lạc"
                            className="form-control"
                            id="product_packing"
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-end w-50 mb-3">
                        <div style={{ flexGrow: "1" }}>
                          <label
                            htmlFor="product_packing"
                            className="form-label"
                          >
                            Số điện thoại
                          </label>
                          <input
                            name="phoneNum"
                            value={fieldContact.phoneNum}
                            onChange={handleChangeContact}
                            type="text"
                            placeholder="Nhập số điện thoại"
                            className="form-control"
                            id="product_packing"
                          />
                        </div>
                        <div
                          style={{
                            marginLeft: "10px",
                            transform: "translateY(-3px)",
                          }}
                        >
                          <button
                            className="btn btn-success"
                            onClick={handleAddContact}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-100">
                      <div className="card card-custom">
                        <header
                          className="card-header bg-white"
                          style={{ height: "170px", overflowY: "scroll" }}
                        >
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Loại</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Hành động</th>
                              </tr>
                            </thead>
                            <tbody>
                              {itemContact?.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.type}</td>
                                  <td>{item.phoneNum}</td>
                                  <td>
                                    <button
                                      className="dropdown-item text-warning"
                                      onClick={(e) =>
                                        handleEditContact(e, item)
                                      }
                                    >
                                      <i className="fas fa-edit"></i>
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      className="dropdown-item text-danger"
                                      onClick={(e) =>
                                        handleDeleteContact(e, index)
                                      }
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </header>
                      </div>
                    </div>
                  </div>
                </div>

                {/* // ! fb url */}
                <div className="mb-4 form-divided-1">
                  <div>
                    <label className="form-label">Facebook</label>
                    <input
                      name="fbUrl"
                      placeholder="Nhập link Facebook"
                      className="form-control"
                      rows="4"
                      required
                      onChange={handleChange}
                      value={fbUrl}
                    />
                  </div>
                </div>

                {/* // ! zalo url */}
                <div className="mb-4 form-divided-1">
                  <div>
                    <label className="form-label">Zalo</label>
                    <input
                      name="zaloUrl"
                      placeholder="Nhập link Zalo"
                      className="form-control"
                      rows="4"
                      required
                      onChange={handleChange}
                      value={zaloUrl}
                    />
                  </div>
                </div>

                {/* // ! ảnh - cho phép bán */}
                <div className="mb-4 form-divided-2">
                  <div>
                    <div className="mb-3">
                      <label className="form-label">QR Code</label>
                      <input
                        type="file"
                        className="form-control"
                        id="uploadFileQR"
                        onChange={handleUploadInputQR}
                      />
                    </div>
                    <div className="row img-up">
                      <div key="" className="file_img my-1 w-50 h-50">
                        <img
                          src={
                            imageQR?.name
                              ? URL.createObjectURL(imageQR)
                              : imageQR
                          } //imageQR?URL.createObjectURL(imageQR):
                          alt=""
                          className="img-thumbnail rounded "
                        />
                        <span onClick={() => setImageQR("")}>X</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary mb-4"
                      style={{ float: "right" }}
                    >
                      Lưu lại
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditContentMain;
