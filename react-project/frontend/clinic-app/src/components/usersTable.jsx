import UserInfoModal from "./userInfoModal";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Button from "react-bootstrap/Button";
import api from "../api";
import { toast } from "react-toastify";
import { DELETE_USER } from "../apiurls";

export default function UsersTable({ users, onApply }) {
  const [show, setShow] = useState(false);
  const [userToShow, setUserToShow] = useState({});
  const [search, setSearch] = useState('');
  const handleClose = () => setShow(false);


  const handleShowUser = (e, userData) => {
    if (e.target.tagName.toLowerCase() === "button") {
      e.stopPropagation();
      return;
    }
    setUserToShow(userData);
    setShow(true);
  };

  const handleDeleteUser = (user) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (confirmation) {
      try {
        api.delete(`${DELETE_USER}` + user.id);
        toast.success("User deleted successfully");
        onApply();
      } catch (error) {
        console.error(error);
        toast.error("Error deleting user");
        onApply();
      }
    }
  };

  const fieldsToSearch = ["username", "first_name", "last_name"]

  return (
    <>
      <UserInfoModal show={show} handleClose={handleClose} userInfo={userToShow} onApply={onApply} />
      <div className="px-3 py-3 shadow rounded-3 mb-5" style={{ minHeight: '60vh', backgroundColor: 'white' }}>

        <div className="d-flex mb-3 justify-content-between">
          <SearchBar setSearch={(e) => setSearch(e.target.value)} />
        </div>
        <table className="table table-striped" >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {users.filter((item) => {
              const searchTerm = search.toLowerCase();
              return (searchTerm === '' ? item : fieldsToSearch.some(field => item[field].toLowerCase().includes(searchTerm))
              );
            }).map((user, index) => (
              <tr key={user.id} onClick={(e) => handleShowUser(e, user)}>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <Button
                    className="primary btn-danger"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
