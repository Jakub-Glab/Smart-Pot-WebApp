import React from "react";

const Login = ({ email, setEmail, password, setPassword, handleLogin }) => {
  return (
    <div className="form">
      <header>Login</header>
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
        <input type="submit" className="button" value="Login" />
      </form>
      <div className="signup">
        <span className="signup">
          Forget password?
          <label htmlFor="check-reset"> Reset password</label>
        </span>
      </div>
      <div className="signup">
        <span className="signup">
          Dont have an account?
          <label htmlFor="check"> Signup</label>
        </span>
      </div>
    </div>
  );
};

export default Login;
