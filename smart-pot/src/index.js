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
        <Route path="/login" element={<LoginForm />} />
        {user ? (
          <Route path="/" element={<App />} />
        ) : (
          <Route path="/" element={<LoginForm />} />
        )}
        <Route path="/manage-plants" element={<ManagePlants />} />
        {user ? (
          <Route path="/manage-plants" element={<ManagePlants />} />
        ) : (
          <Route path="/manage-plants" element={<LoginForm />} />
        )}
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const MainComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State to control whether to show menu or not

  return (
    <React.StrictMode>
      <AuthProvider>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          {console.log("Successfully Logged Out!")} Successfully Logged Out!
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
      </AuthProvider>
    </React.StrictMode>
  );
};

root.render(<MainComponent />);
