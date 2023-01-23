import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import SocketProvider from "./helpers/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <SocketProvider>
      <Router>
        <App />
      </Router>
    </SocketProvider>
  </>
);
