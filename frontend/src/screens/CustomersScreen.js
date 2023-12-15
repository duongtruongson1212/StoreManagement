import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CustomerComponent from "../components/Customers/CustomerComponent";

const CustomersScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <CustomerComponent />
      </main>
    </>
  );
};

export default CustomersScreen;
