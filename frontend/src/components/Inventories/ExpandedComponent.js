import React from 'react'
import  moment  from 'moment';
import DataTable from "react-data-table-component";
import NoRecords from '../../util/noData';
const ExpandedComponent = (props) =>{
    const {data, colorOH, colorHSD} = props
    const columns = [
        {
            name: "STT",
            selector: (row, index) => <b>{index+1}</b>,
            reorder: true,
        },
        {
            name: "Số lô",
            selector: (row) => `${row?.lotNumber} (${row?.expProduct})`,
            sortable: true,
            reorder: true,
        },
        {
            name: "Số lượng",
            selector: (row) => row?.count,
            sortable: true,
        },
        {
            name: "Ngày sản xuất",
            selector: (row) => moment(row?.manufactureDate).format("DD-MM-YYYY"),
            sortable: true,
            minWidth: "180px",
        },
        {
            name: "Hạn sử dụng",
            selector: (row) => moment(row?.expDrug).format("DD-MM-YYYY"),
            sortable: true,
            minWidth: "180px",
        }
    ];

    const conditionalRowStylesHSD = [
        {
            when: row => +Math.round((moment(row?.expDrug) - moment(Date.now())) / (30.44 * 24 * 60 * 60 * 1000)) > +(row?.expProduct/2),
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => +Math.round((moment(row?.expDrug) - moment(Date.now())) / (30.44 * 24 * 60 * 60 * 1000)) <= +(row?.expProduct/2) && Math.round((moment(row?.expDrug) - moment(Date.now())) / (24 * 60 * 60 * 1000)) >= 15,
            style: {
                backgroundColor: 'rgba(248, 148, 6, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => Math.round((moment(row?.expDrug) - moment(Date.now())) / (24 * 60 * 60 * 1000)) < 1,
            style: {
                backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'not-allowed',
                },
            },
        },
    ];

    const conditionalRowStylesOH = [
        {
            when: row => row?.count > 30,
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row?.count >= 1 && row?.count <= 30,
            style: {
                backgroundColor: 'rgba(248, 148, 6, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row?.count <= 0,
            style: {
                backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'not-allowed',
                },
            },
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


    return (
        <div style={{paddingBottom: '1rem'}}>
        <div className="row">
            <div className="card card-custom mb-4 shadow-sm">
                <header className="card-header bg-white ">
                    <DataTable
                        // theme="solarized"
                        columns={columns}
                        data={data?.data?.products}
                        noDataComponent={NoRecords()}
                        customStyles={customStyles}
                        defaultSortFieldId
                        // onRowClicked={handleRowClicked}
                        conditionalRowStyles={colorHSD ? conditionalRowStylesHSD : colorOH ? conditionalRowStylesOH : '' }
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