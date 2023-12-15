import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditImportStock from '../components/ImportStock/EditImportStock';
import { useParams } from "react-router-dom";

const AddImport = () => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditImportStock importId={id}/>
      </main>
    </>
  );
};

export default AddImport;
