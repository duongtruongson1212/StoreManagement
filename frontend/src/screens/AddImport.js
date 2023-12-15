import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddImportStock from './../components/ImportStock/AddImportStock';

const AddImport = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddImportStock />
      </main>
    </>
  );
};

export default AddImport;
