import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// contexts
import AuthContext from "../contexts/context";

// route elements (pages)
import LandingPage from "../pages/LandingPage";
import Try from "../pages/Try";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Homepage from "../pages/Homepage";

import { user } from "../hooks";

export default function Router() {
  const { auth } = useContext(AuthContext);
  console.log(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user.is ? <Homepage /> : <LandingPage />} />
        <Route path="/try" element={<Try />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<p>not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}
