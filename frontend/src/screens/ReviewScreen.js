import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainReview from "../components/Reviews/MainReview";
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";


const DrugStoreScreen=({match}) => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainReview />
      </main>
    </>
  );
};

export default withAuthorization(DrugStoreScreen,[PERMISSIONS.isSaleAgent.access_comment]);

