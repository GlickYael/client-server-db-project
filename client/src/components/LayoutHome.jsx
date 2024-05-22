import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../all.min.css";
import "./components_css/LayoutHome.css";

function LayoutHome() {
  const [menu, setMenu] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
  const myId = currentUser.id;
  console.log(myId);
  function menuHandler() {
    setMenu(!menu);
  }
  return (
    <>
      <h1>{currentUser.name}</h1>
      <button id="menubtn" onClick={menuHandler}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <button id="homebtn">
        <Link to="/Home">
          <i className="fa-solid fa-house"></i>
        </Link>
      </button>
      {menu && (
        <div className="menu-container">
          <button className="menu-item">
            <Link to="/Todo">To Do</Link>
          </button>
          <button className="menu-item">
            <Link to="/Post">Post</Link>
          </button>
        </div>
      )}
      <Outlet className="outlet" context={myId} />
    </>
  );
}

export default LayoutHome;

LayoutHome.js;
