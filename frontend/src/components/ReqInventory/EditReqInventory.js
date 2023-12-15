import React, { useEffect, useState } from "react";
import {
  singleReqInventory,
  updateReqInventory,
} from "../../Redux/Actions/RequestInventoryAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { listProvider } from "../../Redux/Actions/ProviderAction";
import { listUser } from "../../Redux/Actions/UserActions";
import { listProductWithQty } from "./../../Redux/Actions/ProductActions";
import { useHistory } from "react-router-dom";
import Toast from "../LoadingError/Toast";
import {
  REQ_INVENTORY_DETAILS_RESET,
  REQ_INVENTORY_UPDATE_RESET,
} from "../../Redux/Constants/RequestInventoryConstant";
import moment from "moment";
import renderToast from "../../util/Toast";
import DataTable from "react-data-table-component";
import NoRecords from "../../util/noData";
import Select from "react-select";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const EditImportStock = (props) => {
  const { reqId } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const reqDetail = useSelector((state) => state.reqInventoryDetail);
  const { reqInventoryItem } = reqDetail;

  const providerList = useSelector((state) => state.providerList);
  const { providers } = providerList;

  const productList = useSelector((state) => state.productListWithQty);
  const { products } = productList;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const reqUpdate = useSelector((state) => state.reqInventoryUpdate);
  const { success } = reqUpdate;

  const [isStop, setIsStop] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [itemProducts, setItemProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [field, setFieldProduct] = useState({
    name: "",
    product: "",
    unit: "",
    qty: 0,        
    dataTotal: 0
  });

  const [data, setData] = useState({
    requestedAt: moment(new Date(Date.now())).format("YYYY-MM-DD"),
    note: "",
  });

  var {
    provider,
    requestItems = itemProducts ? [...itemProducts] : [],
    user,
    requestedAt,
    note,
  } = data;
  // eslint-disable-next-line
  const { product, qty } = field;

  const handleFocus = (event) => {
    // Xóa các ký tự 0 ở đầu nếu có
    if (event.target.value.startsWith("0")) {
      event.target.value = event.target.value.replace(/^0+/, "");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  // const handleChangeProduct = e =>{
  //     e.preventDefault();
  //     if(!isEdited){
  //         setIsEdited(true)
  //     }
  //     setFieldProduct(prev => {
  //         let a = document.getElementById("select-product");
  //         let b = a.options[a.selectedIndex]
  //         let c = b.getAttribute('data-foo')
  //         let d = b.getAttribute('data-unit')
  //         return {
  //             ...prev,
  //             name:c,
  //             unit:d,
  //             [e.target.name]: e.target.value,
  //           }
  //     })
  // }

  const handleAddProduct = (e) => {
    e.preventDefault();
    let flag = false;
    if (!field.product) {
      if (!isStop) {
        renderToast("Sản phẩm chưa được chọn", "error", setIsStop, isStop);
      }
      return;
    } else if (field.qty <= 0) {
      if (!isStop) {
        renderToast("Số lượng nhập phải lớn hơn 0", "error", setIsStop, isStop);
      }
      return;
    }
    itemProducts.forEach((item, index) => {
      if ((item.product._id || item.product) === field.product) {
        flag = true;
        itemProducts.splice(index, 1, { ...item, qty: parseInt(field.qty) });
        setItemProducts(JSON.parse(JSON.stringify(itemProducts)));
      }
    });

    if (!flag) {
      setItemProducts((prev) => [...prev, { ...field, qty: parseInt(qty) }]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateReqInventory({
        ...data,
        requestItems: itemProducts,
        reqId,
      })
    );
  };

  const handleDeleteItem = (e, index) => {
    e.preventDefault();
    if (!isEdited) {
      setIsEdited(true);
    }
    itemProducts.splice(index, 1);
    setItemProducts(JSON.parse(JSON.stringify(itemProducts)));
  };

  useEffect(() => {
    dispatch(listProvider());
    dispatch(listProductWithQty());
    dispatch(listUser());
    if (success) {
      toast.success(`Cập nhập đơn thành công`, ToastObjects);
      dispatch({ type: REQ_INVENTORY_DETAILS_RESET });
      dispatch({ type: REQ_INVENTORY_UPDATE_RESET });
      setSelectedProduct({});
      dispatch(singleReqInventory(reqId));
    }
    if (reqId !== reqInventoryItem?._id) {
      dispatch(singleReqInventory(reqId));
    } else if (reqId === reqInventoryItem?._id && !isEdited) {
      setData({
        provider: reqInventoryItem?.provider?._id,
        user: reqInventoryItem?.user?._id,
        requestItems: reqInventoryItem?.requestItems,
        requestedAt: moment(reqInventoryItem?.requestedAt).format("YYYY-MM-DD"),
        note: reqInventoryItem?.note,
        status: reqInventoryItem?.status,
      });
      if (itemProducts.length === 0 && !isEdited) {
        setItemProducts(JSON.parse(JSON.stringify(requestItems)));
      }
    }
  }, [dispatch, reqInventoryItem, reqId, itemProducts, isEdited, success]);
  const customStyles = {
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "rgb(230, 244, 244)",
        borderBottomColor: "#FFFFFF",
        // borderRadius: '25px',
        outline: "1px solid #FFFFFF",
      },
    },
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        fontSize: "16px",
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "grey",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "grey",
        },
      },
    },
    cells: {
      style: {
        fontSize: "16px",
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "grey",
        },
      },
    },
  };

  const columns = [
    {
      name: "STT",
      selector: (row, index) => <b>{index + 1}</b>,
      reorder: true,
      width: "60px",
    },
    {
      name: "Tên thuốc",
      selector: (row) => row?.name,
      sortable: true,
      reorder: true,
      grow: 3,
    },
    {
      name: "Đơn vị",
      selector: (row) => row?.unit,
      sortable: true,
      reorder: true,
      grow: 2,
    },
    {
      name: "Số lượng",
      // selector: (row) => row?.qty,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <>
          <input
            type="number"
            style={{ width: "120px" }}
            value={row?.qty}
            onChange={(e) => {
              itemProducts?.forEach((item, index) => {
                if (
                  (item?.product?._id || item?.product) ===
                  (row?.product?._id || row?.product)
                ) {
                  itemProducts?.splice(index, 1, {
                    ...item,
                    qty: parseInt(e.target.value),
                  });
                  setItemProducts(JSON.parse(JSON.stringify(itemProducts)));
                }
              });
            }}
          />
          <div style={{ marginLeft: 10 }}>
            {`(${products?.find(item => {
              console.log(item)
              return item?._id === row?.product?._id;
            })?.total_count || row?.dataTotal || 0})`}
          </div>
        </>
      ),
      grow: 2,
    },
    {
      name: "Hành động",
      selector: (row, index) => {
        return (
          <div>
            <button
              style={{ fontSize: "18px" }}
              className="dropdown-item text-danger"
              onClick={(e) =>
                handleDeleteItem(e, index, row?.product?._id || row?.product)
              }
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        );
      },
      sortable: true,
      reorder: true,
      grow: 2,
    },
  ];

  const handleRowClicked = (row) => {
    setSelectedProduct(null);
    setFieldProduct({
      name: row?.name,
      product: row?.product?._id || row?.product,
      unit: row?.unit,
      qty: row?.qty,
      dataTotal: row?.dataTotal
    });
  };

  // start search input
  const colourStyles = {
    option: (provided, { data, isSelected }) => {
      return {
        ...provided,
        color: isSelected ? "white" : data?.dataTotal < 30 ? "red" : "black",
      };
    },
  };
  const options = [];
  if (products?.length > 0) {
    products.map((p) => {
      options.push({
        value: p?._id,
        label: p.name,
        dataFoo: p.name,
        dataUnit: p.unit,
        dataTotal: p.total_count,
      });
    });
  }

  const handleChangeProduct = (selectedOptions) => {
    if (selectedOptions?.target?.name) {
      setFieldProduct((prev) => {
        return {
          ...prev,
          [selectedOptions.target.name]: selectedOptions.target.value,
        };
      });
    } else {
      setFieldProduct((prev) => {
        return {
          ...prev,
          product: selectedOptions.value,
          name: selectedOptions.dataFoo,
          unit: selectedOptions.dataUnit,
          dataTotal: selectedOptions.dataTotal
        };
      });
      setSelectedProduct(selectedOptions);
    }
  };

  const selectedOptions = selectedProduct;
  // end search input

  return (
    <>
      <Toast />
      <section
        className={`content-main ${reqInventoryItem?.status ? "disabled" : ""}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <div
              className="content-title d-flex"
              onClick={(e) => {
                e.preventDefault();
                history.push("/req-inventory");
              }}
            >
              <h4 className="arrow-breadcrum">
                <i className="fas fa-arrow-left"></i>
              </h4>
              <h3 className="content-title">
                Mã hóa đơn:{" "}
                <span className="text-danger">
                  {reqInventoryItem?.importCode}
                </span>
              </h3>
            </div>
            <div>
              {reqInventoryItem?.status ? (
                <h4>
                  <span className="badge bg-danger text-white">
                    Hóa đơn này đã hoàn tất, bạn không thể chỉnh sửa
                  </span>
                </h4>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Cập nhật đơn
                </button>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="card card-custom mb-4 shadow-sm">
              <div className="card-body">
                <div className="mb-4 form-divided-2">
                  <div>
                    <label htmlFor="name_drug" className="form-label">
                      Nhà cung cấp
                    </label>
                    <select
                      id="select-provider"
                      value={provider}
                      name="provider"
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Chọn nhà cung cấp</option>
                      {providers?.map((item, index) => (
                        <option
                          key={index}
                          value={item._id}
                          data-foo={item.invoiceSymbol}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Ghi chú</label>
                    <input
                      name="note"
                      className="form-control"
                      type="text"
                      onChange={handleChange}
                      value={note}
                    ></input>
                  </div>
                </div>
                <div className="mb-4 form-divided-2">
                  <div>
                    <label className="form-label">Ngày nhập</label>
                    <input
                      id="datePicker"
                      name="requestedAt"
                      className="form-control"
                      type="date"
                      required
                      onChange={handleChange}
                      value={requestedAt}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="product_category" className="form-label">
                      Người nhập
                    </label>
                    <select
                      value={user}
                      name="user"
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Chọn người nhập</option>
                      {users?.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
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
                    {/* <select
                                    id="select-product"
                                    value={product}
                                    name="product"
                                    onChange={handleChangeProduct}
                                    className="form-control"
                                    >
                                        <option value=''>Chọn thuốc</option>
                                        {products?.map((item, index)=>(
                                            <option key={index} value={item._id} data-foo={item.name} data-unit={item.unit}>{item.name}</option>
                                        ))}
                                    </select> */}
                    <Select
                      options={options}
                      value={
                        selectedOptions ||
                        options?.find((item) => item.value === product)
                      }
                      onChange={handleChangeProduct}
                      placeholder="Tag"
                      getOptionLabel={(option) => (
                        <div data-foo={option.dataFoo}>
                          {option.label}{" "}
                          {option.label && `- (Tổng tồn: ${option.dataTotal})`}
                        </div>
                      )}
                      getOptionValue={(option) => option.value}
                      filterOption={(option, inputValue) =>
                        option.data.label
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      }
                      styles={colourStyles}
                      getOptionStyle={(option) =>
                        colourStyles.option(null, { data: option })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="qty" className="form-label">
                      Số lượng
                    </label>
                    <input
                      name="qty"
                      value={qty}
                      type="number"
                      className="form-control"
                      onChange={handleChangeProduct}
                      onFocus={handleFocus}
                    />
                  </div>
                </div>
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

        <div className="card card-custom mb-4 shadow-sm">
          <header className="card-header bg-white ">
            <div className="row gx-3 pt-3">
              <DataTable
                // theme="solarized"
                columns={columns}
                data={itemProducts}
                noDataComponent={NoRecords()}
                customStyles={customStyles}
                onRowClicked={handleRowClicked}
                defaultSortFieldId
                highlightOnHover
                pointerOnHover
              />
            </div>
          </header>
        </div>
      </section>
    </>
  );
};

export default EditImportStock;
