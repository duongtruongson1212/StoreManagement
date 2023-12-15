import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainProvider from './../components/Provider/MainProvider';
import { withAuthorization } from "../util/withAuthorization ";
import { PERMISSIONS } from "../util/RolesContanst";

const ProviderScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProvider/>
      </main>
    </>
  );
};

// export default withAuthorization(ProviderScreen,[PERMISSIONS.isAdmin]);
export default ProviderScreen;