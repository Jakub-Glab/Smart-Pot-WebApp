import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import App from "./App";
import BurgerMenu from "./BurgerMenu";
import { AuthProvider } from "./components/AuthContext";
import { useAuth } from "./components/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Modal from "./components/Modal"; // Import Modal

const AppRoutes = () => {
  const { user, isLoading } = useAuth(); // <-- Get isLoading
  const [showModal, setShowModal] = useState(false);

  // Wait for loading to complete before rendering routes
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        Successfully Logged Out!
      </Modal>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        {user ? (
          <Route path="/" element={<App />} />
        ) : (
          <Route path="/" element={<LoginForm />} />
        )}
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const MainComponent = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <React.StrictMode>
      <AuthProvider>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          Successfully Logged Out!
        </Modal>
        <div className="App" id="outer-container">
          <BurgerMenu
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
            setShowModal={setShowModal}
          />
          <Router>
            <AppRoutes setShowModal={setShowModal} />
          </Router>
        </div>
      </AuthProvider>
    </React.StrictMode>
  );
};

root.render(<MainComponent />);
