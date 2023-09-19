import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./App";
import BurgerMenu from "./BurgerMenu";
import { AuthProvider } from "./components/AuthContext";
import { useAuth } from "./components/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Modal from "./components/Modal"; // Import Modal
import ManagePlants from "./components/ManagePlants";
import Statistics from "./components/Statistics";
import Settings from "./components/Settings";
import ConfirmResetPassword from "./components/ConfirmResetPassword";
import { useNavigate } from "react-router-dom";

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
        <Route path="/login" element={user ? <App /> : <LoginForm />} />
        <Route path="/reset-password" element={<ConfirmResetPassword />} />
        <Route
          path="/manage-plants"
          element={user ? <ManagePlants /> : <LoginForm />}
        />
        <Route
          path="/statistics"
          element={user ? <Statistics /> : <LoginForm />}
        />
        <Route path="/settings" element={user ? <Settings /> : <LoginForm />} />
        <Route path="/" element={user ? <App /> : <LoginForm />} />
      </Routes>
    </>
  );
};

const MainComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State to control whether to show menu or not
  const { clearAuthContext } = useAuth();
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const handleClearAuth = () => {
      if (clearAuthContext) {
        clearAuthContext();
        if (window.location.pathname !== "/login") {
          setModalMessage("Application error! You were logged out!");
          setShowModal(true);
        }
      }
    };

    window.addEventListener("clearAuth", handleClearAuth);

    return () => {
      window.removeEventListener("clearAuth", handleClearAuth);
    };
  }, [clearAuthContext]);

  return (
    <React.StrictMode>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {modalMessage}
      </Modal>
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
