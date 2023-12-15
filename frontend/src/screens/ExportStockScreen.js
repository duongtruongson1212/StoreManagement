import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainExportStock from '../components/ExportStock/MainExportStock';
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";

const ProviderScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainExportStock/>
      </main>
    </>
  );
};

export default withAuthorization(ProviderScreen,[PERMISSIONS.isInventory.export_inventory]);
