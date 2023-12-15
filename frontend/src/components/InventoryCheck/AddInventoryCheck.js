import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { listUser } from "../../Redux/Actions/UserActions";
import { Link, useHistory } from "react-router-dom";
import Toast from "../LoadingError/Toast";
import moment from "moment";
import renderToast from "../../util/Toast";
import { listInventoryToCheck } from "../../Redux/Actions/InventoryAction";
import {
  INVENTORY_CHECK_CREATE_RESET,
  INVENTORY_CHECK_LIST_ITEM_RESET,
} from "../../Redux/Constants/InventoryCheckConstant";
import { createInventoryCheck } from "../../Redux/Actions/InventoryCheckAction";
import MyVerticallyCenteredModalListCategory from "./ModalActivePharma";
import { listCategory } from "../../Redux/Actions/CategoryAction";
import Select from "react-select";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddInventoryCheck = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const createInventoryCheckStatus = useSelector(
    (state) => state.inventoryCheckCreate
  );
  const { success } = createInventoryCheckStatus;

  const inventoryList = useSelector((state) => state.inventoryToCheckList);
  const { inventories } = inventoryList;

  const inventoryCheckListItem = useSelector(
    (state) => state.inventoryCheckListItem
  );
  const { inventoryCheckItem } = inventoryCheckListItem;
  const categoryList = useSelector((state) => state.categoryList);
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const [isStop, setIsStop] = useState(false);
  const [itemProducts, setItemProducts] = useState([]);
  const [modalShowActivePharma, setModalShowActivePharma] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [field, setFieldProduct] = useState({
    _id: "",
    name: "",
    product: "",
    lotNumber: "",
    expDrug: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    count: 0,
    realQty: "",
    unequal: 0,
  });

  const [data, setData] = useState({
    checkedAt: moment(new Date(Date.now())).format("YYYY-MM-DD"),
  });

  var {
    note,
    importItems = itemProducts ? [...itemProducts] : [],
    user,
    checkedAt,
  } = data;
  const { _id } = field;

  const handleChange = (e) => {
    e.preventDefault();
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleChangeRealQty = (e, id) => {
    itemProducts.forEach((item, index) => {
      if (item._id === id) {
        let realQty = parseInt(e.target.value) || "";

        importItems.splice(index, 1, {
          ...item,
          realQty,
          unequal: realQty - parseInt(item.count),
        });
        setItemProducts([...importItems]);
      }
    });
  };

  // const handleChangeProduct = (e) => {
  //   e.preventDefault();
  //   setFieldProduct(() => {
  //     let a = document.getElementById("select-product");
  //     let b = a.options[a.selectedIndex];
  //     let c = b.getAttribute("data-inventory");

  //     let data = c ? JSON.parse(c) : {};
  //     return {
  //       _id: data._id,
  //       name: data.idDrug.name,
  //       product: data.idDrug._id,
  //       lotNumber: data.lotNumber,
  //       count: data.count,
  //       expDrug: data.expDrug,
  //       realQty: "",
  //       unequal: -data.count,
  //     };
  //   });
  // };

  const handleAddProduct = (e) => {
    e.preventDefault();
    let flag = false;

    if (!field.product) {
      if (!isStop) {
        renderToast("Sản phẩm chưa được chọn", "error", setIsStop, isStop);
      }
      return;
    } else {
      importItems.forEach((item) => {
        if (item._id === field._id) {
          flag = true;
          renderToast("Sản phẩm đã được chọn", "error", setIsStop, isStop);
        }
      });
      if (!flag) {
        setItemProducts((prev) => [...prev, { ...field }]);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createInventoryCheck({
        ...data,
        checkItems: [...importItems],
      })
    );
  };
  const handleDeleteItem = (e, index) => {
    e.preventDefault();
    importItems.splice(index, 1);
    setItemProducts(importItems);
  };
  const checkExsistItem = (item) => {
    let flag = false;
    itemProducts.forEach((product) => {
      if (product._id === item._id) {
        flag = true;
        return;
      }
    });
    return flag;
  };
  useEffect(() => {
    if (inventoryCheckItem?.length > 0) {
      const getList = inventoryCheckItem?.map((item, index) => {
        return !checkExsistItem(item) && {
          _id: item?._id,
          name: item?.idDrug?.name,
          product: item?.idDrug?._id,
          lotNumber: item?.lotNumber,
          count: item?.count,
          expDrug: item?.expDrug,
          realQty: "",
          unequal: -item?.count,
        };
      });
      setItemProducts((prev) => [...prev, ...getList.filter((item) => item !== false)]);
    }
    // eslint-disable-next-line
  }, [inventoryCheckItem]);

  useEffect(() => {
    if (success) {
      toast.success(`Tạo phiếu kiểm thành công`, ToastObjects);
      dispatch({ type: INVENTORY_CHECK_CREATE_RESET });
      dispatch({ type: INVENTORY_CHECK_LIST_ITEM_RESET });
      setData({
        note: "",
        checkedAt: moment(new Date(Date.now())).format("YYYY-MM-DD"),
      });
      setFieldProduct({
        _id: "",
        name: "",
        product: "",
        lotNumber: "",
        expDrug: moment(new Date(Date.now())).format("YYYY-MM-DD"),
        count: 0,
        realQty: 0,
        unequal: 0,
      });
      setSelectedProduct({})
      setItemProducts([]);
    }
    
    dispatch(listInventoryToCheck());
    dispatch(listUser());
    dispatch(listCategory());
    return () => {
      dispatch({ type: INVENTORY_CHECK_LIST_ITEM_RESET });
    }
  }, [success, dispatch]);
  // start search input
  const options = [];
  if(inventories?.length > 0){
    inventories.map((p) => {
      options.push({ value: p?.idDrug?._id, label: p.idDrug.name, lotNumber: p.lotNumber ,dataFoo: p.idDrug.name, dataInventory: JSON.stringify(p)} )
    })
    
  }
  const handleChangeProduct = (selectedOptions) => {
    setFieldProduct(() => {
      let data = selectedOptions.dataInventory ? JSON.parse(selectedOptions.dataInventory) : {};
          return {
            _id: data._id,
            name: data.idDrug.name,
            product: data.idDrug._id,
            lotNumber: data.lotNumber,
            count: data.count,
            expDrug: data.expDrug,
            realQty: "",
            unequal: -data.count,
          };
      })
    setSelectedProduct(selectedOptions);
    
  };

  const selectedOptions = selectedProduct
  // end search input
  return (
    <>
      <Toast />
      <MyVerticallyCenteredModalListCategory
        data={categoryList}
        show={modalShowActivePharma}
        setModalShowActivePharma={setModalShowActivePharma}
      />
      <section className="content-main">
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <div
              className="content-title d-flex"
              onClick={(e) => {
                e.preventDefault();
                history.push("/inventory-check");
              }}
            >
              <h4 className="arrow-breadcrum">
                <i className="fas fa-arrow-left"></i>
              </h4>
              <h3>Tạo phiếu kiểm kê kho</h3>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Tạo phiếu
              </button>
            </div>
          </div>
          <div className="mb-4">
            <div className="card card-custom mb-4 shadow-sm">
              <div className="card-body">
                <div className="mb-4 form-divided-2">
                  <div>
                    <label htmlFor="product_category" className="form-label">
                      Người kiểm
                    </label>
                    <select
                      value={user}
                      name="user"
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Chọn người kiểm</option>
                      {users?.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div>
                      <label className="form-label">Ngày kiểm</label>
                      <input
                        id="datePicker"
                        name="checkedAt"
                        className="form-control"
                        type="date"
                        required
                        onChange={handleChange}
                        value={checkedAt}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="mb-4 form-divided-2">
                  <div>
                    <div>
                      <label className="form-label">Ghi chú</label>
                      <textarea
                        name="note"
                        placeholder="Nhập ghi chú, lý do kiểm, tình trạng khi kiểm,..."
                        className="form-control"
                        rows="4"
                        required
                        onChange={handleChange}
                        value={note}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="card card-custom mb-4 shadow-sm">
              <div className="card-body">
                <div className="mb-4 form-divided-2">
                  <div>
                    <label htmlFor="product_category" className="form-label">
                      Tên thuốc
                    </label>
                    <Select
                      options={options}
                      value={selectedOptions}
                      onChange={handleChangeProduct}
                      placeholder="Tag"
                      getOptionLabel={(option) => (
                        selectedOptions && (
                          <div data-foo={option.dataFoo}>
                            {option.label} {option.label && `- (Số lô: ${option.lotNumber})`}
                          </div>
                        )
                      )}
                      getOptionValue={(option) => option.value}
                      filterOption={(option, inputValue) =>
                        option.data.label.toLowerCase().includes(inputValue.toLowerCase())
                      }
                    />
                    {/* <select
                      id="select-product"
                      value={_id}
                      name="product"
                      onChange={handleChangeProduct}
                      className="form-control"
                    >
                      <option value="">Chọn thuốc</option>
                      {inventories?.map((item, index) => (
                        <option
                          key={index}
                          value={item._id}
                          data-inventory={JSON.stringify(item)}
                        >
                          {item.idDrug.name} - (Số lô: {item.lotNumber})
                        </option>
                      ))}
                    </select> */}
                  </div>
                  <div>
                    <label htmlFor="product_category" className="form-label">
                      Chọn nhóm thuốc
                    </label>
                    <div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setModalShowActivePharma(true);
                        }}
                      >
                        {" "}
                        <i
                          style={{ fontSize: "30px" }}
                          className="fa fa-list"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="mb-6 d-flex justify-content-end">
                  <button
                    className="btn btn-success"
                    onClick={handleAddProduct}
                  >
                    Thêm sản phẩm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="card-body">
          <div className="row">
            <div className="card card-custom mb-4 shadow-sm">
              <header className="card-header bg-aliceblue ">
                <div className="row gx-3 py-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên thuốc</th>
                        <th scope="col">Số lô</th>
                        <th scope="col">Hạn sử dụng</th>
                        <th scope="col">Tồn kho</th>
                        <th scope="col">Thực kiểm</th>
                        <th scope="col">Chênh lệch</th>
                        <th scope="col">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemProducts?.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.name}</td>
                          <td>{item.lotNumber}</td>
                          <td>{moment(item.expDrug).format("DD-MM-YYYY")}</td>
                          <td>{item.count}</td>
                          <td width="200px" colSpan="1">
                            <input
                              name="realQty"
                              className="form-control"
                              required
                              onChange={(e) => handleChangeRealQty(e, item._id)}
                              type="number"
                              value={item.realQty}
                              min={0}
                            />
                          </td>
                          <td>{item.unequal}</td>
                          <td>
                            <div className="dropdown">
                              <Link
                                to="#"
                                data-bs-toggle="dropdown"
                                className="btn btn-light"
                              >
                                <i className="fas fa-ellipsis-h"></i>
                              </Link>
                              <div className="dropdown-menu">
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={(e) => handleDeleteItem(e, index)}
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mb-6 d-flex justify-content-end">
                    {`Tổng cộng: ${itemProducts.length} sản phẩm đang được kiểm`}
                  </div>
                </div>
              </header>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddInventoryCheck;
