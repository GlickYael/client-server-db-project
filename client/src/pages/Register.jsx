import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FullRegister from "../components/FullRegister";
import "./pages_css/Register.css";
function Register() {
  const myName = useRef("");
  const myPassword = useRef("");
  const myVerifyPassword = useRef("");
  const [status, setStatus] = useState("typing");
  const [fullRegisterDiv, setFullRegisterDiv] = useState(false);
  const navigate = useNavigate();

  const URL_API = "http://localhost:3000";
  function formHandler(e) {
    e.preventDefault();
    setStatus("submitting");
    if (myPassword.current !== myVerifyPassword.current) {
      setStatus("typing");
      return;
    }
    checkingData();
    setStatus("success");
  }
  async function checkingData() {
    const response = await fetch(`${URL_API}/users/register`, {
      method: "POST",
      body: JSON.stringify({name:myName.current}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
    ).catch((error) => {
      console.log("Error:", error);
    });
    const currentUser = await response.json();
    if (currentUser.length == 0) {
      setFullRegisterDiv(true);
    } else {
      alert("משתמש קיים במערכת יש להתחבר");
      navigate("/");
      return;
    }
  }
  return (
    <>
      {!fullRegisterDiv && (
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
          <label name="verifyPassword" for="verifyPassword">
            Enter your password
          </label>
          <input
            disabled={status == "submitting"}
            name="verifyPassword"
            id="verifyPassword"
            type="password"
            onChange={(e) => {
              myVerifyPassword.current = e.target.value;
            }}
          />
          <button type="submit" disabled={status == "submitting"}>
            submit
          </button>
        </form>
      )}
      {fullRegisterDiv && <FullRegister name={myName.current} password={myPassword.current}/>}
    </>
  );
}

export default Register;
