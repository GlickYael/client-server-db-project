import React from "react";
import { useOutletContext } from "react-router-dom";
import "../components/components_css/Info.css";
function Info() {
  const id = useOutletContext();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser.id);

  return (
    <>
      <div className="info-container">
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{currentUser.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{currentUser.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{currentUser.email}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td> {currentUser.address}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{currentUser.phone}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Info;
