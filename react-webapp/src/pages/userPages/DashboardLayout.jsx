import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import QuestsNavBar from "../../components/userComponents/QuestsNavBar";
import Footer from "../../components/visitorComponents/Footer";

export default function DashbaordLayout() {
  // const [user, setUser] = useState(() =>
  //   JSON.parse(localStorage.getItem("user"))
  // );
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     setUser(user);
  //   } else {
  //     navigate("/");
  //     console.log("No user found in localStorage.");
  //   }
  // }, []);

  return (
    <div>
      <QuestsNavBar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
