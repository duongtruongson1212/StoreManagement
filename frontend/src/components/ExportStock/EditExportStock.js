import React, { useEffect, useState } from "react";
import {
  singleExportStock,
  updateExportStock,
} from "../../Redux/Actions/ExportStockAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { listUser } from "../../Redux/Actions/UserActions";
import { useHistory } from "react-router-dom";
import Toast from "../LoadingError/Toast";
import {
  EXPORT_STOCK_DETAILS_RESET,
  EXPORT_STOCK_UPDATE_RESET,
} from "../../Redux/Constants/ExportStockConstant";
import moment from "moment";
import { listProduct } from "./../../Redux/Actions/ProductActions";
import renderToast from "../../util/Toast";
import { listInventory } from "../../Redux/Actions/InventoryAction";
import ExportTable from "./ExportStockTable";
import Select from "react-select";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const EditImportStock = (props) => {
  const { exportId } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const exportDetail = useSelector((state) => state.exportStockDetail);
  const { exportStockItem } = exportDetail;

  const inventoryList = useSelector((state) => state.inventoryList);
  var { inventories } = inventoryList;
  const [inventoriesClone, setInventoriesClone] = useState([]);
  const [qtyLot, setqtyLost] = useState([]);
  useEffect(() => {
    if (inventories?.length > 0) {
      setInventoriesClone([...inventories]);
    }
  }, [inventories]);
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const exportUpdate = useSelector((state) => state.exportStockUpdate);
  const { success } = exportUpdate;

  const [isStop, setIsStop] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [itemProducts, setItemProducts] = useState([]);
  const [globalFlag, setGlobalFlag] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [field, setFieldProduct] = useState({
    countInStock: 0,
    name: "",
    product: "",
    price: 0,
    qty: 0,
    lotField: [],
  });

  const [data, setData] = useState({
    note: "",
    reason: "",
    exportedAt: moment(new Date(Date.now())).format("YYYY-MM-DD"),
  });
  var { note, reason, user, exportedAt } = data;

  const { product, lotField } = field;

  const handleChange = (e) => {
    e.preventDefault();
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleChangeQuantity = (e, index, expDrug) => {
    const { value, name } = e.target;
    const updateQtyLot = [...qtyLot];
    updateQtyLot[index] = {
      name,
      value,
      expDrug,
    };
    setqtyLost(updateQtyLot);
  };

  const refreshField = () => {
    const inputElements = document.querySelectorAll("#list-lot input");
    inputElements.forEach((input) => {
      input.value = "";
    });
    setqtyLost([]);
  };
  const CheckIsNaN = (str) => {
    return isNaN(parseInt(str)) ? 0 : parseInt(str);
  };
  const checkQtyLot = () => {
    const data = {
      isError: false,
      newData: [],
    };
    const inputElements = document.querySelectorAll("#list-lot input");
    inputElements.forEach((input, index) => {
      const lotNumberData = input.dataset.lotnumber;
      const qtyLotData = input.dataset.qtylot;
      const id = input.dataset.id;
      const expDrug = input.dataset.expdrug;

      if (
        lotNumberData === qtyLot[index].name &&
        expDrug === qtyLot[index].expDrug
      ) {
        let checkQtyLot = CheckIsNaN(qtyLot[index].value);
        if (parseInt(qtyLotData) < checkQtyLot) {
          data.isError = true;

          toast.error(
            `Số lượng nhập đã vượt quá số lượng của lô ${lotNumberData} (${qtyLotData}) trong kho`,
            ToastObjects
          );
          return;
        } else {
          data.newData.push({
            _id: id,
            lotNumber: lotNumberData,
            count: CheckIsNaN(qtyLot[index].value),
            expDrug,
          });
        }
      }
    });
    return data;
  };

  const checkExistProduct = (id, arrayProduct) => {
    let index = -1;
    let product = {};
    for (let i = 0; i < arrayProduct.length; i++) {
      if (id === arrayProduct[i].product._id) {
        return { index: i, product: arrayProduct[i] };
      }
    }
    return { index, product };
  };
  // const handleChangeProduct = (e) => {
  //   e.preventDefault();
  //   if (!isEdited) {
  //     setIsEdited(true);
  //   }
  //   let idProduct = e.target.value;
  //   let a = document.getElementById("select-product");
  //   let b = a.options[a.selectedIndex];
  //   let c = b.getAttribute("data-foo");

  //   let b1 = a.options[a.selectedIndex];
  //   let c1 = b1.getAttribute("data-countinstock");

  //   let d = a.options[a.selectedIndex];
  //   let d1 = d.getAttribute("data-lotlist");
  //   refreshField();
  //   const tempLot = d1 ? [...JSON.parse(d1)] : [];
  //   const updateQtyLot = [];
  //   const { index, product } = checkExistProduct(idProduct, itemProducts);
  //   tempLot.forEach((lot, index) => {
  //     updateQtyLot[index] = {
  //       name: lot.lotNumber,
  //       value: 0,
  //       expDrug: lot.expDrug,
  //     };
  //   });
  //   setqtyLost(updateQtyLot);
  //   if (index === -1) {
  //     setGlobalFlag(false);
  //     setFieldProduct((prev) => {
  //       return {
  //         ...prev,
  //         name: c,
  //         countInStock: c1,
  //         qty: 0,
  //         lotField: tempLot,
  //         [e.target.name]: e.target.value,
  //       };
  //     });
  //   } else {
  //     setGlobalFlag(true);
  //     const findProduct = inventories.find((item) => item.idDrug === idProduct);
  //     const newLotField = findProduct?.products?.map((lot, index) => {
  //       let positon = CheckLotWhenSelect(lot, product);
  //       return positon !== -1
  //         ? {
  //             ...lot,
  //             count:
  //               parseInt(lot?.count) -
  //               parseInt(product?.lotField?.[positon]?.count),
  //           }
  //         : lot;
  //     });

  //     setFieldProduct((prev) => {
  //       return {
  //         ...prev,
  //         name: c,
  //         countInStock: c1,
  //         qty: 0,
  //         lotField: [...newLotField],
  //         [e.target.name]: e.target.value,
  //       };
  //     });
  //   }
  // };

  const CheckLotWhenSelect = (lot, product) => {
    let index = -1;
    for (let i = 0; i < product.lotField.length; i++) {
      if (
        lot.lotNumber === product.lotField[i].lotNumber &&
        lot.expDrug === product.lotField[i].expDrug
      ) {
        return (index = i);
      }
    }
    return index;
  };
  const vonglap = (product, newData) => {
    let index = -1;
    for (let i = 0; i < newData.length; i++) {
      if (
        product.lotNumber === newData[i].lotNumber &&
        product.expDrug === newData[i].expDrug
      ) {
        return (index = i);
      }
    }
    return index;
  };
  const EditDataMinus = (id, newData) => {
    const findProductIndex = inventoriesClone.findIndex((item) => {
      return item.idDrug === id.toString();
    });
    const findProduct = inventoriesClone.find((item) => item.idDrug === id);
    let a = [];
    if (!globalFlag) {
      if (findProductIndex > -1) {
        a = findProduct.products.map((product) => {
          let positon = vonglap(product, newData);
          return positon !== -1
            ? {
                ...product,
                count:
                  parseInt(product.count) - parseInt(newData[positon].count),
              }
            : product;
        });
      }
    } else {
      a = lotField.map((product, index) => {
        let positon = vonglap(product, newData);
        return positon !== -1
          ? {
              ...product,
              count: parseInt(product.count) - parseInt(newData[positon].count),
            }
          : product;
      });
    }
    inventoriesClone.splice(findProductIndex, 1, {
      ...findProduct,
      products: [...a],
    });
    setFieldProduct((prev) => {
      return {
        ...prev,
        lotField: [...a],
      };
    });
  };

  const findByExpDrugAndLotNumber = (lot, tempLot) => {
    const a = tempLot.filter((f) => {
      return lot.expDrug === f.expDrug && lot.lotNumber === f.name;
    });
    return {
      ...a[0],
    };
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    let flag = false;
    const sumUserInput = qtyLot.reduce((accumulator, currentValue) => {
      return accumulator + CheckIsNaN(currentValue.value);
    }, 0);
    const checkNegative = inventoriesClone.some(
      (item) => parseInt(item.value) < 0
    );

    if (checkNegative) {
      toast.error(
        `Sản phẩm dưới mức âm, không thể thêm tiếp tục vào danh sách`,
        ToastObjects
      );
      return;
    }
    const { isError, newData } = checkQtyLot();
    if (isError) {
      return;
    }
    if (parseInt(sumUserInput) > parseInt(field.countInStock)) {
      toast.error(
        `Số lượng nhập đã vượt quá số lượng của ${field.name} (${field.countInStock}) trong kho`,
        ToastObjects
      );
      return;
    }
    if (!field.product) {
      if (!isStop) {
        renderToast("Chưa chọn sản phẩm", "error", setIsStop, isStop);
      }
      return;
    } else if (sumUserInput <= 0) {
      if (!isStop) {
        renderToast("Số lượng phải lớn hơn 0", "error", setIsStop, isStop);
      }
      return;
    }
    itemProducts.forEach((item, index) => {
      if ((item.product._id || item.product) === field.product) {
        let a = (item.product.qty || item.qty) + parseInt(sumUserInput);
        if (parseInt(a) > parseInt(field.countInStock)) {
          flag = true;
          toast.error(
            `Số lượng nhập đã vượt quá số lượng của ${field.name} (${field.countInStock}) trong kho`,
            ToastObjects
          );
          return;
        } else {
          flag = true;

          let newLotfieldArray = item.lotField.map((f) => {
            return {
              ...f,
              count:
                f.count +
                (parseInt(findByExpDrugAndLotNumber(f, qtyLot).value) || 0),
            };
          });
          if (newLotfieldArray.length !== qtyLot.length) {
            let arrayNotExsistInNewLot = field.lotField
              .map((f, index) => {
                return {
                  count: CheckIsNaN(qtyLot[index].value),
                  idDrug: f.idDrug,
                  lotNumber: f.lotNumber,
                  expDrug: f.expDrug,
                };
              })
              .filter((obj) => {
                return !newLotfieldArray.some((obj1) => {
                  return (
                    obj.expDrug === obj1.expDrug &&
                    obj.lotNumber === obj1.lotNumber
                  );
                });
              });
            newLotfieldArray = [...newLotfieldArray, ...arrayNotExsistInNewLot];
          }
          itemProducts.splice(index, 1, {
            ...item,
            qty: (item.qty += parseInt(sumUserInput)),
            lotField: [...newLotfieldArray],
          });
          EditDataMinus(item.product._id || item.product, newData);
          setItemProducts(itemProducts);
        }
      }
    });
    if (!flag) {
      const newLotfieldArray = field.lotField.map((f, index) => {
        return {
          count: CheckIsNaN(qtyLot[index].value),
          idDrug: f.idDrug,
          lotNumber: f.lotNumber,
          expDrug: f.expDrug,
        };
      });
      setItemProducts((prev) => [
        ...prev,
        {
          ...field,
          qty: parseInt(sumUserInput),
          lotField: [...newLotfieldArray],
        },
      ]);
      EditDataMinus(field.product, newData);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateExportStock({
        ...data,
        exportItems: itemProducts,
        exportId,
      })
    );
    setFieldProduct({
      countInStock: 0,
      name: "",
      product: "",
      price: 0,
      qty: 0,
      lotField: [],
    });
  };

  const handleDeleteItem = (e, index, id) => {
    e.preventDefault();
    if (!isEdited) {
      setIsEdited(true);
    }
    itemProducts.splice(index, 1);
    const findProductIndex = inventories.findIndex((item) => {
      return item.idDrug === id;
    });
    const findProduct = inventories.find((item) => {
      return item.idDrug === id;
    });
    inventoriesClone.splice(findProductIndex, 1, {
      ...findProduct,
    });
    const tempLot = [...findProduct.products];
    const updateQtyLot = [];
    tempLot.forEach((lot, index) => {
      updateQtyLot[index] = {
        name: lot.lotNumber,
        value: 0,
        expDrug: lot.expDrug,
      };
    });
    setqtyLost(updateQtyLot);
    setSelectedProduct({
      dataCountinstock: findProduct?.total_count,
      dataFoo: findProduct?.name,
      dataLotlist: JSON.stringify(findProduct?.products),
      label: findProduct?.name, 
      value: findProduct?.idDrug
    })
    setFieldProduct(() => {
      return {
        countInStock: findProduct.total_count,
        name: findProduct.name,
        product: findProduct.idDrug,
        price: 0,
        qty: 0,
        lotField: [...findProduct.products],
      };
    });
    setItemProducts(JSON.parse(JSON.stringify(itemProducts)));
  };

  useEffect(() => {
    dispatch(listUser());
    dispatch(listProduct());
    dispatch(listInventory());
    if (success) {
      toast.success(`Cập nhật thành công`, ToastObjects);
      dispatch({ type: EXPORT_STOCK_UPDATE_RESET });
      dispatch({ type: EXPORT_STOCK_DETAILS_RESET });
      setSelectedProduct({})
      dispatch(singleExportStock(exportId));
    }
    if (exportId !== exportStockItem?._id) {
      dispatch(singleExportStock(exportId));
    } else if (exportId === exportStockItem?._id && !isEdited) {
      setData({
        note: exportStockItem?.note,
        reason: exportStockItem?.reason,
        user: exportStockItem?.user?._id,
        exportItems: exportStockItem?.exportItems,
        totalPrice: exportStockItem.totalPrice,
        exportedAt: moment(exportStockItem.exportedAt).format("YYYY-MM-DD"),
        status: exportStockItem.status,
      });
      if (itemProducts.length === 0 && !isEdited) {
        setItemProducts(
          JSON.parse(JSON.stringify(exportStockItem?.exportItems))
        );
      }
    } // eslint-disable-next-line
  }, [dispatch, exportStockItem, exportId, isEdited, success]);
  // start search input
  const options = [];
  if(inventoriesClone?.length > 0){
    inventoriesClone.map((p) => {
      options.push({ value: p?.idDrug, label: p.name, dataFoo: p.name, dataCountinstock: p.total_count,
        dataLotlist: JSON.stringify(p.products)} )
    })
    
  }
  const handleChangeProduct = (selectedOptions) => {
    let idProduct = selectedOptions?.value;
    if (!isEdited) {
      setIsEdited(true);
    }
    refreshField();
    
    
    const tempLot = selectedOptions.dataLotlist ? [...JSON.parse(selectedOptions.dataLotlist)] : [];
    const updateQtyLot = [];
    const { index, product } = checkExistProduct(idProduct, itemProducts);
    tempLot.forEach((lot, index) => {
    updateQtyLot[index] = {
      name: lot.lotNumber,
      value: 0,
      expDrug: lot.expDrug,
      };
    });
    setqtyLost(updateQtyLot);
    if (index === -1) {
      setGlobalFlag(false);
      setFieldProduct((prev) => {
        return {
          ...prev,
          product: selectedOptions.value,
          name: selectedOptions.dataFoo,
          countInStock: selectedOptions.dataCountinstock,
          qty: 0,
          lotField: tempLot,
        };
      });
    } else {
      setGlobalFlag(true);
      const findProduct = inventories.find((item) => item.idDrug === idProduct);
      const newLotField = findProduct?.products?.map((lot) => {
        let positon = CheckLotWhenSelect(lot, product);
        return positon !== -1
          ? {
              ...lot,
              count:
                parseInt(lot?.count) -
                parseInt(product?.lotField?.[positon]?.count),
            }
          : lot;
      });

      setFieldProduct((prev) => {
        return {
          ...prev,
          product: selectedOptions.value,
          name: selectedOptions.dataFoo,
          countInStock: selectedOptions.dataCountinstock,
          qty: 0,
          lotField: [...newLotField],
        };
      });
    }
    setSelectedProduct(selectedOptions);
  };

  const selectedOptions = selectedProduct
  // end search input
  return (
    <>
      <Toast />
      <section
        className={`content-main ${exportStockItem?.status ? "disabled" : ""}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <div
              className="content-title d-flex"
              onClick={(e) => {
                // e.preventDefault();
                history.push("/export-stock");
              }}
            >
              <h4 className="arrow-breadcrum">
                <i className="fas fa-arrow-left"></i>
              </h4>
              <h3 className="content-title">
                Mã phiếu xuất:{" "}
                <span className="text-danger">
                  {exportStockItem?.exportCode}
                </span>
              </h3>
            </div>
            <div>
              {exportStockItem?.status ? (
                <h4>
                  <span className="badge bg-danger text-white">
                    Phiếu xuất đã hoàn thành, không thể chỉnh sửa
                  </span>
                </h4>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Cập nhật
                </button>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div className="card card-custom mb-4 shadow-sm">
              <div className="card-body">
                <div className="mb-4 form-divided-2">
                  <div>
                    <label className="form-label">Ngày xuất</label>
                    <input
                      id="datePicker"
                      name="exportedAt"
                      className="form-control"
                      type="date"
                      required
                      onChange={handleChange}
                      value={exportedAt}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="product_category" className="form-label">
                      Người lập
                    </label>
                    <select
                      value={user}
                      name="user"
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Chọn người lập</option>
                      {users?.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4 form-divided-2">
                  <div>
                    <label className="form-label">Lý do xuất</label>
                    <textarea
                      name="reason"
                      placeholder="Lý do xuất: bán lẻ,..."
                      className="form-control"
                      rows="3"
                      required
                      onChange={handleChange}
                      value={reason}
                    ></textarea>
                  </div>
                  <div>
                    <label className="form-label">Ghi chú</label>
                    <textarea
                      name="note"
                      placeholder="Thêm ghi chú, mô tả"
                      className="form-control"
                      rows="3"
                      required
                      onChange={handleChange}
                      value={note}
                    ></textarea>
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
                    Sản phẩm
                  </label>
                  <Select 
                    options={options}
                    value={selectedOptions}
                    onChange={handleChangeProduct}
                    placeholder="Tag"
                    getOptionLabel={(option) => (
                      <div data-foo={option.dataFoo}>{option.label}</div>
                    )}
                    getOptionValue={(option) => option.value}
                    filterOption={(option, inputValue) =>
                      option.data.label.toLowerCase().includes(inputValue.toLowerCase())
                    }
                  />
                  {/* <select
                    id="select-product"
                    value={product}
                    name="product"
                    onChange={handleChangeProduct}
                    className="form-control"
                  >
                    <option value="">Chọn sản phẩm</option>
                    {inventoriesClone?.map((item, index) => (
                      <option
                        key={index}
                        value={item.idDrug}
                        data-foo={item.name}
                        data-countinstock={item.total_count}
                        data-lotlist={JSON.stringify(item.products)}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select> */}
                  </div>
                </div>
                <div className="mb-4">
                  {lotField?.length > 0 && (
                    <label htmlFor="product_category" className="form-label">
                      Danh sách lô:
                    </label>
                  )}
                  {lotField?.map((lot, index) => {
                    return (
                      <div
                        id="list-lot"
                        key={index}
                        className="mb-4 form-divided-2"
                      >
                        <label>
                          <div className={Math.round((moment(lot?.expDrug) - moment(Date.now())) / (24 * 60 * 60 * 1000)) < 1 || lot.count <= 0 ? 'text-danger' : 'text-success'} style={{fontWeight:'500'}}>
                            Số lô: {lot.lotNumber} (tồn: {lot.count}) (HSD:{" "}
                            {moment(lot.expDrug).format("DD-MM-YYYY")})
                          </div>
                        </label>
                        <input
                          name={lot.lotNumber}
                          type="number"
                          data-lotnumber={lot.lotNumber}
                          data-qtylot={lot.count}
                          data-id={lot._id}
                          data-expdrug={lot.expDrug}
                          className="form-control"
                          disabled={Math.round((moment(lot?.expDrug) - moment(Date.now())) / (24 * 60 * 60 * 1000)) < 1 || lot.count <= 0 ? true : false}
                          onChange={(e) =>
                            handleChangeQuantity(e, index, lot.expDrug)
                          }
                        ></input>
                      </div>
                    );
                  })}
                </div>
                <hr />
                <div className="mb-6 d-flex justify-content-end">
                  {exportStockItem?.status ? (
                    ""
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={handleAddProduct}
                    >
                      Thêm sản phẩm
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="card card-custom mb-4 shadow-sm">
          <header className="card-header bg-white ">
            <div className="row gx-3 py-3">
              <ExportTable
                itemProducts={itemProducts}
                handleDeleteItem={handleDeleteItem}
              />
            </div>
          </header>
        </div>
      </section>
    </>
  );
};
export default EditImportStock;
