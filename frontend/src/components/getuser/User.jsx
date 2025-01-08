import React, { useEffect } from 'react';
import "./User.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

function User() {
  const [users, setUser] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/api/getall");
      setUser(res.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Make the DELETE request to the backend API
      const response = await axios.delete(`http://localhost:8000/api/delete/${id}`);
      
      // Check if the request was successful
      if (response.status === 200) {
        // Update the state to remove the deleted user
        setUser((prevUsers) => prevUsers.filter((user) => user._id !== id));
        alert("User deleted successfully.");
      } else {
        alert("Failed to delete the user. Please try again.");
      }
    } catch (error) {
      // Log the error and provide user feedback
      console.error("Error deleting the user:", error);
      alert("An error occurred while trying to delete the user.");
    }
  };

  return (
    <div className='user-table-container'>
      <div  style={{display:"flex", justifyContent:"space-between", backgroundColor:"white"}}>
      <Link to={"/add"} className='add-user-link'>Add User</Link>
      <h4  style={{color:"black",backgroundColor:"white",padding:"10px", alignItems:"center"}}>CRUD APP</h4>
      </div>
      <table className='user-table' border={1} cellPadding={10} cellSpacing={0}>
        <thead className='user-table-head'>
          <tr>
            <th className='table-header'>S.No</th>
            <th className='table-header'>User Name</th>
            <th className='table-header'>User Email</th>
            <th className='table-header'>Actions</th>
          </tr>
        </thead>
        <tbody className='user-table-body'>
          {users.map((user, index) => (
            <tr key={user._id} className="user-table-row">
              <td className="user-serial-number">{index + 1}.</td>
              <td className="user-name">{user.fname} {user.lname}</td>
              <td className="user-email">{user.email}</td>
              <td className="user-actions">
                <div className="action-buttons">
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user._id)} // Pass the user's id here
                  >
                    Delete
                  </button>
                  <Link to={`/edit/` + user._id} className="edit-link">Edit</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
