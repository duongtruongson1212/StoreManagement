import React from "react";
const NoRecords = (props) => {
  const textNoRecord = props 
  return (
    <div className="d-flex" style={{color:'red', marginTop: '10px', fontSize: '20px'}}>
      <p>Không có dữ liệu để hiển thị {textNoRecord ? `, ${textNoRecord}` : ''}</p>
    </div>
  );
};

export default NoRecords;
