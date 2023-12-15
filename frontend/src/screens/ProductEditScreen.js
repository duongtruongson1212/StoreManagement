import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import EditProductMain from "./../components/Products/EditproductMain";
import { useParams } from "react-router-dom";


const ProductEditScreen = ({match}) => {
  const {id} = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain productId={id} />
      </main>
    </>
  );
};
export default ProductEditScreen;
