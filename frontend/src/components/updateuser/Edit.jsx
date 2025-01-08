import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Edit.css';

function Edit() {
  const { id } = useParams(); // Get user ID from URL parameters
  const navigate = useNavigate(); // Hook for programmatic navigation
  

  // State for storing user data
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    email: ''
  });

  // Input change handler
  const inputHandlers = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Fetch user data on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getone/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Form submission handler
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/update/${id}`, user);
      if (response.status === 200) {
        alert('User updated successfully');
        navigate('/'); // Redirect to home page
      }
    } catch (err) {
      console.error(err);
      alert('Error updating user');
    }
  };

  return (
    <div className="edit-user">
      {/* Back Link */}
      <Link to="/" className="edit-user-link">
        Back
      </Link>

      {/* Heading */}
      <h5>Update User</h5>

      {/* Form */}
      <form onSubmit={submitForm}>
        {/* First Name Field */}
        <div className="input-field">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            name="fname"
            id="fname"
            value={user.fname}
            onChange={inputHandlers}
            autoComplete="off"
          />
        </div>

        {/* Last Name Field */}
        <div className="input-field">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lname"
            id="lname"
            value={user.lname}
            onChange={inputHandlers}
            autoComplete="off"
          />
        </div>

        {/* Email Field */}
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={user.email}
            onChange={inputHandlers}
            autoComplete="off"
          />
        </div>

        {/* Submit Button */}
        <div className="input-field">
          <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
