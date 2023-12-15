import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import axios from "axios";
import { listCategory } from "./../../Redux/Actions/CategoryAction";
import { listCategoryDrug } from "./../../Redux/Actions/CategoryDrugAction";
import { listUnit } from "./../../Redux/Actions/UnitAction";
import MyVerticallyCenteredModalUnit from "./Modal/ModalUnit";
import {
  UNIT_CREATE_RESET,
  UNIT_DELETE_RESET,
} from "../../Redux/Constants/UnitConstants";
import { listManufacturer } from "./../../Redux/Actions/ManufacturerAction";
import {
  MANUFACTURER_CREATE_RESET,
  MANUFACTURER_DELETE_RESET,
} from "../../Redux/Constants/ManufacturerConstants";
import MyVerticallyCenteredModalManufacturer from "./Modal/ModalManufacturer";
import { listCountry } from "./../../Redux/Actions/CountryOfOriginAction";
import {
  COUNTRY_CREATE_RESET,
  COUNTRY_DELETE_RESET,
} from "../../Redux/Constants/CountryOfOriginConstants";
import MyVerticallyCenteredModalCountry from "./Modal/ModalCountry";
import { listAPI } from "./../../Redux/Actions/ActivePharmaAction";
import MyVerticallyCenteredModalAPI from "./Modal/ModalActivePharma";
import {
  API_CREATE_RESET,
  API_DELETE_RESET,
} from "../../Redux/Constants/ActivePharmaConstants";
import renderToast from "../../util/Toast";
import formatCurrency from "./../../util/formatCurrency";
import { backendUrlFile } from "../../util/fileUploader";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [itemAPI, setItemAPI] = useState([]);
  const [fieldAPI, setFieldAPI] = useState({
    API: "",
    content: 0,
  });
  const [isStop, setIsStop] = useState(false);
  const [modalShowUnit, setModalShowUnit] = useState(false);
  const [modalShowManufacturer, setModalShowManufacturer] = useState(false);
  const [modalShowCountry, setModalShowCountry] = useState(false);
  const [modalShowActivePharma, setModalShowActivePharma] = useState(false);
  const [images, setImages] = useState([]);

  const [data, setData] = useState({
    name: "",
    regisId: "",
    unit: "",
    expDrug: 0,
    packing: "",
    brandName: "",
    manufacturer: "",
    countryOfOrigin: "",
    instruction: "",
    price: "",
    prescription: true,
    description: "",
    image: [],
    allowToSell: true,
  });
  var { APIs = itemAPI ? [...itemAPI] : [] } = data;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, product, error } = productCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const categoryDrugList = useSelector((state) => state.categoryDrugList);
  const { categoriesDrug } = categoryDrugList;

  //! UNIT
  const unitList = useSelector((state) => state.unitList);
  const { error: errorUnit, units } = unitList;

  const unitCreated = useSelector((state) => state.unitCreate);
  const {
    loading: loadingUnitCreate,
    error: errorUnitCreate,
    success: successUnitCreate,
  } = unitCreated;

  const unitDeleted = useSelector((state) => state.unitDelete);
  const {
    loading: loadingUnitDelete,
    error: errorUnitDelete,
    success: successUnitDelete,
  } = unitDeleted;

  //! MANUFACTURER
  const manufacturerList = useSelector((state) => state.manufacturerList);
  const { error: errorManufacturer, manufacturers } = manufacturerList;

  const manufacturerCreated = useSelector((state) => state.manufacturerCreate);
  const {
    loading: loadingManufacturerCreate,
    error: errorManufacturerCreate,
    success: successManufacturerCreate,
  } = manufacturerCreated;

  const manufacturerDeleted = useSelector((state) => state.manufacturerDelete);
  const {
    loading: loadingManufacturerDelete,
    error: errorManufacturerDelete,
    success: successManufacturerDelete,
  } = manufacturerDeleted;

  //! COUNTRY OF ORIGIN
  const countryList = useSelector((state) => state.countryList);
  const { error: errorCountry, countries } = countryList;

  const countryCreated = useSelector((state) => state.countryCreate);
  const {
    loading: loadingCountryCreate,
    error: errorCountryCreate,
    success: successCountryCreate,
  } = countryCreated;

  const countryDeleted = useSelector((state) => state.countryDelete);
  const {
    loading: loadingCountryDelete,
    error: errorCountryDelete,
    success: successCountryDelete,
  } = countryDeleted;

  //! ACTIVE PHARMA INGREDIENT (API)
  const APIList = useSelector((state) => state.APIList);
  const { error: errorAPI, API_item } = APIList;

  const APICreated = useSelector((state) => state.APICreate);
  const {
    loading: loadingAPICreate,
    error: errorAPICreate,
    success: successAPICreate,
  } = APICreated;

  const APIDeleted = useSelector((state) => state.APIDelete);
  const {
    loading: loadingAPIDelete,
    error: errorAPIDelete,
    success: successAPIDelete,
  } = APIDeleted;

  //! Handler
  const handleChange = (e) => {
    let formattedPrice = price;
    if (e.target.name === "price") {
      formattedPrice = e.target.value.replace(/\D/g, "");
    }
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      price: formattedPrice,
    }));
  };

  const handleChangeAPI = (e) => {
    setFieldAPI((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAddAPI = (e) => {
    e.preventDefault();
    let flag = false;

    if (!fieldAPI.API) {
      if (!isStop) {
        renderToast("Hoạt chất chưa được chọn", "error", setIsStop, isStop);
      }
      return;
    } else if (fieldAPI.content <= 0) {
      if (!isStop) {
        renderToast("Hàm lượng phải lớn hơn 0", "error", setIsStop, isStop);
      }
      return;
    } else {
      APIs.forEach((item, index) => {
        if (item.API === fieldAPI.API) {
          flag = true;
          APIs.splice(index, 1, {
            ...item,
            content: item.content + parseInt(fieldAPI.content),
          });
          setItemAPI(APIs);
        }
      });
      if (!flag) {
        setItemAPI((prev) => [
          ...prev,
          { ...fieldAPI, content: parseInt(content) },
        ]);
      }
    }
  };

  const handleDeleteAPI = (e, index) => {
    e.preventDefault();
    APIs.splice(index, 1);
    setItemAPI(APIs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(itemAPI.length < 1){
      toast.error("Chưa chọn hoạt chất", ToastObjects);
      return;
    }
    if (images.length === 0){
      return toast.error("Chưa chọn ảnh.",ToastObjects)
    }   
    var arrImg = [];
    if (images) {
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        const { data: dataUp } = await axios.post(
          `/api/products/single`,
          formData
        );
        if(dataUp.filename){
          arrImg.push(`${backendUrlFile.image}/${dataUp.filename}`);
        }   
      }

      data.image = arrImg;
      dispatch(createProduct({ ...data, APIs: APIs }));
      setData({
        name: "",
        regisId: "",
        unit: "",
        expDrug: 0,
        packing: "",
        brandName: "",
        manufacturer: "",
        countryOfOrigin: "",
        instruction: "",
        price: "",
        prescription: true,
        description: "",
        image: [],
        allowToSell: true,
      });
      document.getElementById("uploadFile").value = "";
    }
  };


  useEffect(() => {
    if (product) {
      toast.success("Thuốc đã được thêm", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
    if (successUnitCreate) {
      toast.success("Đơn vị tính đã được thêm", ToastObjects);
      dispatch({ type: UNIT_CREATE_RESET });
    }
    if (successUnitDelete) {
      toast.success("Đơn vị tính đã được xóa", ToastObjects);
      dispatch({ type: UNIT_DELETE_RESET });
    }
    if (successManufacturerCreate) {
      toast.success("Nhà cung cấp đã được thêm", ToastObjects);
      dispatch({ type: MANUFACTURER_CREATE_RESET });
    }
    if (successManufacturerDelete) {
      toast.success("Nhà cung cấp đã được xóa", ToastObjects);
      dispatch({ type: MANUFACTURER_DELETE_RESET });
    }
    if (successCountryCreate) {
      toast.success("Nước sản xuất đẫ được thêm", ToastObjects);
      dispatch({ type: COUNTRY_CREATE_RESET });
    }
    if (successCountryDelete) {
      toast.success("Nhà sản xuất đã được xóa", ToastObjects);
      dispatch({ type: COUNTRY_DELETE_RESET });
    }
    if (successAPICreate) {
      toast.success("Hoạt chất đã được thêm", ToastObjects);
      dispatch({ type: API_CREATE_RESET });
    }
    if (successAPIDelete) {
      toast.success("Hoạt chất đã được xóa", ToastObjects);
      dispatch({ type: API_DELETE_RESET });
    }
    dispatch(listCategory());
    dispatch(listCategoryDrug());
    dispatch(listUnit());
    dispatch(listManufacturer());
    dispatch(listCountry());
    dispatch(listAPI());
  }, [
    dispatch,
    product,
    successUnitCreate,
    successUnitDelete,
    successManufacturerCreate,
    successManufacturerDelete,
    successCountryCreate,
    successCountryDelete,
    successAPICreate,
    successAPIDelete,
  ]);
  const { API, content } = fieldAPI;
  const {
    name,
    regisId,
    category,
    categoryDrug,
    unit,
    expDrug,
    packing,
    brandName,
    manufacturer,
    countryOfOrigin,
    instruction,
    price,
    allowToSell,
    prescription,
    description,
  } = data;

  const handleUploadInput = (e) => {
    let newImages = [];
    let num = 0;
    const files = [...e.target.files];

    files.forEach((file) => {
      if (file.size > 1024 * 1024){
        toast.error("File có kích thước quá 1MB.",ToastObjects);
        return
      }
      else if (file.type !== 'image/jpeg' && file.type !== 'image/png'){
        toast.error("File không đúng định dạng.",ToastObjects);
        return   
      }
      else{
        num += 1;
        if (num <= 5) newImages.push(file)
        else  toast.error("Chỉ chọn tối đa 5 ảnh.",ToastObjects)
        return newImages;
      }
    });
    if(images.length+newImages.length<=5)
      setImages([...images, ...newImages]);
    else  toast.error("Chỉ chọn tối đa 5 ảnh.",ToastObjects)
  };
  
  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };
  
  return (
    <>
      <Toast />
      <MyVerticallyCenteredModalUnit
        data={units}
        show={modalShowUnit}
        loading={loadingUnitCreate || loadingUnitDelete}
        onHide={() => setModalShowUnit(false)}
      />

      <MyVerticallyCenteredModalManufacturer
        data={manufacturers}
        show={modalShowManufacturer}
        loading={loadingManufacturerCreate || loadingManufacturerDelete}
        onHide={() => setModalShowManufacturer(false)}
      />

      <MyVerticallyCenteredModalCountry
        data={countries}
        show={modalShowCountry}
        loading={loadingCountryCreate || loadingCountryDelete}
        onHide={() => setModalShowCountry(false)}
      />

      <MyVerticallyCenteredModalAPI
        data={API_item}
        show={modalShowActivePharma}
        loading={loadingAPICreate || loadingAPIDelete}
        onHide={() => setModalShowActivePharma(false)}
      />
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
              <h4>Thêm thuốc</h4>
            </div>
          </div>

          <div className="mb-4">
            <div className="">
              <div className="card card-custom mb-4">
                <div className="card-body">
                  {loading ? (
                    <Loading />
                  ) : error ||
                    errorUnit ||
                    errorUnitCreate ||
                    errorUnitDelete ||
                    errorManufacturer ||
                    errorCountry ||
                    errorManufacturerCreate ||
                    errorManufacturerDelete ||
                    errorCountryCreate ||
                    errorCountryDelete ||
                    errorAPI ||
                    errorAPICreate ||
                    errorAPIDelete ? (
                    <Message>
                      {error || errorUnit || errorUnitCreate || errorUnitDelete}
                    </Message>
                  ) : (
                    ""
                  )}
                  {/* //! tên thuốc - tên biệt dược - số đăng ký */}
                  <div className="mb-4 form-divided-3">
                    <div>
                      <label htmlFor="name_drug" className="form-label">
                        Tên thuốc
                      </label>
                      <input
                        onChange={handleChange}
                        value={name}
                        name="name"
                        type="text"
                        placeholder="Nhập tên thuốc"
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="brandName" className="form-label">
                        Tên biệt dược
                      </label>
                      <input
                        onChange={handleChange}
                        value={brandName}
                        name="brandName"
                        type="text"
                        placeholder="Nhập tên biệt dược"
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="product_regisId" className="form-label">
                        Số đăng ký
                      </label>
                      <input
                        onChange={handleChange}
                        value={regisId}
                        name="regisId"
                        type="text"
                        placeholder="Nhập số đăng ký"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  {/* // ! danh mục hàng hóa - danh mục thuốc - thuốc kê đơn  */}
                  <div className="mb-4 form-divided-3">
                    <div>
                      <label htmlFor="product_category" className="form-label">
                        Nhóm hàng
                      </label>
                      <select
                        value={category}
                        name="category"
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Chọn nhóm hàng</option>
                        {categories?.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="product_category_drug"
                        className="form-label"
                      >
                        Nhóm thuốc
                      </label>
                      <select
                        value={categoryDrug}
                        name="categoryDrug"
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Chọn nhóm thuốc</option>
                        {categoriesDrug?.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="product_category_drug"
                        className="form-label"
                      >
                        Thuốc kê đơn
                      </label>
                      <select
                        value={prescription}
                        name="prescription"
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="true">Thuốc kê đơn</option>
                        <option value="false">Thuốc không kê đơn</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="card card-custom mb-4">
              <div className="card-body">
                {/* // ! (đơn vị tính - giá - quy cách đóng gói) - (hoạt chất -hàm lượng)*/}
                <div className="mb-4 form-divided-custom-2">
                  <div className="d-block">
                    <div className="d-flex align-items-end mb-4">
                      <div style={{ flexGrow: "1" }}>
                        <label htmlFor="unit" className="form-label">
                          Đơn vị tính
                        </label>
                        <select
                          value={unit}
                          name="unit"
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="">Chọn đơn vị tính</option>
                          {units?.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        style={{
                          marginLeft: "10px",
                          transform: "translateY(-3px)",
                        }}
                      >
                        <button
                          className="circle-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            setModalShowUnit(true);
                          }}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="mb-4 form-divided-2">
                      <div>
                        <label htmlFor="product_price" className="form-label">
                          Giá thuốc
                        </label>
                        <input
                          name="price"
                          onChange={handleChange}
                          value={formatCurrency(price)}
                          type="text"
                          placeholder="100.000"
                          className="form-control"
                          id="product_price"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="product_category_drug"
                          className="form-label"
                        >
                          Hạn sử dụng (tháng)
                        </label>
                        <input
                          onChange={handleChange}
                          value={expDrug}
                          name="expDrug"
                          type="number"
                          placeholder="Nhập hạn sử dụng"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="product_packing" className="form-label">
                        Quy cách đóng gói
                      </label>
                      <input
                        name="packing"
                        onChange={handleChange}
                        value={packing}
                        type="text"
                        placeholder="1 Hộp = 10 Vĩ ..."
                        className="form-control"
                        id="product_packing"
                        required
                      />
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
                            Hoạt chất
                          </label>
                          <select
                            value={API}
                            name="API"
                            onChange={handleChangeAPI}
                            className="form-control"
                            required
                          >
                            <option value="">Chọn hoạt chất</option>
                            {API_item?.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div
                          style={{
                            marginLeft: "10px",
                            transform: "translateY(-3px)",
                          }}
                        >
                          <button
                            className="circle-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              setModalShowActivePharma(true);
                            }}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="d-flex align-items-end w-50 mb-3">
                        <div style={{ flexGrow: "1" }}>
                          <label
                            htmlFor="product_packing"
                            className="form-label"
                          >
                            Hàm lượng (g)
                          </label>
                          <input
                            name="content"
                            value={content}
                            onChange={handleChangeAPI}
                            type="number"
                            placeholder="Nhập số gam"
                            className="form-control"
                            id="product_packing"
                            required
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
                            onClick={handleAddAPI}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-100">
                      <div className="card card-custom">
                        <header
                          className="card-header bg-aliceblue"
                          style={{ height: "170px", overflowY: "scroll" }}
                        >
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Hoạt chất</th>
                                <th scope="col">Hàm lượng</th>
                                <th scope="col">Xóa</th>
                              </tr>
                            </thead>
                            <tbody>
                              {itemAPI?.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.API}</td>
                                  <td>{item.content}</td>
                                  <td>
                                    <button
                                      className="dropdown-item text-danger"
                                      onClick={(e) => handleDeleteAPI(e, index)}
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
            <div className="card card-custom mb-4">
              <div className="card-body">
                {/* // ! nhà sản xuất và nước sản xuất */}
                <div className="mb-4 form-divided-2">
                  <div className="d-flex align-items-end">
                    <div style={{ flexGrow: "1" }}>
                      <label htmlFor="unit" className="form-label">
                        Nhà sản xuất
                      </label>
                      <select
                        value={manufacturer}
                        name="manufacturer"
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Chọn nhà sản xuất</option>
                        {manufacturers?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        marginLeft: "10px",
                        transform: "translateY(-3px)",
                      }}
                    >
                      <button
                        className="circle-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setModalShowManufacturer(true);
                        }}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-end">
                    <div style={{ flexGrow: "1" }}>
                      <label htmlFor="unit" className="form-label">
                        Nước sản xuất
                      </label>
                      <select
                        value={countryOfOrigin}
                        name="countryOfOrigin"
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Chọn nước sản xuất</option>
                        {countries?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        marginLeft: "10px",
                        transform: "translateY(-3px)",
                      }}
                    >
                      <button
                        className="circle-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setModalShowCountry(true);
                        }}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/* // ! mô tả - lời chỉ dẫn */}
                <div className="mb-4 form-divided-1">
                  <div className="mt-2">
                    <label className="form-label">Mô tả</label>
                    <CKEditor
                      editor={ ClassicEditor }
                      data=""
                      onReady={ editor => {
                        editor.editing.view.change((writer) => {
                          writer.setStyle('height', '350px', editor.editing.view.document.getRoot());
                        });
                      } }
                      onChange={ ( event, editor ) => {
                        const demo = editor.getData();
                        setData({ ...data, description: demo });
                      } }
                    />

                  </div>
                  <div className="mt-2">
                    <label className="form-label">Lời chỉ dẫn</label>
                    <CKEditor
                      editor={ ClassicEditor }
                      data=""
                      onReady={ editor => {
                        editor.editing.view.change((writer) => {
                          writer.setStyle('height', '350px', editor.editing.view.document.getRoot());
                        });
                      } }
                      onChange={ ( event, editor ) => {
                        const demo = editor.getData();
                        setData({ ...data, instruction: demo });
                      } }
                    />
                  </div>
                </div>
                {/* // ! ảnh - cho phép bán */}
                <div className="mb-4 form-divided-2">
                  <div>
                    <div className="mb-3">
                      <label className="form-label">
                        Hình ảnh (tối đa 5 ảnh)
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="uploadFile"
                        onChange={handleUploadInput}
                        multiple
                        accept="image/*"
                      />
                    </div>
                    <div className="row img-up">
                      {images.map((img, index) => (
                        <div key={index} className="file_img my-1">
                          <img
                            src={img.url ? img.url : URL.createObjectURL(img)}
                            alt=""
                            className="img-thumbnail rounded"
                          />
                          <span onClick={() => deleteImage(index)}>X</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="form-check form-switch">
                    <label className="form-label d-flex">
                      Thuốc được phép bán
                    </label>
                    <input
                      style={{
                        transform: "scale(1.5)",
                        marginTop: "10px",
                        marginLeft: "10px",
                      }}
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked={allowToSell}
                      name="allowToSell"
                      onChange={() =>
                        setData((prev) => {
                          return {
                            ...prev,
                            allowToSell: !allowToSell,
                          };
                        })
                      }
                    />
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
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
