import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { user } from "../useGun";

// spinner
import Loader from "../components/Loader";

// route elements (pages)
const LandingPage = lazy(() => import("../pages/LandingPage"));
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Homepage = lazy(() => import("../pages/Homepage"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={user.is ? <Homepage /> : <LandingPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<p>not found</p>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
