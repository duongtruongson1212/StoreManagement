import moment from 'moment/moment';
import DataTable from "react-data-table-component";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { cancelImportStock, listImportStock, statusImportStock } from "../../Redux/Actions/ImportStockAction";
import { IMPORT_STOCK_CANCEL_RESET, IMPORT_STOCK_STATUS_RESET } from "../../Redux/Constants/ImportStockConstant";
import printReport from './PrintReport';
import CustomLoader from './../../util/LoadingTable';
import formatCurrency from '../../util/formatCurrency';
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import NoRecords from '../../util/noData';
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const ImportStock = (props) =>{
    const {importStock, loading, loadingStatus} = props 
    const history = useHistory()
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [reportShow, setReportShow] = useState(false);
    const [dataModal, setDataModal] = useState();
    const [dataModalCancel, setDataModalCancel] = useState();
    const [modalCancel, setModalCancel] = useState(false);

    const updateStatus = useSelector(state => state.importStockStatus)
    const {success} = updateStatus

    const cancelImport = useSelector(state => state.importStockCancel)
    const {success: successCancel} = cancelImport

    const MyVerticallyCenteredModal = (props) =>{
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="my-modal-warning"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" style={{color: 'black'}}>
                Cập nhật trạng thái 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Bạn có chắc chắn duyệt đơn <span className="text-warning">{dataModal?.importCode}</span> ?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" style={{fontWeight:"600"}} onClick={()=>{
                dispatch(statusImportStock(dataModal?._id))
                setModalShow(false)
              }}>Đồng ý</Button>
            </Modal.Footer>
          </Modal>
        );
    }

    const MyVerticallyCenteredModalCancel=(props) => {
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
                      Hủy đơn nhập kho
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <p>Bạn có chắc chắn hủy đơn <span className="text-danger">{dataModalCancel?.importCode}</span> ?</p>
              </Modal.Body>
              <Modal.Footer>
                  <Button className="btn-danger" onClick={() => {
                      dispatch(cancelImportStock(dataModalCancel?._id))
                      setModalCancel(false)
                  }}>OK</Button>
              </Modal.Footer>
          </Modal>
      );
    }
    const CustomMaterialMenu = (props) =>{
        let {row} = props
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
                  { row.status === false ?
                      <>
                        <button className="dropdown-item active-menu" onClick={(e)=>{
                          e.stopPropagation()
                          setModalShow(true)
                          setDataModal(row)
                        }}>
                          <i className="fas fa-clipboard-check"></i>
                          <span> Xác nhận nhập</span>
                        </button>

                        <button className="dropdown-item active-menu" onClick={(e)=>{
                          e.preventDefault()
                          history.push(`/import-stock/${row._id}`)
                        }}>
                          <i className="fas fa-pencil"></i>
                          <span> Chỉnh sửa</span> 
                        </button>
                      </>
                       :
                       <button className="dropdown-item active-menu" onClick={(e)=>{
                        e.preventDefault()
                        history.push(`/import-stock/${row._id}`)
                      }}>
                        <i className="fas fa-eye"></i>
                        <span> Xem chi tiết</span>
                      </button>
                  }
                  <button className="dropdown-item active-menu" onClick={(e)=>{
                      e.preventDefault()
                      setReportShow(true)
                      setDataModal(row)
                    }}>
                      <i className="fas fa-print"></i>
                      <span> In phiếu nhập</span>
                  </button>
                  { row.status === false ?
                      <button className="dropdown-item active-menu text-danger" onClick={(e)=>{
                        e.preventDefault()
                        setModalCancel(true)
                        setDataModalCancel(row)
                      }}>
                      <i className="fas fa-trash"></i>
                      <span> Hủy phiếu nhập</span>
                    </button>
                    : ''
                  }
                </div>
            </div>
        )
    }
      
    const columns = [
        {
            name: "STT",
            selector: (row, index) => <b>{index+1}</b>,
            reorder: true,
            width: '60px'

        },
        {
            name: "Mã hóa đơn",
            selector: (row) => row?.importCode,
            sortable: true,
            reorder: true,
            grow: 3
        },
        {
          name: "Số HD",
          selector: (row) => row?.invoiceNumber,
          sortable: true,
          reorder: true,
          grow: 1
        },
        {
            name: "Nhà cung cấp",
            selector: (row) => row?.provider?.name,
            sortable: true,
            reorder: true,
            grow: 2,
            width: '330px'
        },
        {
            name: "Tạo bởi",
            selector: (row) => row?.user?.name,
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "Ngày nhập",
            selector: (row) => moment(row?.importedAt).format("DD/MM/YYYY"),
            sortable: true,
            reorder: true,
            grow: 2,
            width: '140px'
        },
        {
            name: "Tổng cộng",
            selector: (row) => formatCurrency(row?.totalPrice),
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "Trạng thái",
            selector: (rows) => rows?.status === true ? 
                (<span className="badge bg-success text-white">Đã hoàn tất</span>) : 
                (<span className="badge bg-danger text-white">Chưa duyệt</span>),
            sortable: true,
            reorder: true,
            sortFunction: (importStock) => {
                return [importStock].map((a, b) => {
                  const fieldA = a?.status;
                  const fieldB = b?.status;
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
            grow: 2,
            width: '130px'
        },
        {   name: "Hành động",
            cell: row => <CustomMaterialMenu row={row} />,
            allowOverflow: true,
            button: true,
            width: '100px',
        },
    ];

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL"
    };

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
  
    useEffect(()=>{
      if(success){
        dispatch({ type: IMPORT_STOCK_STATUS_RESET});
        dispatch(listImportStock())
        toast.success("Duyệt đơn nhập thành công", ToastObjects);
      }
      if(successCancel){
        dispatch({ type: IMPORT_STOCK_CANCEL_RESET});
        dispatch(listImportStock())
        toast.success("Hủy đơn nhập thành công", ToastObjects);
      }
      if(reportShow){
        printReport(dataModal)
        setReportShow(false)
        setDataModal(null)
      }
      // eslint-disable-next-line
    },[dispatch, success, reportShow, successCancel])


  return (
    <>
        <Toast />
        
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

        <MyVerticallyCenteredModalCancel
          show={modalCancel}
          onHide={() => setModalCancel(false)}
        />
        
        <div className='CHtfP'>
          <DataTable
              // theme="solarized"
              columns={columns}
              noDataComponent={NoRecords()}
              data={importStock}
              customStyles={customStyles}
              defaultSortFieldId
              pagination
              // onRowClicked={handleRowClicked}
              paginationComponentOptions={paginationComponentOptions}
              progressPending={loading||loadingStatus}
              progressComponent={<CustomLoader />}
              highlightOnHover
              pointerOnHover
          />
        </div>
    </>

  )  
}
export default ImportStock;