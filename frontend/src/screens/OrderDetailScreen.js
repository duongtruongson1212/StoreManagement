import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import OrderDetailMain from "../components/Orders/OrderDetailMain";
import { useParams } from "react-router-dom";

const OrderDetailScreen = () => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailMain orderId={id}/>
      </main>
    </>
  );
};

export default OrderDetailScreen;
