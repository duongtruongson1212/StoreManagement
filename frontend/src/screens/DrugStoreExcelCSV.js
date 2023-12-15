import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ExcelCSVDrugStore from "../components/DrugStores/ExcelCSVDrugStore";

const ProductScreen = () => {

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ExcelCSVDrugStore/>
      </main>
    </>
  );
};

export default ProductScreen;
