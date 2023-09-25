import React from "react";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

const Register = ({
  email,
  setEmail,
  password,
  setPassword,
  fullName,
  setFullName,
  confirmPassword,
  setConfirmPassword,
  handleRegister,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="form">
      <header>{t("AuthForm.signup")}</header>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="submit"
          className="button"
          value={t("AuthForm.signupRef")}
        />
      </form>
      <div className="signup">
        <span className="signup">
          {t("AuthForm.alreadyHaveAccount")}
          <label htmlFor="check"> {t("AuthForm.loginRef")}</label>
        </span>
      </div>
    </div>
  );
};

export default Register;
