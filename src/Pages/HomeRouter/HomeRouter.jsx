import { Route, Routes } from "react-router-dom"
import { Header } from "../../Components/Header/Header"
import { Recipes } from "../Recipes/Recipes"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { LoginEmptyPage } from "../EmptyPage/EmptyPage"
import { ProfilePage } from "../ProfilePage/ProfilePage"
import { RecipePage } from "../RecipePage/RecipePage"
import { CreateRecipe } from "../CreateRecipePage/CreateRecipe"
import { SettingPage } from "../SettingPage/SettingPage"
import { SearchPage } from "../SearchPage/SearchPage"
import { useState } from "react"


export const HomeRouter = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const onSearch = (value) => {
        setSearchValue(value);
    }
    if (props.user.uid)  {
    return (
        <>
        <Header user={props.user}/>
        <Routes>
            <Route path="home" element={<HomePage user={props.user} onSearch={onSearch} />}  />
            <Route path="recipes" element={<Recipes />}  />
            <Route path="profile/:id" element={<ProfilePage user={props.user} />}  />
            <Route path="recipes/:id" element={<RecipePage user={props.user}/>}  />
            <Route path="profile/add_recipe" element={<CreateRecipe user={props.user} />}  />
            <Route path="profile/:id/settings" element={<SettingPage user={props.user} />}  />
            <Route path="search" element={<SearchPage searchValue={searchValue} />} />
        </Routes>
        </>
        
    )
    } else return (
        <LoginEmptyPage />
        )
}
