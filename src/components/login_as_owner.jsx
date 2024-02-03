import React, { useState } from 'react';
import {auth} from "./accomodation.js";
import Profile from './profile.jsx';
import "../style/log_as_owner.css";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";


const Login_as_owner = (props) => {
  const [userId,setuserId] = useState("");
  const [data,setdata] = useState({
    username : "",
    email : "",
    password : ""
  })

  let newedit = (obj)=>{
    props.brandedit(obj);
  }

  let getLogin = (data)=>{
    props.login(data);
  }
  let getUser = (data)=>{
    props.user(data);
  }
  let getEmail = (data)=>{
    props.email(data);
  }
  let name;
  let value;
  let dataChange = (event)=>{
    name = event.target.name;
    value = event.target.value;
    setdata({...data,[name]:value});
  }

  // Sign In User
  let logInUser = async(e)=>{
    e.preventDefault();
    if(data.email==="" || data.password==="" || data.username===""){
      alert("Please Fill out all the fields");
    }
    else{
    await signInWithEmailAndPassword(auth, data.username+"-"+data.email, data.password)
  .then((userCredential) => {
    const user = userCredential.user;
    setuserId(user.uid);
    props.login(user.uid);
    props.user(data.username);
    props.email(data.email);
    alert("You are Successfully Logged in to the account");
  })
  .catch((err) => {
    alert(`OOPs! ${err.message} with code ${err.code}`);
  });
    }
  }
  return (
    <>
    {userId==="" && <div className="log-as-own">
      <div className="log-form">
        <form>
          <h2 className="login-pg-owner">
            Login as <br /> PG Owner
          </h2>
          <div className="input-box">
            <input type="text" name="username" value={data.username} onChange={dataChange} placeholder="Username"/>
            <input className="emial" type="email" name="email" value={data.email} onChange={dataChange} placeholder="Your email address" />
            <input
              className="pass"
              type="password" name="password" value={data.password} onChange={dataChange}
              placeholder="Your password"
            />
          </div>
        </form>
        <button type="submit" onClick={logInUser}>Log In</button>
      </div>
      <div className="new-here">
        <h2>New here</h2>
        <p>Sign up and explore</p>
        <button>
          <Link to="/signup">Sign up</Link>
        </button>
      </div>
    </div>}

    {userId!=="" && <Profile newedit = {newedit} uId = {userId} login = {getLogin} user = {getUser} email = {getEmail} Pname = {data.username} Pemail = {data.email}/>}
    </>
  );
};

export default Login_as_owner;
