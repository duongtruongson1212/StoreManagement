import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainPromotion from "../components/Promotion/MainPromotion";
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";

const PromotionScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainPromotion />
      </main>
    </>
  );
};

export default withAuthorization(PromotionScreen,[PERMISSIONS.isSaleAgent.access_promotion]);
