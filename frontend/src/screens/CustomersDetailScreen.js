import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CustomerDetailMain from "../components/Customers/CustomerDetailMain";
import {useParams} from "react-router-dom";

const CustomersDetailScreen = () => {
  const {id} = useParams()
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <CustomerDetailMain customerId={id} />
      </main>
    </>
  );
};

export default CustomersDetailScreen;
