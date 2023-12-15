import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainReqInventory from './../components/ReqInventory/MainReqInventory';
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";

const ReqInventoryScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainReqInventory/>
      </main>
    </>
  );
};

export default withAuthorization(ReqInventoryScreen,[PERMISSIONS.isInventory.request_inventory]);
