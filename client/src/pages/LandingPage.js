import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center w-full h-64 bg-blue-200">
          <h1 className="">Welcome</h1>
        </div>
        <div className="mt-40">
          <Link to={"/login"}>
            <button className="w-60 bg-blue-600/75 hover:bg-blue-700 rounded-full p-4">
              <p className="text-white">Getting started</p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
