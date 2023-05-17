import React from "react";
import { elastic as Menu } from "react-burger-menu";
import "./assets/css/BurgerMenu.css";

const BurgerMenu = () => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/login">
        Login
      </a>
      <a className="menu-item" href="/register">
        Register
      </a>
      <a className="menu-item" href="/pizzas">
        Test
      </a>
      <a className="menu-item" href="/desserts">
        Test2
      </a>
    </Menu>
  );
};

export default BurgerMenu;
