import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainInventoryCheck from "../components/InventoryCheck/MainInventoryCheck";
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";


const InventoryCheckScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainInventoryCheck/>
      </main>
    </>
  );
};

export default withAuthorization(InventoryCheckScreen,[PERMISSIONS.isInventory.check_inventory]);
