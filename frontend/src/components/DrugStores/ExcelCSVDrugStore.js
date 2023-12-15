import React, { useEffect, useState } from "react";  
import { useDispatch, useSelector } from "react-redux";
import { read, utils, writeFile } from 'xlsx';
import { listDrugStore } from "../../Redux/Actions/DrugStoreActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import DrugStoreTable from "./DrugStoreTable";
const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
const ExcelCSVProductComponent = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState(null);
    
    const drugstoreList = useSelector((state)=> state.drugstoreList)
    const { drugstores } = drugstoreList
    useEffect(()=>{
       
        if(!data){
            dispatch(listDrugStore())
        }
    }, [ dispatch, data])


    const handleExport = () => {
        const headings = [[
            'ID',
            'Tên thuốc',
            'Số đăng ký',
            'Nhóm hàng',
            'Nhóm thuốc',
            'Đơn vị tính',
            'Quy cách đóng gói',
            'Hoạt chất',
            'Tên biệt dược',
            'Nhà cung cấp',
            'Nước sản xuất',
            'Lời chỉ dẫn',
            'Giá',
            'Thuốc bán',
            'Thuốc kê đơn',
            'Ngày tạo'
        ]];

        const cloneData = JSON.parse(JSON.stringify(drugstores))
        //cloneData.map(item=>{
        //    let tmp = item.product.category
        //    delete item.product.category
        //    return item.category = tmp
        //})
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, cloneData, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Report.xlsx');
        toast.success("Xuất thành công", ToastObjects);
    }

    return (
        <>
            <Toast />
            <section className="content-main">
                <div className="content-header">
                    
                    <div>
                        <button onClick={handleExport} className="btn btn-primary float-right">
                            Xuất <i className="fa fa-download"></i>
                        </button>
                    </div>
                </div>

                <div className="card card-custom mb-4 shadow-sm">
                    <header className="card-header bg-white ">
                        <div className="row gx-3 py-3">
                        {
                            //loading ? (<Loading />) : error ? (<Message>{error}</Message>) : ''
                        }
                       
                                
                                <DrugStoreTable 
                                    drugstores={drugstores}
                                    dessert={false}
                                    expanded={false}
                                    loading={false}
                                />
                       
                        </div>
                    </header>
                </div>
            </section>
        </>
    );
};

export default ExcelCSVProductComponent;
