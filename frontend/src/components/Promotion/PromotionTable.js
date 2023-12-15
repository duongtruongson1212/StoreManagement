
import React from "react";
import Message from "../LoadingError/Error";
import { Link, useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import CustomLoader from "../../util/LoadingTable";
import NoRecords from '../../util/noData';


const PromotionTable = (props) => {
  const {promotionList} = props
  const history = useHistory()
  const {loading, error, promotions} = promotionList

  const columns = [
    {
        name: "STT",
        selector: (row, index) => <b>{index+1}</b>,
        reorder: true,
        width: '60px'

    },
    {
        name: "Tên khuyến mãi",
        selector: (row) => row?.name,
        sortable: true,
        reorder: true,
        grow: 3
    },
    {
        name: "% Giảm giá",
        selector: (row) =>row?.discount,
        sortable: true,
        reorder: true,
        grow: 2
    },
    {
      name: "Trạng thái",
      selector: (row) =>(new Date().getTime()>new Date(row?.endOn).getTime())?
      <p className="text-warning fw-bold fw-light" style={{opacity:"60%"}}>Ngưng áp dụng</p>:
        (new Date().getTime()<new Date(row?.startOn).getTime())?
        <p className="text-info fw-bold fw-light" style={{opacity:"60%"}}>Sắp diễn ra</p>:
        <p className="text-success fw-bold fw-light" style={{opacity:"60%"}}>Đang diễn ra</p>
      ,//row?.discount,
      sortable: true,
      reorder: true,
      grow: 2
    },
    {
      name: "Ngày bắt đầu",
      selector: (row) => row?.startOn,
      sortable: true,
      reorder: true,
      grow: 2
    },
    {
      name: "Ngày kết thúc",
      selector: (row) => row?.endOn,
      sortable: true,
      reorder: true,
      grow: 2
    },
    {   name: "Hành động",
        cell: (row) =>{
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
                  <button className="dropdown-item active-menu" onClick={(e)=>{
                    e.preventDefault();
                    props.parentCallbackEdit(row)
                  }}>
                      <i className="fa fa-pencil"></i>
                      <span style={{marginLeft: '15px'}}>Chỉnh sửa</span>
                  </button>
                  <button className="dropdown-item active-menu text-danger" onClick={(e)=>{
                    e.preventDefault()
                    props.parentModal(true)
                    props.parentCallbackDelete(row)
                  }}>
                      <i className="fa fa-trash"></i>    
                      <span style={{marginLeft: '15px'}}>Xóa</span>
                  </button>
                </div>
            </div>
          )
        },
        allowOverflow: true,
        button: true,
        width: '100px',
    },
  ];


  const handleRowClicked = (row) => {
    //history.push(`/category/${row._id}`)
    props.parentCallbackEdit(row)
  };

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

  return (
    <div className="col-md-12 col-lg-8">
      {
        error ? (<Message>{error}</Message>) : ''
      }
      {promotions ?
        <DataTable
          // theme="solarized"
          columns={columns}
          data={promotions}
          noDataComponent={NoRecords()}
          customStyles={customStyles}
          defaultSortFieldId
          pagination
          onRowClicked={handleRowClicked}
          paginationComponentOptions={paginationComponentOptions}
          progressPending={loading}
          progressComponent={<CustomLoader />}
          highlightOnHover
          pointerOnHover
        /> : <div>Không có dữ liệu</div>
      }
    </div>
  );
};

export default PromotionTable;
