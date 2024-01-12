import React, { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/navbar";
import UsersTable from "../components/usersTable";
import AddUserModal from "../components/userFormModal";
import Button from "react-bootstrap/Button";
import { USERS_URL } from "../apiurls";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchUsers = async () => {
    const respone = await api.get(USERS_URL);
    setUsers(respone.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [show]);

  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <h1>Users</h1>
        <UsersTable users={users} />
        <Button variant="primary" onClick={handleShow}>
          Add User
        </Button>
        <AddUserModal show={show} handleClose={handleClose} />
      </div>
    </div>
  );
};
export default Users;
