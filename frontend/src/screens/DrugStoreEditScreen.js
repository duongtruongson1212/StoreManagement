import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditDrugStoreMain from "../components/DrugStores/EditDrugStoreMain";
import {useParams} from "react-router-dom";


const DrugStoreEditScreen=({match}) => {
  const {id}=useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditDrugStoreMain drugstoreId={id} />
      </main>
    </>
  );
};
export default DrugStoreEditScreen;
