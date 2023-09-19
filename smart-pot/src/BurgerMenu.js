import React, { useState } from "react";
import { elastic as Menu } from "react-burger-menu";
import "./assets/css/BurgerMenu.css";
import { useAuth } from "./components/AuthContext";
import { logout, removeAuthToken } from "./components/hooks/api";

const BurgerMenu = ({ setShowModal, setModalMessage }) => {
  const { logoutUser } = useAuth(); // Get setUser from AuthContext

  const showSettings = (event) => {
    event.preventDefault();
  };

  const logoutuser = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        await removeAuthToken(); // Remove the token from sessionStorage
        logoutUser();
        setModalMessage("Successfully Logged Out!");
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
      <a className="menu-item" href="/manage-plants">
        Manage plants
      </a>

      <a className="menu-item" href="/statistics">
        Statistics
      </a>
      <a className="menu-item" href="/settings">
        Settings
      </a>
      <a className="menu-item" onClick={logoutuser}>
        Log Out
      </a>
    </Menu>
  );
};

export default BurgerMenu;
