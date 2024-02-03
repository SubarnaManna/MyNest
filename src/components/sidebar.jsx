import React from "react";
import { slide as Menu } from "react-burger-menu";

import "../style/sidebar.css";

// ...

export default (props) => {
  return (
    <Menu width={350} right>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/about">
        About
      </a>
      <a className="menu-item" href="/pgowner">
        PG Owner
      </a>
      <a className="menu-item" href="/contact">
        Contact
      </a>
    </Menu>
  );
};
