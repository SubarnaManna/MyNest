import {useContext} from "react";
import { Link } from "react-router-dom";
import "../../style/Common/header.css";
import Sidebar from "./sidebar";
import "../../style/Common/sidebar.css";
import PGOwnerContext from "../../Contexts/Objects/PGOwnerContext.mjs";


function Header() {
  const __PGOwnerContext = useContext(PGOwnerContext);

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
              {!__PGOwnerContext.isLogin ? (
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
