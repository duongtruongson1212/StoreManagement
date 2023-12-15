import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import UserComponent from "../components/Users/UserComponent";

const UsersScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserComponent />
      </main>
    </>
  );
};

export default UsersScreen;
