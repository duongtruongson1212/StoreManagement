import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DetailCategories from "../components/Categories/CategoriesDetail";
import { useParams } from 'react-router-dom';

const CategoriesDetail = () => {
  const {id} = useParams()
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <DetailCategories categoryId={id} />
      </main>
    </>
  );
};

export default CategoriesDetail;
