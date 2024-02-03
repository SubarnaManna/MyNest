import React, { useState } from "react";
import {auth} from "./accomodation.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/signup_as_owner.css";
import { Link } from "react-router-dom";

const Signup_as_owner = () => {
  const [data,setdata] = useState({
    username : "",
    email : "",
    password : ""
  })
  let name;
  let value;
  let dataChange = (event)=>{
    name = event.target.name;
    value = event.target.value;
    setdata({...data,[name]:value});
  }

  //Sign Up Username
  let signUpUser = async(e)=>{
    e.preventDefault();
    if(data.email==="" || data.password==="" || data.username===""){
      alert("Please Fill out all the fields");
    }
    else if(!(data.password.length>=8 && data.password.length<=20)){
      alert("your Password must contain 8 to 20 charecters");
    }
    else{
    let confirmSignUp = window.confirm(`Your Username is ${data.username} , email is ${data.email} and password is ${data.password}. Are you want to continue?`);
    if(confirmSignUp){
    await createUserWithEmailAndPassword(auth, data.username+"-"+data.email, data.password)
  .then((userCredential) => {
    const user = userCredential.user;
    alert("You are Successfully Signed Up to the account");
  })
  .catch((err) => {
    alert(`OOPs! ${err.message} with code ${err.code}`);
  });
    }
    setdata({
    username : "",
    email : "",
    password : ""
  })
    }
  }
  return (
    <>
      <div className="sign-as-own">
        <div className="sign-form">
          <form action="">
            <h2 className="sign-pg-owner">
              Register as <br /> PG Owner
            </h2>
            <div className="input-box">
              {/* <span className="name">
                <svg xmlns="http://www.w3.org/2000/svg" height="0.9em" viewBox="0 0 448 512">
                  <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
              </span> */}
              <input className="emial" type="text" name="username" value={data.username} onChange={dataChange} placeholder="Username" />

              <input className="emial" type="email" name="email" value={data.email} onChange={dataChange} placeholder="Your email address" />
              <input
                className="pass"
                type="password" name="password" value={data.password} onChange={dataChange}
                placeholder="Your password"
                minLength={8}
                maxLength={20}
              />
            </div>
          </form>
          <button type="submit" onClick={signUpUser}>Sign UP</button>
        </div>
        <div className="old-here">
          <h2>Have you register with us?</h2>
          <p>Click here to login</p>
          <button>
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup_as_owner;
