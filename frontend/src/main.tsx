import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import theme from "./theme.ts";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Auth0Provider
                domain="dev-bpzxntnibl5y678w.us.auth0.com"
                clientId="X0xP99Pm0ddB3SgHBnUZRkLuYm3cHLtx"
                authorizationParams={{
                    redirect_uri: window.location.origin
                }}
            >
                <Router>
                    <App />
                </Router>
            </Auth0Provider>
        </ThemeProvider>
    </React.StrictMode>
);
