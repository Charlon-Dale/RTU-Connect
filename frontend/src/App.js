import "./index.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { MoralisProvider } from "react-moralis";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import Profile from "./pages/Profile";

function App() {
    return (
        <MoralisProvider
            serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
            appId={process.env.REACT_APP_MORALIS_APP_ID}
        >
            <div>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/profile"} element={<Profile />} />
                    </Route>
                    <Route path={"/login"} element={<Login />} />
                </Routes>
            </div>
        </MoralisProvider>
    );
}

export default App;
