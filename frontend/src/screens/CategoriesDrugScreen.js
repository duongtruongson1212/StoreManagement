import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainCategoriesDrug from "../components/CategoriesDrug/MainCategoriesDrug";

const CategoriesScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainCategoriesDrug />
      </main>
    </>
  );
};

export default CategoriesScreen;
