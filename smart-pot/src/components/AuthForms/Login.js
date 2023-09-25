import React from "react";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

const Login = ({ email, setEmail, password, setPassword, handleLogin }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="form">
      <header>{t(`AuthForm.login`)}</header>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          className="button"
          value={t("AuthForm.loginRef")}
        />
      </form>
      <div className="signup">
        <span className="signup">
          {t("AuthForm.forgotPassword")}
          <label htmlFor="check-reset"> {t("AuthForm.resetRef")}</label>
        </span>
      </div>
      <div className="signup">
        <span className="signup">
          {t("AuthForm.dontHaveAccount")}
          <label htmlFor="check"> {t("AuthForm.signupRef")}</label>
        </span>
      </div>
    </div>
  );
};

export default Login;
