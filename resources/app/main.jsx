import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { SurveyProvider } from "./context/SurveyProvider";
import { ThemeProvider } from "./context/ThemeContext";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <SurveyProvider>
        <RouterProvider router={router} />
      </SurveyProvider>
    </ThemeProvider>
  </React.StrictMode>
);
