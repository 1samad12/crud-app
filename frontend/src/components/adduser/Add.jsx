import React, { useState } from 'react';
import "./Add.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Add() {
  
  const users ={
    fname:"",
    lname:"",
    email:"",
    password:""
  }
  const [user,setUser]=useState(users);

  const  inputHandler = (e) => {
    const {name,value} = e.target;
     setUser({...user,[name]:value});
    //  console.log(user);
     
  }
  const submitform =async(e)=>{
    e.preventDefault();

     await axios.post("http://localhost:8000/api/create",user)
     .then((response)=>{
      if(response.status===200){  
        window.location.href="/"
        alert("User added successfully");
        setUser(users);
      }
     }).catch((err)=>{alert(err)})  
  }
  console.log(user);
  

  return (
    <div className='add-user'>
      {/* Back Link */}
      <Link to={"/"} className='add-user-link'>Back</Link>

      {/* Heading */}
      <h5>Add New User</h5>

      {/* Form */}
      <form onSubmit={submitform}>
        {/* First Name Field */}
        <div className="input-filed">
          <label htmlFor='fname'>First Name</label>
          <input
            type="text"
            placeholder='First Name'
            name='fname'
            id='fname'
            autoComplete='off'
            onChange={inputHandler}
          />
        </div>

        {/* Last Name Field */}
        <div className="input-filed">
          <label htmlFor='lname'>Last Name</label>
          <input
            type="text"
            placeholder='Last Name'
            name='lname'
            id='lname'
            autoComplete='off'
            onChange={inputHandler}
          />
        </div>

        {/* Email Field */}
        <div className="input-filed">
          <label htmlFor='email'>Email</label>
          <input
            type="email"
            placeholder='Email'
            name='email'
            id='email'
            autoComplete='off'
            onChange={inputHandler}
          />
        </div>

        {/* Password Field */}
        <div className="input-filed">
          <label htmlFor='password'>Password</label>
          <input
            type="password"
            placeholder='Password'
            name='password'
            id='password'
            autoComplete='off'
            onChange={inputHandler}
          />
        </div>

        {/* Submit Button */}
        <div className="input-filed">
          <button type='submit'>Add User</button>
        </div>
      </form>
    </div>
  );
}

export default Add;
