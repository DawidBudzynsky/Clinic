import UserInfoModal from "./userInfoModal";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function UsersTable({ users }) {
  const [show, setShow] = useState(false);
  const [userToShow, setUserToShow] = useState({});
  const [search, setSearch] = useState('');
  const handleClose = () => setShow(false);

  const handleShowUser = (userData) => {
    setUserToShow(userData);
    setShow(true);
  };

  const fieldsToSearch = ["username", "first_name", "last_name"]

  return (
    <>
      <UserInfoModal show={show} handleClose={handleClose} userInfo={userToShow} />
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
              <tr key={user.id} onClick={() => handleShowUser(user)}>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
