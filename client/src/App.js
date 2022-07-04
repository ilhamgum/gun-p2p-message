import "./App.css";
import React from "react";
import Router from "./router/router";
import { ContextProvider } from "./contexts/context";

export default function App() {
  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}
