import React, { useEffect, useState ,useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/RealtimeDatabase/accomodation.js";
import { signOut } from "firebase/auth";
import Login_as_owner from "./Login_As_Owner.jsx";
import Pgcard from "../PG/PG-Card.jsx";
import "../../style/PG-Owner/profile.css";
import { listData } from "../../Firebase/RealtimeDatabase/accomodation.js";
import No_data_found from "../Error-Page/no_data_found.jsx";
import PGOwnerContext from "../../Contexts/Objects/PGOwnerContext.mjs";


export default function Profile() {
  const navigate = useNavigate();

  const __PGOwnerContext = useContext(PGOwnerContext);
  
  const [logOut, setlogOut] = useState(false);
  const [details, setdetails] = useState([]);

  let logOutUser = async (e) => {
    e.preventDefault();
    let confirmSignOut = window.confirm("Are you sure you want to Logged out?");
    if (confirmSignOut) {
      await signOut(auth)
        .then(() => {
          alert("You are successfully Logged out from your account");
          setlogOut(true);
          __PGOwnerContext.getLogin("");
          __PGOwnerContext.getUser("");
          __PGOwnerContext.getEmail("");
        })
        .catch((err) => {
          alert(`OOPs! ${err.message} with code ${err.code}`);
        });
    }
  };

  let refresh = async () => {
    console.log(__PGOwnerContext.newuserId);
    let response = await listData(__PGOwnerContext.newuserId);
    console.log(response);
    if (response !== null || response !== undefined) {
      setdetails(response);
    } else {
      setdetails(response);
    }
  };

  useEffect(() => {
    let uEff = async () => {
      console.log(__PGOwnerContext.newuserId);
      let response = await listData(__PGOwnerContext.newuserId);
      console.log(response);
      if (response !== null || response !== undefined) {
        setdetails(response);
      } else {
        setdetails(response);
      }
    };
    uEff();
  }, []);

  useEffect(() => {
    console.log(details);
  }, [details]);

  return (
    <>
      {!logOut && (
        <div className="profile">
          <h1>Welcome</h1>
          <div className="profile-owner">
            <h3>Username : {__PGOwnerContext.profileName}</h3>
            <h3>email Id : {__PGOwnerContext.profileEmail}</h3>
          </div>
          <div className="profile-btn">
            <button className="set-pg-details">
              <Link  onClick={()=>{ __PGOwnerContext.resetForm(); setTimeout(()=>navigate("/form"),500);}} > Set PG Details</Link>
            </button>
            <button className="signout" type="submit" onClick={logOutUser}>
              Sign out
            </button>
            <button className="btn-refresh" type="submit" onClick={refresh}>
              Refresh
            </button>
          </div>
          {details === undefined && (
            <Link to="/profile">
              <button className="btn btn-primary">Show Details</button>
            </Link>
          )}
          {details === null || details === undefined ? (
            <No_data_found type="Data"/>
          ) : (
            Object.values(details).map((e) => {
              return <Pgcard />
            })
          )}
        </div>
      )}

      {logOut && (<Login_as_owner/>)}
    
    </>
  );
}
