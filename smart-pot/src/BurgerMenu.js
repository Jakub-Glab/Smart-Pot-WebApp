import React, { useState } from "react";
import { elastic as Menu } from "react-burger-menu";
import "./assets/css/BurgerMenu.css";
import { useAuth } from "./components/Context/AuthContext";
import { logout, removeAuthToken } from "./components/hooks/api";
import { useTranslation } from "react-i18next";
import "./i18n/i18n";

const BurgerMenu = ({ setShowModal, setModalMessage }) => {
  const { logoutUser } = useAuth(); // Get setUser from AuthContext
  const { t } = useTranslation();

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
        window.localStorage.clear();
      }
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Menu>
      <a className="menu-item" href="/">
        {t("BurgerMenu.home")}
      </a>
      <a className="menu-item" href="/manage-plants">
        {t("BurgerMenu.manage_plants")}
      </a>

      <a className="menu-item" href="/statistics">
        {t("BurgerMenu.statistics")}
      </a>
      <a className="menu-item" href="/calendar">
        {t("BurgerMenu.calendar")}
      </a>
      <a className="menu-item" href="/settings">
        {t("BurgerMenu.settings")}
      </a>
      <a className="menu-item" onClick={logoutuser}>
        {t("BurgerMenu.logout")}
      </a>
    </Menu>
  );
};

export default BurgerMenu;
