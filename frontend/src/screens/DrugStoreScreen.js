import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import MainDrugStores from "./../components/DrugStores/MainDrugStores";
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";


const DrugStoreScreen=({match}) => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainDrugStores />
      </main>
    </>
  );
};

// export default withAuthorization(DrugStoreScreen,[PERMISSIONS.isSaleAgent.drug_store]);

export default DrugStoreScreen;