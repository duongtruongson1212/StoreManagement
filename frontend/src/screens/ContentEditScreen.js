import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditContentMain from "../components/Content/EditContentMain";
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";

const ContentEditScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditContentMain/>
      </main>
    </>
  );
};
export default withAuthorization(ContentEditScreen,[PERMISSIONS.isSaleAgent.access_content]);
