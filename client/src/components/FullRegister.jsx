import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./components_css/FullRegister.css";

function FullRegister({name,password}) {
  const URL_API = "http://localhost:3000";
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: name,
    email: "",
    address:"",
    phone: "",
    password: password
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    async function addNewUserToDataBase() {
      const response = await fetch(`${URL_API}/users`, {
        method: "POST",
        body: JSON.stringify(currentUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).catch((error) => {
        console.log("Error:", error);
      });
      const result = await response.json();
      localStorage.setItem("currentUser", JSON.stringify(result));
    }
    addNewUserToDataBase();
    navigate("/Home");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-row">

          {/* Email */}
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={currentUser.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-row">
        {/* Address*/}
        <label>
            Address:
            <input
              type="text"
              name="address"
              value={currentUser.address}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {/* Phone */}
        <div className="form-row">
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={currentUser.phone}
              onChange={handleChange}
              required
            />
          </label>

        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
export default FullRegister;
