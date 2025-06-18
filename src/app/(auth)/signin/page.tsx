import React from "react";

const Singin = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Email" className="" />
        <input type="password" placeholder="Password" className="" />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Singin;
