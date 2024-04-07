import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="173498473237-3e6vd7dnn1cqhdbm8pnhggflmdc698h5.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route
            path="*"
            element={<App />}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
