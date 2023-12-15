import React, { useEffect, useState } from "react";
import { createImportStock, listImportStock } from '../../Redux/Actions/ImportStockAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { IMPORT_STOCK_CREATE_RESET } from '../../Redux/Constants/ImportStockConstant';
import { listProvider } from '../../Redux/Actions/ProviderAction';
import { listUser } from "../../Redux/Actions/UserActions";
import { listProduct } from './../../Redux/Actions/ProductActions';
import { useHistory } from 'react-router-dom';
import Toast from './../LoadingError/Toast';
import  moment  from 'moment';
import renderToast from "../../util/Toast";
import formatCurrency from './../../util/formatCurrency';
import DataTable from "react-data-table-component";
import NoRecords from "../../util/noData";
import Select from "react-select";

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
const AddImportStock = () => {  
    const dispatch = useDispatch();
    const history = useHistory();
    const createImportStockStatus = useSelector((state)=> state.importStockCreate)
    const { success } = createImportStockStatus

    const providerList = useSelector((state)=>state.providerList)
    const { providers } = providerList

    const productList = useSelector((state)=>state.productList)
    const { products } = productList

    const userList  = useSelector((state)=> state.userList)
    const { users } = userList

    const [ isStop , setIsStop ] = useState(false)
    const [itemProducts, setItemProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [field, setFieldProduct] = useState({
        name: '',
        product: '',
        lotNumber: '',
        manufactureDate: moment(new Date(Date.now())).format('YYYY-MM-DD'),
        expDrug: moment(new Date(Date.now())).format('YYYY-MM-DD'),
        price: '',
        VAT: 0,
        discount: 0, 
        qty: 0,
        expProduct: 0
    });
    const [data, setData] = useState({
        importedAt: moment(new Date(Date.now())).format('YYYY-MM-DD'),
        invoiceNumber: '',
        invoiceSymbol: '',
    })
      
    var { 
        provider, 
        importItems = itemProducts ? [...itemProducts] : [], 
        user,  
        totalPrice,
        totalVAT, 
        totalDiscount,
        invoiceNumber,
        invoiceSymbol,
        importedAt
    } = data
    // eslint-disable-next-line
    const { name, product, lotNumber, manufactureDate, expDrug, qty, VAT, discount, price } = field
    totalPrice= importItems.reduce((sum, curr) => sum + (+curr.price) * curr.qty, 0)
    totalVAT = importItems.reduce((sum, curr) => sum + ( ((+curr.price) * (+curr.qty) * (1 - (+curr.discount/100))) *  (+curr.VAT/100) ) , 0)
    totalDiscount = importItems.reduce((sum, curr) => sum + ( (((+curr.price) * (+curr.qty)) * (+curr.discount/100)) ), 0)

    const handleFocus = (event) => {
        // Xóa các ký tự 0 ở đầu nếu có
        if (event.target.value.startsWith('0')) {
          event.target.value = event.target.value.replace(/^0+/, '');
        }
      };
    

    const handleChange = e =>{
        e.preventDefault();
        let a = document.getElementById("select-provider");
        let b = a.options[a.selectedIndex]
        let c = b.getAttribute('data-foo')
        setData(prev => {
          return {
            ...prev, [e.target.name]: e.target.value,
            invoiceSymbol: c
          }
        })
    }
    // const handleChangeProduct = e =>{
    //     e.preventDefault();
    //     let formattedPrice = price;
    //     if (e.target.name === "price") {
    //       formattedPrice = e.target.value.replace(/\D/g, '')
    //     }
    //     setFieldProduct(prev => {
    //         let a = document.getElementById("select-product");
    //         let b = a.options[a.selectedIndex]
    //         let c = b.getAttribute('data-foo')
    //         let d = b.getAttribute('data-expproduct')
    //         return {
    //             ...prev,
    //             [e.target.name]: e.target.value,
    //             name:c, 
    //             price: formattedPrice,
    //             expProduct: d
    //           }
    //     })
    // }
    const handleAddProduct = e =>{
        e.preventDefault();
        let flag = false;
        
        if((+VAT) < 0){
            if(!isStop){
                renderToast('VAT phải lớn hơn hoặc bằng 0','error', setIsStop, isStop)
            }
            return;
        }
        if((+discount) < 0){
            if(!isStop){
                renderToast('Chiết khấu phải lớn hơn hoặc bằng 0','error', setIsStop, isStop)
            }
            return;
        }
        if(!field.product){
            if(!isStop){
                renderToast('Sản phẩm chưa được chọn','error', setIsStop, isStop)
            }
            return;
        }

        if(!field.product){
            if(!isStop){
                renderToast('Sản phẩm chưa được chọn','error', setIsStop, isStop)
            }
            return;
        }
        else if((+field.price) <= 0 || field.qty <= 0){
            if(!isStop){
                renderToast('Giá nhập và số lượng nhập phải lớn hơn 0','error', setIsStop, isStop)
            }
            return;
        }
        else if((+Math.round((moment(field.expDrug) - moment(field.manufactureDate)) / (30.44 * 24 * 60 * 60 * 1000)) < +field.expProduct)){
            renderToast(`Hạn sử dụng của thuốc phải lớn hơn ${+field.expProduct} tháng `,'error', setIsStop, isStop)
            return;
        }
        else{
            importItems.forEach((item, index)=>{
                if(item.product === field.product && item.lotNumber === field.lotNumber){
                    flag = true
                    importItems.splice(index, 1, {...item, 
                        lotNumber: field.lotNumber,
                        VAT: parseInt(field.VAT),
                        discount: parseInt(field.discount),
                        price: parseInt(field.price),
                        manufactureDate: field.manufactureDate,
                        expDrug: field.expDrug,
                        expProduct: field.expProduct,
                        qty: parseInt(field.qty)})
                    setItemProducts(importItems)
                 }
            })
            if(!flag){
                setItemProducts(prev => 
                    [...prev, {...field, price: parseInt(price), qty: parseInt(qty), discount: parseInt(discount), VAT: parseInt(VAT)}]
                )
            }
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createImportStock({
           ...data,
           importItems: importItems,
           totalPrice : importItems.reduce((sum, curr) => sum + (+curr.price) * curr.qty, 0),
           totalVAT : importItems.reduce((sum, curr) => sum + ( ((+curr.price) * (+curr.qty) * (1 - (+curr.discount/100))) *  (+curr.VAT/100) ) , 0),
           totalDiscount : importItems.reduce((sum, curr) => sum + ( (((+curr.price) * (+curr.qty)) * (+curr.discount/100)) ), 0)
        }));
    }
    const handleDeleteItem = (e, index) =>{
        e.preventDefault()
        importItems.splice(index, 1)
        setItemProducts(importItems)
    }
    useEffect(()=>{
        if(success){
            toast.success(`Tạo đơn nhập thành công`, ToastObjects);
            dispatch({type: IMPORT_STOCK_CREATE_RESET})
            setData({
                totalPrice: 0,
                totalVAT: 0,
                totalDiscount: 0,
                importedAt: moment(new Date(Date.now())).format('YYYY-MM-DD'),
                invoiceNumber: '',
                invoiceSymbol: '',
            })
            setFieldProduct({
                name: '',
                product: '',
                lotNumber: '',
                manufactureDate: moment(new Date(Date.now())).format('YYYY-MM-DD'),
                expDrug: moment(new Date(Date.now())).format('YYYY-MM-DD'),
                price: '',
                VAT: 0,
                discount: 0, 
                qty: 0,
            })
            setItemProducts([])
            setSelectedProduct({})
            dispatch(listImportStock())
        }
        dispatch(listProvider())
        dispatch(listProduct())
        dispatch(listUser())
    }, [success, dispatch])


    const customStyles = {
        rows: {
            highlightOnHoverStyle: {
            backgroundColor: 'rgb(230, 244, 244)',
            borderBottomColor: '#FFFFFF',
            // borderRadius: '25px',
            outline: '1px solid #FFFFFF',
            },
        },
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                fontSize: '16px',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor:'grey',
            },
        },
        headCells: {
            style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: 'grey',
            },
            },
        },
        cells: {
            style: {
                fontSize: '16px',
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
                borderRightColor: 'grey',
            },
            },
        },
    };

    const columns = [
        {
            name: "STT",
            selector: (row, index) => <b>{index+1}</b>,
            reorder: true,
            width: '60px'

        },
        {
            name: "Tên thuốc",
            selector: (row) => row?.name,
            sortable: true,
            reorder: true,
            grow: 3,
            width:'200px'
        },
        {
            name: "Số lô",
            selector: (row) => row?.lotNumber,
            sortable: true,
            reorder: true,
            grow: 2,
            width:'150px'
        },
        {
            name: "Ngày sản xuất",
            selector: (row) => moment(row?.manufactureDate).format("DD-MM-YYYY"),
            sortable: true,
            reorder: true,
            grow: 2,
            width:'200px'
        },
        {
            name: "Hạn sử dụng",
            selector: (row) => moment(row?.expDrug).format("DD-MM-YYYY"),
            sortable: true,
            reorder: true,
            grow: 2,
            width:'200px'
        },
        {
            name: "Giá nhập",
            selector: (row) => formatCurrency(row?.price),
            sortable: true,
            reorder: true,
            grow: 2,
            width:'200px'
        },
        {
            name: "Số lượng",
            selector: (row) => row?.qty,
            sortable: true,
            reorder: true,
            grow: 2,
            width:'200px'
        },
        {
            name: "Tổng cộng",
            selector: (row) => formatCurrency(row?.price * row?.qty),
            sortable: true,
            reorder: true,
            grow: 2,
            width:'200px'
        },
        {
            name: "Chiết khấu",
            selector: (row) => `${row?.discount}% (${formatCurrency((row?.price * row?.qty)*(+row?.discount)/100)})`,
            sortable: true,
            reorder: true,
            grow: 2,
            width:'200px'
        },
        {
            name: "Thành tiền trước VAT",
            selector: (row) => formatCurrency(row?.price * row?.qty * (1 - (+row?.discount)/100)),
            sortable: true,
            reorder: true,
            grow: 2,
            width:'220px'
        },
        {
            name: "VAT",
            selector: (row) => `${row?.VAT}% (${formatCurrency(((row?.price * row?.qty) * (1 - (+row?.discount)/100)) * (+row?.VAT)/100)})`,
            sortable: true,
            reorder: true,
            grow: 2,
            width:'200px'
        },
        {
            name: "Thành tiền sau VAT",
            selector: (row) => formatCurrency(row?.price * row?.qty * (1 + (row?.VAT/100)) * (1 - (+row?.discount/100))),
            sortable: true,
            reorder: true,
            grow: 2,
            width:'200px'
        },
        {  
            name: "Hành động",
            selector: (row, index) => {
              return (
                <div>
                  <button
                    style={{fontSize: '18px'}}
                    className="dropdown-item text-danger"
                    onClick={(e) => handleDeleteItem(e, index, row?.product?._id || row?.product)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              )
            },
            sortable: true,
            reorder: true,
            grow: 2,
            width:'200px'
        },
    ];

    const handleRowClicked = (row) => {
        setFieldProduct({
            name: row?.name,
            product: row?.product,
            lotNumber: row?.lotNumber,
            manufactureDate: moment(row?.manufactureDate).format('YYYY-MM-DD'),
            expDrug: moment(row?.expDrug).format('YYYY-MM-DD'),
            price: row?.price,
            VAT: row?.VAT,
            discount: row?.discount, 
            qty: row?.qty,
        })
    };
     // start search input
     const options = [];
     if(products?.length > 0){
       products.map((p) => {
         options.push({ value: p?._id, label: p.name, dataFoo: p.name, dataExpproduct: p.expDrug} )
       })
       
     }
     
     const handleChangeProduct = (selectedOptions) => {
       if(selectedOptions?.target?.name){
        let formattedPrice = price;
        if (selectedOptions.target.name === "price") {
          formattedPrice = selectedOptions.target.value.replace(/\D/g, '')
        }
        setFieldProduct((prev) => {
             return {
                 ...prev,
                 [selectedOptions.target.name]: selectedOptions.target.value,
                 price: formattedPrice

             }
         })
       }
       else{
         setFieldProduct(prev => {
             return {
                 ...prev,
                 product: selectedOptions.value ,
                 name: selectedOptions.dataFoo, 
                 expProduct: selectedOptions.dataExpproduct
               }
         })
         setSelectedProduct(selectedOptions);
       }
     };
 
     const selectedOptions = selectedProduct
     // end search input
    return (
      <>
        <Toast/>
        <section className="content-main" style={{display: 'grid'}} >
            <form onSubmit={handleSubmit}>

                <div className="content-header">
                    <div className="content-title d-flex" onClick={e=>{
                        e.preventDefault()
                        history.push("/import-stock")
                    }}>
                        <h4 className="arrow-breadcrum"><i className="fas fa-arrow-left"></i></h4>
                        <h3>Tạo đơn nhập kho</h3>
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
                                    <label htmlFor="name_drug" className="form-label">
                                        Nhà cung cấp
                                    </label>
                                    <select
                                    id="select-provider"
                                    value={provider}
                                    name="provider"
                                    onChange={handleChange}
                                    className="form-control"
                                    required >
                                        <option value=''>Chọn nhà cung cấp</option>
                                        {providers?.map((item, index)=>(
                                        <option key={index} value={item._id} data-foo={item.invoiceSymbol}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-divided-2">
                                    <div>
                                        <label className="form-label">Số hóa đơn</label>
                                        <input
                                            name="invoiceNumber"
                                            className="form-control"
                                            type='text'
                                            required
                                            onChange={handleChange}
                                            value={invoiceNumber}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="product_category" className="form-label">
                                            Ký hiệu hóa đơn
                                        </label>
                                        <input
                                            name="invoiceSymbol"
                                            className="form-control"
                                            type='text'
                                            onChange={handleChange}
                                            value={invoiceSymbol}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 form-divided-2">
                                <div>
                                    <label className="form-label">Ngày nhập</label>
                                    <input
                                        id="datePicker"
                                        name="importedAt"
                                        className="form-control"
                                        type='date'
                                        required
                                        onChange={handleChange}
                                        value={importedAt}
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
                                    required >
                                        <option value=''>Chọn người nhập</option>
                                        {users?.map((item, index)=>(
                                            <option key={index} value={item._id}>{item.name}</option>
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
                                    required >
                                        <option value=''>Chọn thuốc</option>
                                        {products?.map((item, index)=>(
                                            <option key={index} value={item._id} data-foo={item.name} data-expproduct={item.expDrug}>{item.name}</option>
                                        ))}
                                    </select> */}
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
                                </div>
                                <div>
                                    <label className="form-label">Số lô</label>
                                    <input
                                        name="lotNumber"
                                        value={lotNumber}
                                        type='text'
                                        className="form-control"
                                        required
                                        onChange={handleChangeProduct}
                                    ></input>

                                </div>
                            </div>
                            <div className="mb-4 form-divided-2">
                                <div>
                                    <label className="form-label">Ngày sản xuất</label>
                                    <input
                                        name="manufactureDate"
                                        value={manufactureDate}
                                        type='Date'
                                        className="form-control"
                                        required
                                        onChange={handleChangeProduct}
                                    ></input>
                                </div>
                                <div>
                                    <label className="form-label">Hạn sử dụng</label>
                                    <input
                                        name="expDrug"
                                        value={expDrug}
                                        type='Date'
                                        className="form-control"
                                        required
                                        onChange={handleChangeProduct}
                                    ></input>
                                </div>
                            </div>
                            <div className="mb-4 form-divided-2">
                                <div className="form-divided-2">
                                    <div>
                                        <label className="form-label">Giá nhập</label>
                                        <input
                                            name="price"
                                            value={formatCurrency(price)}
                                            type='text'
                                            className="form-control"
                                            required
                                            onChange={handleChangeProduct}
                                            onFocus={handleFocus}
                                        ></input>

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
                                            required
                                            onChange={handleChangeProduct}
                                            onFocus={handleFocus}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 form-divided-2">
                                    <div>
                                        <label className="form-label">VAT(%)</label>
                                        <input
                                            name="VAT"
                                            className="form-control"
                                            type='number'
                                            onChange={handleChangeProduct}
                                            onFocus={handleFocus}
                                            value={VAT}
                                            min={0}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="product_category" className="form-label">
                                            Chiết khấu(%)
                                        </label>
                                        <input
                                            name="discount"
                                            className="form-control"
                                            type='number'
                                            onChange={handleChangeProduct}
                                            onFocus={handleFocus}
                                            value={discount}
                                            min={0}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 d-flex justify-content-end">
                                <button className="btn btn-success" onClick={handleAddProduct}>Thêm sản phẩm</button>
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
                            noHeader
                            subHeader
                            subHeaderComponent={
                                <div className="mt-4 d-flex justify-content-between align-items-center">
                                    <table className="table table-bordered table-lg">
                                    <thead>
                                        <tr className="table-success">
                                        <th className="text-left">Tổng tiền hàng:</th>
                                        <th className="text-right">{formatCurrency(totalPrice)}</th>
                                        </tr>
                                        <tr className="table-success">
                                        <th className="text-left">VAT:</th>
                                        <th className="text-right">{formatCurrency(totalVAT)}</th>
                                        </tr>
                                        <tr className="table-success">
                                        <th className="text-left">Chiết khấu:</th>
                                        <th className="text-right">{formatCurrency(totalDiscount)}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="table-danger">
                                        <td className="text-left h4 font-weight-bold">Thành tiền:</td>
                                        <td className="text-right h4 font-weight-bold">{formatCurrency((totalPrice + totalVAT) - totalDiscount )}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                            }
                        />    
                    </div>
                </header>
            </div>
        </section>
      </>
    );
  }

  export default AddImportStock;