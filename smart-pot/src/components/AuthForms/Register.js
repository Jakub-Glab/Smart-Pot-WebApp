import React from "react";

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
  return (
    <div className="form">
      <header>Signup</header>
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
        <input type="submit" className="button" value="Signup" />
      </form>
      <div className="signup">
        <span className="signup">
          Already have an account?
          <label htmlFor="check"> Login</label>
        </span>
      </div>
    </div>
  );
};

export default Register;
