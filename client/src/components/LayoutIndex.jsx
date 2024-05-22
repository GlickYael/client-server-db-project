import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./components_css/LayoutIndex.css";

function LayoutIndex() {
  const location = useLocation();
  useEffect(() => {
    document.body.classList.add("LayoutIndex-component");
    return () => {
      document.body.classList.remove("LayoutIndex-component");
    };
  }, []);

  return (
    <>
      <ul>
        <li>
          <Link
            to="/Register"
            className={location.pathname === "/Register" ? "active" : ""}
          >
            Register
          </Link>
        </li>
        <li>
          <Link
            to="/LogIn"
            className={location.pathname === "/LogIn" ? "active" : ""}
          >
            LogIn
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default LayoutIndex;
