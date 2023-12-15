import React, { useEffect, useState } from "react";  
import { useDispatch, useSelector } from "react-redux";
import { read, utils, writeFile } from 'xlsx';
import { allProduct, importProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_IMPORT_RESET } from "../../Redux/Constants/ProductConstants";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import DataTableProduct from "./DataTable";

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
const ExcelCSVProductComponent = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState(null);
    const importProducts = useSelector(state=> state.productImport)
    const {loading, error, success} = importProducts
    const productAll = useSelector((state)=> state.productAll)
    const { productall } = productAll
    useEffect(()=>{
        if(success){
            toast.success("Nhập thành công", ToastObjects);
            dispatch({type: PRODUCT_IMPORT_RESET})
            setData(null)
            dispatch(allProduct())
        }
        else if(!data){
            dispatch(allProduct())
        }
    }, [success, dispatch, data])

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                const rowErrors = []
                const dataNew = []
                let rowIndex = 2
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    const cloneData = JSON.parse(JSON.stringify(rows))
                    for (const item of cloneData) {
                        const d = {
                            name: item?.name?.trim(),
                            errors: []
                          }
                          if (!d.name) {
                            d.errors.push('Tên không được để trống')
                          }
              
                          const isDuplicate = dataNew.some((item) => item?.name === d?.name)
                          if (isDuplicate) {
                            d.errors.push('Tên sản phẩm bị trùng')
                          }
                          const isDuplicateName = productall.some(
                            (item) => item?.name === d?.name
                          )
                          if (isDuplicateName) {
                            d.errors.push('Tên sản phẩm đã tồn tại')
                          }
                          if (!d.name) {
                            d.errors.push('Tên không được để trống')
                          }
                          if(!item?.regisId){
                            d.errors.push('Số đăng ký không được để trống')
                          }
                          if(!item?.category){
                            d.errors.push('Danh mục không được để trống')
                          }
                        
                          if(!item?.category.match(/"_id":"([^"]+)","name":"([^"]+)"/)){
                            d.errors.push('Danh mục không đúng định dạng')
                          }
                          if(!item?.categoryDrug){
                            d.errors.push('Danh mục thuốc không được để trống')
                          }
                        
                          if(!item?.categoryDrug.match(/"_id":"([^"]+)","name":"([^"]+)"/)){
                            d.errors.push('Danh mục thuốc không đúng định dạng')
                          }

                          if(!item?.expDrug){
                            d.errors.push('Hạn sử dụng không được để trống')
                          }
                        
                          if(isNaN(item?.expDrug)){
                            d.errors.push('Hạn sử dụng phải là số')
                          }
                          
                          if(!item?.unit){
                            d.errors.push('Đơn vị tính không được để trống')
                          }
                          if(!item?.packing){
                            d.errors.push('Quy cách đóng gói không được để trống')
                          }
                          if(!item?.APIs){
                            d.errors.push('Hoạt chất không được để trống')
                          }
                        if(!item?.brandName){
                            d.errors.push('Tên biệt dược không được để trống')
                        }
                        if(!item?.manufacturer){
                            d.errors.push('Tên nhà sản xuất không được để trống')
                        }
                        if(!item?.countryOfOrigin){
                            d.errors.push('Tên nước sản xuất không được để trống')
                        }
                        if(!item?.instruction){
                            d.errors.push('Chỉ dẫn không được để trống')
                        }
                        if(!item?.price){
                            d.errors.push('Giá không được để trống')
                        }
                        if(isNaN(item?.price)){
                            d.errors.push('Giá phải là số')
                        }
                        if(!item?.allowToSell){
                            d.errors.push('Được phép bán không được để trống')
                        }
                        if( typeof item?.allowToSell !== 'boolean'){
                            d.errors.push('Được phép bán không đúng định dạng')
                        }

                        if(!item?.prescription){
                            d.errors.push('Thuốc kê đơn không được để trống')
                        }
                        if( typeof item?.prescription !== 'boolean'){
                            d.errors.push('Thuốc kê đơn không đúng định dạng')
                        }
                        if(!item?.description){
                            d.errors.push('Mô tả không được để trống')
                        }
                        if(!d.errors.length){
                            item.category = item?.category && JSON.parse(item?.category)
                            item.categoryDrug = item?.categoryDrug && JSON.parse(item?.categoryDrug)
                            item.APIs = item?.APIs?.length > 0 ? JSON.parse(item?.APIs) : []
                            item.image = item?.image?.length > 0 ? item?.image?.split(";") : []
                            dataNew.push(item)
                        }
                        else{
                            rowErrors.push({
                                name: `Sản phẩm tại dòng ${rowIndex}`,
                                errors: d.errors
                            })
                        }
                        rowIndex++
                        
                    }
                    if(rowErrors.length > 0){
                        setErrors(rowErrors)
                    }
                    else{
                        setData(cloneData)
                    }
                    
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
    const handleSave = (e) =>{
        e.preventDefault();
        dispatch(importProduct(data));
    }
    const handleExport = () => {
        const headings = [[
            'name',
            'regisId',
            'category',
            'categoryDrug',
            'expDrug',
            'unit',
            'packing',
            'APIs',
            'brandName',
            'manufacturer',
            'countryOfOrigin',
            'instruction',
            'price',
            'allowToSell',            
            'prescription',
            'description',
            'image',
            'createdAt'
        ]];

        const cloneData = JSON.parse(JSON.stringify(productall))
        cloneData.map(item=>{      
            delete item?._id
            item.category = item?.category && JSON.stringify(item?.category)
            item.categoryDrug = item?.categoryDrug && JSON.stringify(item?.categoryDrug)
            item.APIs = item?.APIs && JSON.stringify(item?.APIs)
            item.image = item?.image?.join(";")
            return item
        })
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, cloneData, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Report.xlsx');
    }

    return (
        <>
            <Toast />
            <section className="content-main">
                <div className="content-header">
                    <div className="d-flex">
                        <label 
                            className="form-label" 
                            style={{
                                marginRight:"10px", 
                                paddingTop:"5px", 
                                fontWeight:"bold"
                            }}>Nhập</label>
                        <input 
                            type="file" 
                            name="file" 
                            className="form-control" 
                            id="inputGroupFile" 
                            required 
                            onChange={handleImport}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        />
                        {data && (<button 
                            onClick={(e)=>handleSave(e)} 
                            className="btn btn-primary float-right"
                            style={{
                                marginLeft:"10px", 
                                paddingTop:"5px", 
                                fontWeight:"bold"
                            }}>Lưu</button>)
                        }
                    </div>
                    <div>
                        <button onClick={handleExport} classsName="btn btn-primary float-right">
                            Xuất <i className="fa fa-download"></i>
                        </button>
                    </div>
                </div>

                <div className="card card-custom mb-4 shadow-sm">
                    <header className="card-header bg-white ">
                        <div className="row gx-3 py-3">
                        {
                            loading ? (<Loading />) : error ? (<Message>{error}</Message>) : ''
                        }
                        {
                            errors?.length? 
                            <DataTableProduct 
                                errors={errors}
                                unShowSetting={true}
                                />
                            : data?.length ?
                                <DataTableProduct 
                                    products={data}
                                    unShowSetting={true}
                                />
                            :
                                <DataTableProduct 
                                    products={productall}
                                    unShowSetting={true}
                                />
                        }
                        </div>
                    </header>
                </div>
            </section>
        </>
    );
};

export default ExcelCSVProductComponent;
