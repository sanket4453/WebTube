import React from "react";
import SideBar from "./SideBar";
import MainContainer from "./MainContainer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto bg-neutral-900">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Body;
