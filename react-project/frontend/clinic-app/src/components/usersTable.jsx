import UserInfoModal from "./userInfoModal";
import { useState } from "react";

export default function UsersTable({ users }) {
  const [show, setShow] = useState(false);
  const [userToShow, setUserToShow] = useState({});
  const handleClose = () => setShow(false);

  const handleShowUser = (userData) => {
    setUserToShow(userData);
    setShow(true);
  };

  return (
    <>
      <UserInfoModal show={show} handleClose={handleClose} userInfo={userToShow} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} onClick={() => handleShowUser(user)}>
              <th scope="row">{index + 1}</th>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
