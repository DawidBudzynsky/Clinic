import React, { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/navbar";
import UsersTable from "../components/usersTable";
import AddUserModal from "../components/userFormModal";
import ErrorPage from "./ErrorPage";
import { USERS_URL } from "../apiurls";
import { toast, ToastContainer } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toastError = (text) => toast.error(text);

  const fetchUsers = async () => {
    try {
      const response = await api.get(USERS_URL);
      //NOTE: thats arbitrally set i guess
      setAuthorized(true);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      setAuthorized(false);
      toastError("You are not authorized to see this content");
    }

  };

  useEffect(() => {
    fetchUsers();
  }, [show]);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      {!!authorized ? (
        <ErrorPage />
      ) : (
        <div className="container my-4">
          <h1>Users</h1>
          <UsersTable users={users} />
          <button className="whiteButton" variant="primary" onClick={handleShow}>
            Add User
          </button>
          <AddUserModal show={show} handleClose={handleClose} />
        </div>
      )}
      <div className="greenBackground"></div>
    </div>
  );
};
export default Users;
