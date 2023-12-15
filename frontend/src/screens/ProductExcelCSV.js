import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ExcelCSVProductComponent from "../components/Products/ExcelCSVProduct";

const ProductScreen = () => {

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ExcelCSVProductComponent/>
      </main>
    </>
  );
};

export default ProductScreen;
