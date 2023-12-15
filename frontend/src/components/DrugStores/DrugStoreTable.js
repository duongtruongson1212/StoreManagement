import DataTable from "react-data-table-component";
import React, {useEffect} from "react";
import {Link,useHistory} from "react-router-dom";
import CustomLoader from '../../util/LoadingTable';
import ExpandedComponent from './ExpandedComponent'
import NoRecords from "../../util/noData";

const DrugStoreTable = (props) =>{
    const {drugstores, dessert, expanded, loading} = props 
    const history=useHistory()
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
                <div className="dropdown-menu active-menu">
                    <button className="dropdown-item" onClick={(e) => {
                        e.stopPropagation()
                        let id=row._id
                        history.push(`/drugstore/${id}`)
                    }}>
                        <i className="fas fa-pencil"></i>
                        <span style={{marginLeft: '15px'}}>Chỉnh sửa</span>
                    </button>
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
            name: "Tên sản phẩm",
            selector: (row) => row?.product?.name,
            sortable: true,
            reorder: true,
            minWidth: "150px",
            grow: 3
        },
        {
            name: "Hình ảnh",
            selector: (row) => <img className="mt-1 w-80 h-80" style={{width:"100px",height:"100px"}} src={row?.product?.image?.slice(0,0+1)} alt="ImageCategory" />,
            minWidth: "150px",
        },
        {
            name: "Giá bán",
            selector: (row) => row?.product?.price.toLocaleString('vi-VN').replace(/\./g, ',')+" vnđ",
            sortable: true,
            minWidth: "150px",
        },
        {
            name: "Số lượng",
            selector: (row) => row?.stock?.reduce((sum,item)=>{
                return sum+item.count
            },0),
            sortable: true,
            minWidth: "150px",
        },
        {
            name: "Đơn vị tính",
            selector: (row) => row?.product?.unit,
            sortable: true,
            reorder: true,
            minWidth: "140px",
            grow: 2
        },
        {
            name: "Giảm giá",
            selector: (row) => row?.discount,
            sortable: true,
            minWidth: "130px",
        },
        {
            name: "Hiển thị",
            selector: (row) => row?.isActive?
                <span className="badge bg-success text-white p-2" style={{minWidth: '45px'}}>Có</span>:
                <span className="badge bg-danger text-white p-2" >Không</span>,
            sortable: true,
            reorder: true,

            minWidth: "150px",
        },
        {
            name: "Hành động",
            cell: row => <CustomMaterialMenu size="small" row={row} />,
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
    const isExpanded = row => row.defaultExpanded;

    useEffect(()=>{
        drugstores?.map(item=>item.defaultExpanded = expanded)// eslint-disable-next-line
    },[expanded])


    const handleRowClicked = (row) => {
        history.push(`/drugstore/${row._id}`)
      };


  return (
    <>

        <DataTable
            // theme="solarized"
            columns={columns}
            data={drugstores}
            noDataComponent={NoRecords()}
            customStyles={customStyles}
            defaultSortFieldId
            pagination
            onRowClicked={handleRowClicked}
            paginationComponentOptions={paginationComponentOptions}
            progressPending={loading}
            expandableRows
			expandableRowExpanded={isExpanded}
            expandableRowsComponent={(data) => <ExpandedComponent data={data} dessert={dessert} />}
		    progressComponent={<CustomLoader />}
            highlightOnHover
            pointerOnHover
        />
    </>

  )  
}
export default DrugStoreTable;