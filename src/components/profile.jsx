import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./accomodation.js";
import { signOut } from "firebase/auth";
import Login_as_owner from "./login_as_owner.jsx";
import Pgcard from "./pgcard.jsx";
import "../style/profile.css";
import { listData } from "./accomodation.js";
import No_data_found from "./no_data_found.jsx";

export default function Profile(props) {
  const [logOut, setlogOut] = useState(false);
  const [details, setdetails] = useState([]);

  let edit = (obj) => {
    props.newedit(obj);
  };

  let hello = (data) => {
    props.login(data);
  };
  let hellouser = (data) => {
    props.user(data);
  };
  let helloemail = (data) => {
    props.email(data);
  };

  let logOutUser = async (e) => {
    e.preventDefault();
    let confirmSignOut = window.confirm("Are you sure you want to Logged out?");
    if (confirmSignOut) {
      await signOut(auth)
        .then(() => {
          alert("You are successfully Logged out from your account");
          setlogOut(true);
          props.login("");
          props.user("");
          props.email("");
        })
        .catch((err) => {
          alert(`OOPs! ${err.message} with code ${err.code}`);
        });
    }
  };

  let refresh = async () => {
    console.log(props.uId);
    let response = await listData(props.uId);
    console.log(response);
    if (response !== null || response !== undefined) {
      setdetails(response);
    } else {
      setdetails(response);
    }
  };

  useEffect(() => {
    let uEff = async () => {
      console.log(props.uId);
      let response = await listData(props.uId);
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
            <h3>Username : {props.Pname}</h3>
            <h3>email Id : {props.Pemail}</h3>
          </div>
          <div className="profile-btn">
            <button className="set-pg-details">
              <Link to="/form">Set PG Details</Link>
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
              return <Pgcard obj={e} edit={edit} />;
            })
          )}
        </div>
      )}

      {logOut && (
        <Login_as_owner
          brandedit={edit}
          login={hello}
          user={hellouser}
          email={helloemail}
        />
      )}
    </>
  );
}
