import React from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import NoRecords from "../../util/noData";
const ExpandedExportComponent = (props) => {
  const { data, dessert } = props;
  const columns = [
    {
      name: "STT",
      selector: (row, index) => <b>{index + 1}</b>,
      reorder: true,
    },
    {
      name: "Số lô",
      selector: (row) => row?.lotNumber,
      sortable: true,
      reorder: true,
    },
    {
      name: "Số lượng",
      selector: (row) => row?.count,
      sortable: true,
    },
    {
      name: "Hạn sử dụng",
      selector: (row) => moment(row?.expDrug).format("DD-MM-YYYY"),
      sortable: true,
      minWidth: "180px",
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => moment(row?.expDrug).diff(moment(Date.now()), "days") > 180,
      style: {
        backgroundColor: "rgba(63, 195, 128, 0.9)",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) =>
        moment(row?.expDrug).diff(moment(Date.now()), "days") >= 90 &&
        moment(row?.expDrug).diff(moment(Date.now()), "days") < 180,
      style: {
        backgroundColor: "rgba(248, 148, 6, 0.9)",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => moment(row?.expDrug).diff(moment(Date.now()), "days") < 90,
      style: {
        backgroundColor: "rgba(242, 38, 19, 0.9)",
        color: "white",
        "&:hover": {
          cursor: "not-allowed",
        },
      },
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
      style: {
        minHeight: "32px",
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
        minHeight: "40px",
      },
    },
    cells: {
      style: {
        fontSize: '14px',
      },
    },
  };

  return (
    <div style={{ paddingBottom: "1rem" }}>
      <div className="row">
        <div className="card card-custom mb-4 shadow-sm">
          <header className="card-header bg-white ">
            <DataTable
              // theme="solarized"
              columns={columns}
              data={data}
              noDataComponent={NoRecords()}
              customStyles={customStyles}
              defaultSortFieldId
              // onRowClicked={handleRowClicked}
              conditionalRowStyles={dessert ? conditionalRowStyles : ""}
              // progressPending={loading||loadingDelete}
              // progressComponent={<CustomLoader />}
              highlightOnHover
              pointerOnHover
            />
          </header>
        </div>
      </div>
    </div>
  );
};
export default ExpandedExportComponent;
