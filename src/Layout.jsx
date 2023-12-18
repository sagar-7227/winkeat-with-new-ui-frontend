import React from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useLocation } from "react-router-dom";
import SidebarWithHeader from "./components/Header";
const Layout = () => {
  const location = useLocation();
  const path = location.pathname;
  const withSidebar = path.search("/auth");
  console.log(withSidebar);

  if (path === "/auth/login") {
    return <Outlet />;
  } else if (path === "/auth/signup") {
    return <Outlet />;
  } else if (path === "/auth/verify-email") {
    return <Outlet />;
  } else if (path === "/auth/password/forgot") {
    return <Outlet />;
  } else if (path === "/auth/reset-password") {
    return <Outlet />;
  } else
    return (
      <div>
        {/* <Sidebar /> */}
        <SidebarWithHeader />
        {/* <div>layout</div> */}
      </div>
    );
};

export default Layout;
