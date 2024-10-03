import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/visitorComponents/NavBar";
import Footer from "../../components/visitorComponents/Footer";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
