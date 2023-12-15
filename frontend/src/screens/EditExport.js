import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditExportStock from '../components/ExportStock/EditExportStock';
import { useParams } from "react-router-dom";

const AddImport = () => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditExportStock exportId={id}/>
      </main>
    </>
  );
};

export default AddImport;
