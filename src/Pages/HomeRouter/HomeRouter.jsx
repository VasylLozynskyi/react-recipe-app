import { Route, Routes } from "react-router-dom"
import { Recipes } from "../Recipes/Recipes"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { EmptyPage, LoginEmptyPage } from "../EmptyPage/EmptyPage"
import { ProfilePage } from "../ProfilePage/ProfilePage"
import { RecipePage } from "../RecipePage/RecipePage"
import { CreateRecipe } from "../CreateRecipePage/CreateRecipe"
import { SearchPage } from "../SearchPage/SearchPage"
import { useEffect, useState } from "react"
import { Header } from "../../Components/Header/Header"
import { SettingPage } from "../SettingPage/SettingPage"
import { SettingRecipePage } from "../SettingRecipePage/SettingRecipePage"
import { useSelector } from "react-redux"
import { getUserAsUID } from "../../Components/utills/api"
import { setUserAction } from "../../Components/Redux/Actions/indexUser"
import store from "../../Components/Redux/store/store"


export const HomeRouter = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const isAuth = useSelector(state => state.userPage.isAuth)
    useEffect(() => {
        if (Object.keys(props.user).length === 0){
            let authUser =JSON.parse(window.localStorage.getItem("userLoginREcipeApp"));
            if (authUser) {
                getUserAsUID(authUser).then(data => {
                    if (data){
                    store.dispatch(setUserAction(data))
                    }})
            } else console.log("no user login")
        } else if (Object.keys(props.user).length > 0) {
            getUserAsUID(props.user).then(data => {
                if (data){
                store.dispatch(setUserAction(data))
                }})
        }
        // getUserAsUID(props.user).then(data => {
        //     if (data){
        //     store.dispatch(setUserAction(data))
        //     } else {
        //         let authUser =JSON.parse(window.localStorage.getItem("user"));
        //         if (authUser) {
        //             store.dispatch(setUserAction(authUser))
        //         } else console.log("no user login")
                
        //     }
        // })
    }, []);

    const onSearch = (value) => {
        setSearchValue(value);
    }
    console.log(isAuth)
    if (isAuth){
    return (
        <>
        <Header />
        <Routes>
            <Route path="home" element={<HomePage onSearch={onSearch} />}  />
            <Route path="recipes" element={<Recipes />}  />
            <Route path="profile/:id" element={<ProfilePage />}  />
            <Route path="recipes/:id" element={<RecipePage />}  />
            <Route path="profile/add_recipe" element={<CreateRecipe />}  />
            <Route path="profile/:id/settings" element={<SettingPage />}  />
            <Route path="search" element={<SearchPage searchValue={searchValue} />} />
            <Route path="recipes/:id/settings" element={<SettingRecipePage />}  />
            <Route path="*" element={<EmptyPage/>}  />
        </Routes>
        </>
        
    )
    } else return (
        <LoginEmptyPage />
        )
}
