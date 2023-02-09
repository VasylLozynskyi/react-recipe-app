import { Route, Routes } from "react-router-dom"
import { Recipes } from "../Recipes/Recipes"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { LoginEmptyPage } from "../EmptyPage/EmptyPage"
import { ProfilePage } from "../ProfilePage/ProfilePage"
import { RecipePage } from "../RecipePage/RecipePage"
import { CreateRecipe } from "../CreateRecipePage/CreateRecipe"
import { SearchPage } from "../SearchPage/SearchPage"
import { useState } from "react"
import { Header } from "../../Components/Header/Header"
import { SettingPage } from "../SettingPage/SettingPage"
import { SettingRecipePage } from "../SettingRecipePage/SettingRecipePage"


export const HomeRouter = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const onSearch = (value) => {
        setSearchValue(value);
    }
    if (props.user.uid)  {
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
        </Routes>
        </>
        
    )
    } else return (
        <LoginEmptyPage />
        )
}
