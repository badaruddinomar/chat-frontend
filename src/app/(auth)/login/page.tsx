import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <form>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Login;
