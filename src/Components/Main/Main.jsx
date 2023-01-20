import React from "react";
import FirstPage from "./FirstPage";
import "./main.module.scss"
import SignIn from "./SignIn-Up/SignIn";
import { Routes, Route} from "react-router-dom";
import SignUp from "./SignIn-Up/SignUp";


const Main = () => {
    return (
        <>
            <Routes>
            <Route path="/" element={<FirstPage />}  />
            <Route path="/login" element={<SignIn />}  />
            <Route path="/SignUp" element={<SignUp />} />
            </Routes>
        </>
    )
}
export default Main;

