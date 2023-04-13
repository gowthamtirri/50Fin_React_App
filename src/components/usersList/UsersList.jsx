import "./userList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddUserForm, Loading } from "../../components";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [addUserActive, setAddUserActive] = useState(false);

  const [loading, setLoading] = useState(true);

  // fetches data from API
  useEffect(() => {
    axios
      .get("https://drab-blue-shark-robe.cyclic.app/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      });
  }, []);

  // set indexes for Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // filter users based on serach input
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* NewUser form will be shown after clicking on addnew user Button */}
      {addUserActive && (
        <AddUserForm setUsers={setUsers} setAddUserActive={setAddUserActive} />
      )}

      <div className="listWrapper">
        <div className="control-panel">
          <div className="itemsPerPage">
            <p>Items Per Page </p>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
            >
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="search">
            <input
              type="search"
              placeholder="&#128269; Search User"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="addUser">
            <button onClick={() => setAddUserActive(true)}>+ Add User</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredUsers.length / itemsPerPage) },
            (_, index) => (
              <button
                className={currentPage === index + 1 ? "active" : ""}
                key={index}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
