import React from "react";
import Dashboard from "./dashboard/page";
import Sidebar from "@/components/admin/Sidebar";

const layout = () => {
  return (
    <div>
        <h1>Rayhan islam</h1>
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default layout;
