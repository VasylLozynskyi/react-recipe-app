import React, { useEffect, useState } from "react";
import style from "./main.module.scss"

import { Routes, Route} from "react-router-dom";
import FirstPage from "./FirstPage/FirstPage";
import {SignIn} from "./SignIn-Up/SignIn/SignIn";
import {SignUp} from "./SignIn-Up/SignUp/SignUp";
import { HomeRouter } from "./HomeRouter/HomeRouter";
import { onValue, ref } from "firebase/database";
import { db } from "../Components/utills/firebase";



const Main = () => {
    const [user, setUser] = useState({});
    const [userData, setUserData]= useState({});

    useEffect(() => {
        const query = ref(db, `users/` + user.uid);
        return onValue(query, (snapshot) => {
          const data = snapshot.val();
          if (snapshot.exists()) {
             // eslint-disable-next-line
             setUserData(data);
          }
        });
    }, [user]);

    const handleUser = (user) => {
        setUser(user)
    }
    return (
    <div className={style.wrapper_body}>
        <div className={style.container}>
            <Routes>
            <Route path="/react-recipe-app" element={<FirstPage />}  />
            <Route path="/react-recipe-app/login" element={<SignIn handleUser={handleUser} />}  />
            <Route path="/react-recipe-app/SignUp" element={<SignUp handleUser={handleUser} />} />
            <Route path="/react-recipe-app/*" element={<HomeRouter user={userData} />} />
            </Routes>
        </div>
    </div>
    )
}
export default Main;

