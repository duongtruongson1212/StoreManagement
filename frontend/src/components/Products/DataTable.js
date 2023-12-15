// import moment from 'moment/moment';
import DataTable from "react-data-table-component";
import {Link,useHistory} from "react-router-dom";
import React,{useEffect,useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useDispatch} from "react-redux";
import {deleteProduct,listProduct} from "../../Redux/Actions/ProductActions";
import {useSelector} from "react-redux";
import {PRODUCT_DELETE_RESET} from "../../Redux/Constants/ProductConstants";
import CustomLoader from './../../util/LoadingTable';
import formatCurrency from './../../util/formatCurrency';
import NoRecords from "../../util/noData";
const DataTableProduct=(props) => {
    const {products,loading,loadingDelete, errors, unShowSetting}=props
    const history=useHistory()
    const dispatch=useDispatch()
    const [modalShow,setModalShow]=useState(false);
    const [dataModal,setDataModal]=useState();
    const productDelete=useSelector(state => state.productDelete)
    const {success: successDelete}=productDelete

    const MyVerticallyCenteredModal=(props) => {
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="my-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete <span className="text-danger">{dataModal?.name}</span> ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-danger" onClick={() => {
                        dispatch(deleteProduct(dataModal?._id))
                        setModalShow(false)
                    }}>OK</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const CustomMaterialMenu=(props) => {
        let {row}=props
        return (
            <div className="dropdown">
                <Link
                    to="#"
                    data-bs-toggle="dropdown"
                    className="btn btn-light"
                >
                    <i className="fas fa-ellipsis-h"></i>
                </Link>
                <div className="dropdown-menu">
                    <button className="dropdown-item active-menu" onClick={(e) => {
                        e.stopPropagation()
                        let id=row._id
                        history.push(`/product/${id}`)
                    }}>
                        <i className="fa fa-pencil"></i>
                       <span style={{marginLeft: '15px'}}>Chỉnh sửa</span>
                    </button>
                    <button className="dropdown-item active-menu text-danger" onClick={(e) => {
                        e.preventDefault()
                        setModalShow(true)
                        setDataModal(row)
                    }}>
                        <i className="fa fa-trash"></i>    
                        <span style={{marginLeft: '15px'}}>Xóa</span>
                    </button>
                </div>
            </div>
        )
    }
    const columns=[

        {
            name: "Tên thuốc",
            selector: (row) => row?.name,
            sortable: true,
            reorder: true,
            minWidth: "180px",
        },
        {
            name: "Hình ảnh",
            selector: (row) => <img className="mt-1 w-50 h-50" src={row?.image?.slice(0,0+1)[0]} alt="ImageCategory" />,
        },
        {
            name: "Nhóm hàng",
            selector: (row) => row?.category?.name,
            sortable: true,
            minWidth: "180px",
        },
        {
            name: "Nhóm thuốc",
            selector: (row) => row?.categoryDrug?.name,
            sortable: true,
            minWidth: "180px",
        },
        {
            name: "Thuốc kê đơn",
            selector: (row) => row?.prescription?
                <span className="badge bg-success text-white p-2" style={{minWidth: '45px'}}>Có</span>:
                <span className="badge bg-danger text-white p-2" >Không</span>,
            sortable: true,
            reorder: true,
            sortFunction: (products) => {
                return [products].map((a, b) => {
                  const fieldA = a?.prescription;
                  const fieldB = b?.prescription;
                  let comparison = 0;
              
                  if (fieldA === fieldB) {
                    comparison = 0;
                  } else if (fieldA === true) {
                    comparison = 1;
                  } else {
                    comparison = -1;
                  }
              
                  return comparison
                });
            },
            minWidth: "150px",
        },
        {
            name: "DVT",
            selector: (row) => row?.unit,
            sortable: true,
            reorder: true
        },
        {
            name: "Giá",
            selector: (row) => formatCurrency(row?.price),
            sortable: true,
            reorder: true
        },
        {
            name: "HSD",
            selector: (row) => row?.expDrug,
            sortable: true,
            reorder: true
        },

        {
            name: "Thuốc bán",
            selector: (row) => row?.allowToSell?
                <span className="badge bg-success text-white p-2   " style={{minWidth: '45px'}}>Có</span>:
                <span className="badge bg-danger text-white p-2 " >Không</span>,
            sortable: true,
            sortFunction: (products) => {
                return [products].map((a, b) => {
                  const fieldA = a?.prescription;
                  const fieldB = b?.prescription;
                  let comparison = 0;
              
                  if (fieldA === fieldB) {
                    comparison = 0;
                  } else if (fieldA === true) {
                    comparison = 1;
                  } else {
                    comparison = -1;
                  }
              
                  return comparison
                });
            },
            reorder: true,
            minWidth: "120px",
        },
        !unShowSetting && {
            name: "Hành động",
            cell: row => <CustomMaterialMenu size="small" row={row} />,
            allowOverflow: true,
            button: true,
            width: '100px',
        },
    ];
    const columsErrors = [
        // {
        //     name: "Hàng",
        //     selector: (row, index) => <b>{index+2}</b> ,
        //     sortable: true,
        //     reorder: true,
        //     minWidth: "180px",
        // },
        {
            name: "Thứ tự",
            selector: (row, index) => <p>{row?.name}</p> ,
            sortable: true,
            reorder: true,
            minWidth: "180px",
        },
        {
            name: "Lỗi",
            selector: (row) => <div style={{color: 'red'}}>{
                row?.errors.map((error) => <p>{error}</p>)
            }</div>,
        },
    ]
    const paginationComponentOptions={
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
    };

    // const conditionalRowStyles = [
    //     {
    //         when: row => (moment(row.expDrug)).diff(moment(Date.now()), "days") > 180,
    //         style: {
    //             backgroundColor: 'rgba(63, 195, 128, 0.9)',
    //             color: 'white',
    //             '&:hover': {
    //                 cursor: 'pointer',
    //             },
    //         },
    //     },
    //     {
    //         when: row => (moment(row.expDrug)).diff(moment(Date.now()), "days") >= 90 && (moment(row.expDrug)).diff(moment(Date.now()), "days") < 180,
    //         style: {
    //             backgroundColor: 'rgba(248, 148, 6, 0.9)',
    //             color: 'white',
    //             '&:hover': {
    //                 cursor: 'pointer',
    //             },
    //         },
    //     },
    //     {
    //         when: row => (moment(row.expDrug)).diff(moment(Date.now()), "days") < 90,
    //         style: {
    //             backgroundColor: 'rgba(242, 38, 19, 0.9)',
    //             color: 'white',
    //             '&:hover': {
    //                 cursor: 'not-allowed',
    //             },
    //         },
    //     },
    // ];

    // const handleRowClicked = (row) => {
    // history.push(`/product/${row._id}`)
    // };

    const customStyles={
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
                borderTopColor: 'grey',
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

    useEffect(() => {
        if(successDelete) {
            dispatch({type: PRODUCT_DELETE_RESET});
            dispatch(listProduct())
        }
    },[dispatch,successDelete])
    return (
        <>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <DataTable
                // theme="solarized"
                columns={products ? columns : columsErrors}
                data={products || errors}
                noDataComponent={NoRecords()}
                customStyles={customStyles}
                defaultSortFieldId
                pagination
                // onRowClicked={handleRowClicked}
                // conditionalRowStyles={dessert ? conditionalRowStyles : ''}
                paginationComponentOptions={paginationComponentOptions}
                progressPending={loading||loadingDelete}
                progressComponent={<CustomLoader />}
                highlightOnHover
                pointerOnHover
            />
        </>

    )
}
export default DataTableProduct;