import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./App";
import BurgerMenu from "./BurgerMenu";
import { AuthProvider } from "./components/Context/AuthContext";
import { useAuth } from "./components/Context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForms/AuthForm";
import Modal from "./components/Modals/Modal"; // Import Modal
import ManagePlants from "./components/ManagePlants/ManagePlants";
import Statistics from "./components/Statistics/Statistics";
import Settings from "./components/Settings/Settings";
import ConfirmResetPassword from "./components/Modals/ConfirmResetPasswordModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TimezoneContext from "./components/Context/TimezoneContext";
import "./i18n/i18n";
import db from "./components/hooks/db";

const AppRoutes = ({ setShowMenu }) => {
  const { user, isLoading } = useAuth();

  // Update whether the menu should show or not
  useEffect(() => {
    setShowMenu(!!user);
  }, [user, setShowMenu]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={user ? <App /> : <AuthForm />} />
        <Route path="/reset-password" element={<ConfirmResetPassword />} />
        <Route
          path="/manage-plants"
          element={user ? <ManagePlants /> : <AuthForm />}
        />
        <Route
          path="/statistics"
          element={user ? <Statistics /> : <AuthForm />}
        />
        <Route path="/settings" element={user ? <Settings /> : <AuthForm />} />
        <Route path="/" element={user ? <App /> : <AuthForm />} />
      </Routes>
    </>
  );
};

const MainComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State to control whether to show menu or not
  const { clearAuthContext } = useAuth();
  const [modalMessage, setModalMessage] = useState("");
  const [tz, setTz] = useState(""); // Mocking initial empty state as if the data isn't loaded yet
  const [dataLoaded, setDataLoaded] = useState(false); // State to check if data is loaded or not
  const { t, i18n } = useTranslation();

  useEffect(() => {
    db.settings
      .orderBy("id") // Assumes 'id' is an auto-incrementing field
      .reverse() // Sorts the results in descending order
      .first() // Fetches the first (latest) item
      .then((userSettings) => {
        if (userSettings) {
          setTz(userSettings.timezone);
          if (userSettings.language === "ENG") i18n.changeLanguage("en");
          if (userSettings.language === "PL") i18n.changeLanguage("pl");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user settings: ", error);
      });
  }, []);

  useEffect(() => {
    const handleClearAuth = () => {
      if (clearAuthContext) {
        clearAuthContext();
        if (window.location.pathname !== "/login") {
          setModalMessage("Application error! You were logged out!");
          setShowModal(true);
        }
      }
      const savedTz = localStorage.getItem("timezone");
      if (savedTz) {
        setTz(savedTz);
      }
      setDataLoaded(true);
    };

    window.addEventListener("clearAuth", handleClearAuth);

    return () => {
      window.removeEventListener("clearAuth", handleClearAuth);
    };
  }, [clearAuthContext]);

  const saveTimezoneToAPI = (newTz) => {
    setTimeout(() => {
      setTz(newTz);
    }, 500);
  };

  return (
    <React.StrictMode>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {modalMessage}
      </Modal>
      <TimezoneContext.Provider value={{ tz, setTz: saveTimezoneToAPI }}>
        <div className="App" id="outer-container">
          {showMenu && (
            <BurgerMenu
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
              setShowModal={setShowModal}
              setModalMessage={setModalMessage}
            />
          )}
          <Router>
            <AppRoutes setShowMenu={setShowMenu} />
          </Router>
        </div>
      </TimezoneContext.Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <MainComponent />
    </AuthProvider>
  </React.StrictMode>
);
