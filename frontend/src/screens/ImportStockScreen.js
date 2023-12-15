import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainImportStock from './../components/ImportStock/MainImportStock';
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";

const ImportStockScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainImportStock/>
      </main>
    </>
  );
};

export default withAuthorization(ImportStockScreen,[PERMISSIONS.isInventory.import_inventory]);
