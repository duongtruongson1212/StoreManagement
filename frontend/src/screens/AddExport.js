import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddExportStock from '../components/ExportStock/AddExportStock';

const AddImport = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddExportStock />
      </main>
    </>
  );
};

export default AddImport;
