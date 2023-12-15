import DataTable from "react-data-table-component";
import React, { useEffect } from "react";
import CustomLoader from "../../util/LoadingTable";
import ExpandedExportComponent from "./ExpandedExportComponent";
import NoRecords from "../../util/noData";
const ExportTable = (props) => {
  const { itemProducts, dessert, expanded, handleDeleteItem } = props;
  const columns = [
    {
      name: "STT",
      selector: (row, index) => <b>{index + 1}</b>,
      reorder: true,
      width: "60px",
    },
    {
      name: "Tên sản phẩm",
      selector: (row) => row?.product?.name || row?.name,
      sortable: true,
      reorder: true,
      grow: 3,
    },

    {
      name: "Tổng số lượng",
      selector: (row) =>
        row?.lotField?.reduce((accumulator, currentValue) => {
          return accumulator + parseInt(currentValue.count);
        }, 0),
      sortable: true,
      reorder: true,
      grow: 2,
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
    },
  ];
  const customStyles = {
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "rgb(230, 244, 244)",
        borderBottomColor: "#FFFFFF",
        // borderRadius: '25px',
        outline: "1px solid #FFFFFF",
      },
    },
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        fontSize: "16px",
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "grey",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "grey",
        },
      },
    },
    cells: {
      style: {
        fontSize: '16px',
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "grey",
        },
      },
    },
  };
  const isExpanded = (row) => row.defaultExpanded;

  useEffect(() => {
    itemProducts?.map((item) => (item.defaultExpanded = expanded)); // eslint-disable-next-line
  }, [expanded]);

  return (
    <>
      <DataTable
        // theme="solarized"
        columns={columns}
        data={itemProducts}
        noDataComponent={NoRecords()}
        customStyles={customStyles}
        defaultSortFieldId
        // onRowClicked={handleRowClicked}
        expandableRows
        expandableRowExpanded={isExpanded}
        expandableRowsComponent={(data) => (
          <ExpandedExportComponent data={data?.data?.lotField.filter((row) => row?.count > 0)} dessert={dessert} />
        )}
        progressComponent={<CustomLoader />}
        highlightOnHover
        pointerOnHover
      />
    </>
  );
};
export default ExportTable;
