import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DetailCategoriesDrug from "../components/CategoriesDrug/CategoriesDrugDetail";
import { useParams } from 'react-router-dom';

const CategoriesDrugDetail = () => {
  const {id} = useParams()
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <DetailCategoriesDrug categoryId={id} />
      </main>
    </>
  );
};

export default CategoriesDrugDetail;
