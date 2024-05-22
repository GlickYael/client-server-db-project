import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Info from "../components/Info";
import "./pages_css/Home.css";
function Home() {
  const [info, setInfo] = useState(false);
  const navigate = useNavigate();
  function LogOutHandler() {
    localStorage.clear();
    navigate("/");
  }

  function infoHandler() {
    setInfo(!info);
  }
  return (
    <>
      <button className="logout-btn" onClick={LogOutHandler}>
        <i className="fa-solid fa-right-from-bracket"></i> LogOut
      </button>
      <button className="info-btn" onClick={infoHandler}>
        Info
      </button>
      {info && (
        <div>
          <Info />
        </div>
      )}
    </>
  );
}

export default Home;
