import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddInventoryCheck from '../components/InventoryCheck/AddInventoryCheck';
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";
const AddInventoryCheckScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddInventoryCheck />
      </main>
    </>
  );
};

export default withAuthorization(AddInventoryCheckScreen,[PERMISSIONS.isInventory.check_inventory_add]);
