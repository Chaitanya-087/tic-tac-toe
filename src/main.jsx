import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import SocketProvider from "./helpers/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <SocketProvider>
        <App />
    </SocketProvider>
);
