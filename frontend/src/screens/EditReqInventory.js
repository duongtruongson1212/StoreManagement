import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditReqInventory from '../components/ReqInventory/EditReqInventory';
import { useParams } from "react-router-dom";
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";

const EditRequestInventory = () => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditReqInventory reqId={id}/>
      </main>
    </>
  );
};

export default withAuthorization(EditRequestInventory,[PERMISSIONS.isInventory.request_inventory_edit]);
