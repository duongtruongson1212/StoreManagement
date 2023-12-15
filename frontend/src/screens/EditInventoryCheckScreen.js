import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import EditInventoryCheck from "../components/InventoryCheck/EditInventoryCheck";
import { PERMISSIONS } from "../util/RolesContanst";
import { withAuthorization } from "../util/withAuthorization ";

const EditInventoryCheckScreen = () => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditInventoryCheck checkId={id}/>
      </main>
    </>
  );
};

export default withAuthorization(EditInventoryCheckScreen,[PERMISSIONS.isInventory.check_inventory_edit]);
