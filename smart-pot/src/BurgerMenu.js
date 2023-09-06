import React, { useState } from "react";
import { elastic as Menu } from "react-burger-menu";
import "./assets/css/BurgerMenu.css";
import { useAuth } from "./components/AuthContext";
import { logout, removeAuthToken } from "./components/hooks/api";

const BurgerMenu = ({ setShowModal }) => {
  const { clearAuthContext } = useAuth(); // Get setUser from AuthContext

  const logoutuser = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        await removeAuthToken(); // Remove the token from localStorage
        clearAuthContext();
        setShowModal(true); // Show the modal popup
      }
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/login">
        Login
      </a>
      <a className="menu-item" onClick={logoutuser}>
        Log Out
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
