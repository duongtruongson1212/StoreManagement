import React, {useEffect} from 'react'
import  moment  from 'moment';
import {Link,useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import {updateDrugStoreReview,listDrugStore} from "../../Redux/Actions/DrugStoreActions"
import Toast from "../LoadingError/Toast";
import {toast} from "react-toastify";
const ExpandedComponent = (props) =>{
    const drugstoreUpdateReview = useSelector(state=> state.drugstoreUpdateReview)
    const drugstoreList = useSelector(state=> state.drugstoreList)
    const dispatch = useDispatch()
    const {data, dessert} = props

    const history=useHistory()
    const handleUpdateReview=(productId,reviewId,status)=>{
        toast.success(`Đã ${status?"hiện":"ẩn"} bình luận`,ToastObjects);
        dispatch(updateDrugStoreReview({productId:productId,reviewId:reviewId,status:status}))
        dispatch(listDrugStore())
        //alert(id)
    }
    const ToastObjects={
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
      };
    
    const CustomMaterialMenu=(props) => {
        let {productId,row}=props
        return (
            <div className="dropdown">
                <Link
                    to="#"
                    data-bs-toggle="dropdown"
                    className="btn btn-light"
                >
                    <i className="fas fa-ellipsis-h"></i>
                </Link>
                <div className="dropdown-menu active-menu">
                    <button className="dropdown-item" onClick={(e) => {
                        e.stopPropagation()
                        handleUpdateReview(productId,row?._id,true)
                    }}>
                        <i className="fas fa-eye"></i>
                        <span style={{marginLeft: '15px'}}>Hiện bình luận</span>
                    </button>
                    <button className="dropdown-item" onClick={(e) => {
                        e.stopPropagation()
                        handleUpdateReview(productId,row?._id,false)
                    }}>
                        <i className="fas fa-eye-slash"></i>
                        <span style={{marginLeft: '15px'}}>Ẩn bình luận</span>
                    </button>
                </div>
                
            </div>
        )
    }
    const columns = [
        {
            name: "Hành động",
            cell: row => <CustomMaterialMenu size="small" productId={data?.data?.product?._id} row={row} />,
            allowOverflow: true,
            button: true,
            width: '100px',
        },
        {
            name: "Tên",
            selector: (row) => row.name,
            sortable: true,
            reorder: true,
           
        },
        {
            name: "Hiển thị",
            selector: (row) => row.isShow?
                <span className="badge bg-success text-white p-2" style={{minWidth: '45px'}}>Có</span>:
                <span className="badge bg-danger text-white p-2" >Không</span>,
            sortable: true,
            reorder: true,

            minWidth: "100px",
        },
        
        {
            name: "Bình luận",
            selector: (row) => <span>{row?.comment}</span>,
            sortable: true,
            minWidth: "500px",
        },
        {
            name: "Đánh giá",
            selector: (row) => row?.rating,
            sortable: true,
        },
        
        
    ];

    

    const customStyles = {
        rows: {
            highlightOnHoverStyle: {
            backgroundColor: 'rgb(230, 244, 244)',
            borderBottomColor: '#FFFFFF',
            // borderRadius: '25px',
            outline: '1px solid #FFFFFF',
            },
            style: {
                minHeight: '32px',
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
                minHeight: '40px',
            },
        },
        cells: {
            style: {
                fontSize: '14px',
            },
        },
    };

    useEffect(()=>{
        
    },[dispatch])
    return (
        <div style={{paddingBottom: '1rem'}}>
        <div className="row">
            <div className="card card-custom mb-4 shadow-sm">
                <header className="card-header bg-white ">
                    <DataTable
                        // theme="solarized"
                        columns={columns}
                        data={data?.data?.product.reviews}
                        customStyles={customStyles}
                        defaultSortFieldId
                        // onRowClicked={handleRowClicked}
                        
                        // progressPending={loading||loadingDelete}
                        // progressComponent={<CustomLoader />}
                        highlightOnHover
                        pointerOnHover
                    />
                </header>
            </div>
        </div>
    </div>
    )
}
export default ExpandedComponent