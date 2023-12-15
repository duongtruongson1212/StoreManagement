import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddReqInventory from '../components/ReqInventory/AddReqInventory';
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";

const AddRequestInventory = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddReqInventory />
      </main>
    </>
  );
};

export default withAuthorization(AddRequestInventory,[PERMISSIONS.isInventory.request_inventory_add]);
