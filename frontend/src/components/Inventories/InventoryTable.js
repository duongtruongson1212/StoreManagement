import DataTable from "react-data-table-component";
import React, {useEffect} from "react";
import CustomLoader from '../../util/LoadingTable';
import ExpandedComponent from './ExpandedComponent'
import NoRecords from "../../util/noData";
const InventoryTable = (props) =>{
    const {inventory, colorOH, colorHSD, expanded, loading} = props 
    const columns = [
        {
            name: "STT",
            selector: (row, index) => <b>{index+1}</b>,
            reorder: true,
            width: '60px'

        },
        {
            name: "Tên sản phẩm",
            selector: (row) => row?.name,
            sortable: true,
            reorder: true,
            grow: 3
        },
        {
            name: "Nhóm sản phẩm",
            selector: (row) => row?.category,
            sortable: true,
            reorder: true,
            grow: 3
        },
        {
            name: "Nhóm thuốc",
            selector: (row) => row?.categoryDrug,
            sortable: true,
            reorder: true,
            grow: 3
        },
        {
            name: "Tổng tồn",
            selector: (row) => row?.total_count,
            sortable: true,
            reorder: true,
            grow: 2
        },
        {
            name: "Đơn vị tính",
            selector: (row) => row?.unit,
            sortable: true,
            reorder: true,
            grow: 2
        }     
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
        inventory?.map(item=>item.defaultExpanded = expanded)// eslint-disable-next-line
    },[expanded])


  return (
    <>

        <DataTable
            // theme="solarized"
            columns={columns}
            data={inventory}
            noDataComponent={NoRecords()}
            customStyles={customStyles}
            defaultSortFieldId
            pagination
            // onRowClicked={handleRowClicked}
            paginationComponentOptions={paginationComponentOptions}
            progressPending={loading}
            expandableRows
			expandableRowExpanded={isExpanded}
            expandableRowsComponent={(data) => <ExpandedComponent data={data} colorHSD={colorHSD} colorOH={colorOH} />}
		    progressComponent={<CustomLoader />}
            highlightOnHover
            pointerOnHover
        />
    </>

  )  
}
export default InventoryTable;