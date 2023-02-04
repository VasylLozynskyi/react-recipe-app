import { Route, Routes } from "react-router-dom"
import { Header } from "../../Components/Header/Header"
import { Recipes } from "../Recipes/Recipes"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { LoginEmptyPage } from "../EmptyPage/EmptyPage"
import { ProfilePage } from "../ProfilePage/ProfilePage"
import { RecipePage } from "../RecipePage/RecipePage"
import { CreateRecipe } from "../CreateRecipePage/CreateRecipe"
import { SettingPage } from "../SettingPage/SettingPage"


export const HomeRouter = (props) => {
    if (props.user.uid)  {
    return (
        <>
        <Header user={props.user}/>
        <Routes>
            <Route path="home" element={<HomePage user={props.user} />}  />
            <Route path="recipes" element={<Recipes />}  />
            <Route path="profile/:id" element={<ProfilePage user={props.user} />}  />
            <Route path="recipes/:id" element={<RecipePage />}  />
            <Route path="profile/add_recipe" element={<CreateRecipe user={props.user} />}  />
            <Route path="profile/:id/settings" element={<SettingPage user={props.user} />}  />
        </Routes>
        </>
        
    )
    } else return (
        <LoginEmptyPage />
        )
}
