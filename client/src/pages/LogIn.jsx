import React, { useState, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./pages_css/LogIn.css";
function LogIn() {
  const [status, setStatus] = useState("typing");
  const URL_API = "http://localhost:3000";
  const navigate = useNavigate();
  const myName = useRef("");
  const myPassword = useRef("");

  function formHandler(e) {
    e.preventDefault();
    setStatus("submitting");
    checkingData();
    setStatus("success");
  }
  async function checkingData() {
    const response = await fetch(
      `${URL_API}/users/logIn`, {
        method: "POST",
        body: JSON.stringify({name:myName.current, password:myPassword.current}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    ).catch((error) => {
      console.log("Error:", error);
    });
    const currentUser = await response.json();
    console.log(currentUser);
    if (currentUser.length == 0) {
      alert("שם משתמש או הסיסמה שגויים");
      navigate("/");
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    navigate("/Home");
  }

  return (
    <>
      <form onSubmit={formHandler}>
        <label name="name" for="name">
          Enter your name
        </label>
        <input
          disabled={status == "submitting"}
          name="name"
          id="name"
          type="text"
          onChange={(e) => {
            myName.current = e.target.value;
          }}
        />

        <label name="password" for="password">
          Enter your password
        </label>
        <input
          disabled={status == "submitting"}
          name="password"
          id="password"
          type="password"
          onChange={(e) => {
            myPassword.current = e.target.value;
          }}
        />
        <button type="submit" disabled={status === "submitting"}>
          submit
        </button>
      </form>
    </>
  );
}

export default LogIn;
