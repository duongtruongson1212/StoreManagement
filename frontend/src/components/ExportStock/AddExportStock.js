import React, { useEffect, useState } from "react";
import {
  createExportStock,
  listExportStock,
} from "../../Redux/Actions/ExportStockAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EXPORT_STOCK_CREATE_RESET } from "../../Redux/Constants/ExportStockConstant";
import { listUser } from "../../Redux/Actions/UserActions";
import { listProduct } from "./../../Redux/Actions/ProductActions";
import { useHistory } from "react-router-dom";
import Toast from "../LoadingError/Toast";
import moment from "moment";
import renderToast from "../../util/Toast";
import { listInventory } from "../../Redux/Actions/InventoryAction";
import ExportTable from "./ExportStockTable";
import Select from "react-select";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 5000,
};
const AddExportStock = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const createExportStockStatus = useSelector(
    (state) => state.exportStockCreate
  );
  const { success } = createExportStockStatus;

  const inventoryList = useSelector((state) => state.inventoryList);
  const { inventories } = inventoryList;
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const [inventoriesClone, setInventoriesClone] = useState([]);
  useEffect(() => {
    if (inventories.length > 0) {
      setInventoriesClone([...inventories]);
    }
  }, [inventories]);

  const [isStop, setIsStop] = useState(false);
  const [itemProducts, setItemProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [field, setFieldProduct] = useState({
    countInStock: 0,
    name: "",
    product: "",
    price: 0,
    qty: 0,
    lotField: [],
  });
  const [qtyLot, setqtyLost] = useState([]);
  const [data, setData] = useState({
    note: "",
    reason: "",
    exportedAt: moment(new Date(Date.now())).format("YYYY-MM-DD"),
  });
  var {
    note,
    reason,
    exportItems = itemProducts ? [...itemProducts] : [],
    user,
    exportedAt,
  } = data;

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
  // const handleChangeProduct = (e) => {
  //   e.preventDefault();
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
  //   tempLot.forEach((lot, index) => {
  //     updateQtyLot[index] = {
  //       name: lot.lotNumber,
  //       value: 0,
  //       expDrug: lot.expDrug,
  //     };
  //   });
  //   setqtyLost(updateQtyLot);

  //   setFieldProduct((prev) => {
  //     return {
  //       ...prev,
  //       name: c,
  //       countInStock: c1,
  //       qty: 0,
  //       lotField: tempLot,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };
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
    if (findProductIndex > -1) {
      const a = findProduct.products.map((product) => {
        let positon = vonglap(product, newData);
        return positon !== -1
          ? {
              ...product,
              count: parseInt(product.count) - parseInt(newData[positon].count),
            }
          : product;
      });
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
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    let flag = false;
    const sumUserInput = qtyLot.reduce((accumulator, currentValue) => {
      return accumulator + CheckIsNaN(currentValue.value);
    }, 0);

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
        renderToast(
          "Chưa chọn sản phẩm",
          "error",
          setIsStop,
          isStop
        );
      }
      return;
    } else if (sumUserInput <= 0) {
      if (!isStop) {
        renderToast("Số lượng phải lớn hơn 0", "error", setIsStop, isStop);
      }
      return;
    } else {
      exportItems.forEach((item, index) => {
        if (item.product === field.product) {
          let a = item.qty + parseInt(sumUserInput);
          if (parseInt(a) > parseInt(field.countInStock)) {
            flag = true;
            toast.error(
              `Số lượng nhập đã vượt quá số lượng của ${field.name} (${field.countInStock}) trong kho`,
              ToastObjects
            );
            return;
          } else {
            flag = true;

            const newLotfieldArray = item.lotField.map((f, index) => {
              return {
                ...f,
                count: f.count + (parseInt(qtyLot[index].value) || 0),
              };
            });

            exportItems.splice(index, 1, {
              ...item,
              qty: (item.qty += parseInt(sumUserInput)),
              lotField: [...newLotfieldArray],
            });
            EditDataMinus(item.product, newData);
            setItemProducts(exportItems);
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
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createExportStock({
        ...data,
        exportItems: exportItems,
      })
    );
  };
  const handleDeleteItem = (e, index, id) => {
    e.preventDefault();
    exportItems.splice(index, 1);

    const findProductIndex = inventories.findIndex((item) => {
      return item.idDrug === id;
    });
    const findProduct = inventories.find((item) => {
      return item.idDrug === id;
    });
    inventoriesClone.splice(findProductIndex, 1, {
      ...findProduct,
    });

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

    setItemProducts(exportItems);
  };
  useEffect(() => {
    if (success) {
      toast.success(`Thêm thành công`, ToastObjects);
      dispatch({ type: EXPORT_STOCK_CREATE_RESET });
      setData({
        note: "",
        totalPrice: 0,
        exportedAt: moment(new Date(Date.now())).format("YYYY-MM-DD"),
      });
      setFieldProduct({
        countInStock: 0,
        name: "",
        product: "",
        price: 0,
        qty: 0,
      });
      setItemProducts([]);
      setSelectedProduct({})
      dispatch(listExportStock());
    }
    dispatch(listUser());
    dispatch(listProduct());
    dispatch(listInventory());
  }, [success, dispatch]);
    // start search input
    const options = [];
    if(inventoriesClone?.length > 0){
      inventoriesClone.map((p) => {
        options.push({ value: p?.idDrug, label: p.name, dataFoo: p.name, dataCountinstock: p.total_count,
          dataLotlist: JSON.stringify(p.products)} )
      })
      
    }
    const handleChangeProduct = (selectedOptions) => {
      refreshField();
      if(selectedOptions?.target?.name){
        setFieldProduct((prev) => {
          return {
            ...prev,
            [selectedOptions.target.name]: selectedOptions.target.value,
          };
        });
      }
      else{
        const tempLot = selectedOptions.dataLotlist ? [...JSON.parse(selectedOptions.dataLotlist)] : [];
        const updateQtyLot = [];
        tempLot.forEach((lot, index) => {
          updateQtyLot[index] = {
            name: lot.lotNumber,
            value: 0,
            expDrug: lot.expDrug,
          };
        });
        setqtyLost(updateQtyLot);
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
        setSelectedProduct(selectedOptions);
      }
    };

    const selectedOptions = selectedProduct
    // end search input
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
                history.push("/export-stock");
              }}
            >
              <h4 className="arrow-breadcrum">
                <i className="fas fa-arrow-left"></i>
              </h4>
              <h3>Thêm phiếu xuất</h3>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Tạo đơn
              </button>
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
                      placeholder="Nhập ghi chú"
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
                    required
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
                            Số lô: {lot.lotNumber} (tồn: {lot.count}) (HSD:{" "}{moment(lot.expDrug).format("DD-MM-YYYY")})
                          </div>
                        </label>
                        <input
                          name={lot.lotNumber}
                          type="number"
                          min="0"
                          data-lotnumber={lot.lotNumber}
                          data-qtylot={lot.count}
                          data-id={lot._id}
                          data-expdrug={lot.expDrug}
                          disabled={Math.round((moment(lot?.expDrug) - moment(Date.now())) / (24 * 60 * 60 * 1000)) < 1 || lot.count <= 0 ? true : false}
                          className="form-control"
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
            <div className="row gx-3 py-3">
              <div>
                <ExportTable
                  itemProducts={itemProducts}
                  handleDeleteItem={handleDeleteItem}
                />
              </div>
            </div>
          </header>
        </div>
      </section>
    </>
  );
};

export default AddExportStock;
