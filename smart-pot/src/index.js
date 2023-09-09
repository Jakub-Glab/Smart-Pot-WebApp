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
        <Route
          path="/manage-plants"
          element={user ? <ManagePlants /> : <LoginForm />}
        />
        <Route path="/" element={user ? <App /> : <LoginForm />} />
      </Routes>
    </>
  );
};

const MainComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State to control whether to show menu or not
  const { clearAuthContext } = useAuth();

  useEffect(() => {
    const handleClearAuth = () => {
      if (clearAuthContext) {
        // Check if function is available
        clearAuthContext();
        setShowModal(true);
        console.log("Application error! You were logged out!");
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
        Successfully Logged Out!
      </Modal>
      <div className="App" id="outer-container">
        {showMenu && ( // Only display if showMenu is true
          <BurgerMenu
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
            setShowModal={setShowModal}
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
