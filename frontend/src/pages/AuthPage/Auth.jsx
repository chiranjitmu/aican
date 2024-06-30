import React from "react";
import Login from "../../components/Login/Login";

const Auth = () => {
  return (
    <main className="h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 md:w-4/5 p-4 rounded-2xl shadow-2xl flex flex-col items-center">
      <Login />
    </main>
  );
};

export default Auth;
