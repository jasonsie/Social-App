import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "../src/context/Authcontext.js";

ReactDOM.render(
    <AuthContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </AuthContextProvider>,
    document.getElementById("root")
);
