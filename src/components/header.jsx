import React from "react";
import { Link } from "react-router-dom";
import "../style/header.css";
import Sidebar from "./sidebar";
import "../style/sidebar.css";

function Header(props) {
  return (
    <>
      <div className="sticky-navbar">
        <a href="/home">
          <img className="guestify-logo" src="./images/icons/logofinal.png" alt="" />
        </a>
        {window.innerWidth < "734" ? (
          <Sidebar
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          />
        ) : (
          <div>
            <nav className="main">
              <Link to="/home">Home</Link>
              <Link to="/about">About</Link>
              {!props.isLogin ? (
                <Link to="/pgowner">Owner</Link>
              ) : (
                <Link to="/profile">Profile</Link>
              )}
              <Link to="/contact">Contact</Link>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
