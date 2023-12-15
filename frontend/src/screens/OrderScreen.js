import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import OrderMain from "../components/Orders/OrderMain";
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";

const OrderScreen = () => {
  
  
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderMain />
      </main>
    </>
  );
};

export default withAuthorization(OrderScreen,[PERMISSIONS.isSaleAgent.access_orders]);
