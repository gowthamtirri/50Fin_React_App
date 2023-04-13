import "./addUserForm.css";
import { useState } from "react";

// Add's new user to the users list
const AddUserFrom = ({ setAddUserActive, setUsers }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  // to handle inputs
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // add new user to the users list
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };
    setUsers((prevUsers) => [newUser, ...prevUsers]);
    setAddUserActive(false);
  };
  return (
    <div className="addUserForm">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </div>

        <div className="formBtns">
          <button className="addBtn" type="submit">
            Add User
          </button>
          <button className="cancelBtn" onClick={() => setAddUserActive(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserFrom;
