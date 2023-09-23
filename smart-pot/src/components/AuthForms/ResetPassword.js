import React from "react";

const ResetPassword = ({
  email,
  setEmail,
  handleReset,
  setIsLogin,
  setIsReset,
}) => {
  return (
    <div className="form">
      <header>Password Reset</header>
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
          Back to login?
          <span
            className="link"
            onClick={() => {
              setIsLogin(true);
              setIsReset(false);
            }}
          >
            {" "}
            Login
          </span>
        </span>
      </div>
    </div>
  );
};

export default ResetPassword;
