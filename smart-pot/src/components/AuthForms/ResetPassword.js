import React from "react";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

const ResetPassword = ({
  email,
  setEmail,
  handleReset,
  setIsLogin,
  setIsReset,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="form">
      <header>{t("AuthForm.passwordReset")}</header>
      <form onSubmit={handleReset}>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="submit"
          className="button"
          value="Request reset Password"
        />
      </form>
      <div className="signup">
        <span className="signup">
          {t("AuthForm.backToLogin")}
          <span
            className="link"
            onClick={() => {
              setIsLogin(true);
              setIsReset(false);
            }}
          >
            {" "}
            {t("AuthForm.loginRef")}
          </span>
        </span>
      </div>
    </div>
  );
};

export default ResetPassword;
