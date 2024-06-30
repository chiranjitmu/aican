import React from "react";
import { TfiFaceSad } from "react-icons/tfi";

const NotFound = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <TfiFaceSad className="text-[10rem] text-gray-500 mb-[2rem]" />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">404 Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
        <p>
          You can <a href="/" className="text-blue-500 underline">return to the homepage</a>
        </p>
      </div>
    </main>
  );
};

export default NotFound;