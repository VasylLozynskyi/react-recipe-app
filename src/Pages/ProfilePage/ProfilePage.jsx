import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setCurrentUserAction } from "../../Components/Redux/Actions/indexCurrentUser";
import { getUser } from "../../Components/utills/api";
import { db } from "../../Components/utills/firebase";
import { LoginEmptyPage, NotAccessPage } from "../EmptyPage/EmptyPage";
import { RecipeCardUserProfile } from "./components/RecipeCardUserProfile";
import style from "./profilepage.module.scss"
import store from "../../Components/Redux/store/store"
import { getUserRecipesAction } from "../../Components/Redux/Actions/indexRecipes";

export const ProfilePage = () => {
    const user = useSelector(state => state.userPage)
    const currentUser = useSelector(state => state.currentUserPage)
    const userRecipes = useSelector(state => state.recipes)
    console.log(userRecipes);
    const {id} = useParams();
    const [btn_tabs, setBtn_tabs] = useState("Recipes");
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getUser(id).then(data => {
            store.dispatch(getUserRecipesAction(id))
            store.dispatch(setCurrentUserAction(data))
            
        })
    }, [id])
    useEffect(() => {
        if (btn_tabs === "Recipes") {
                if (currentUser.uid) {
                      const query = ref(db, `recipes/`);
                        return onValue(query, (snapshot) => {
                        const data = snapshot.val();
                        if (snapshot.exists()) {
                            let rec = [];
                            for (let el in data){
                               if (data[el].idUser === currentUser.idUrl) {
                                    rec.push(data[el]);
                               }
                            }
                            setRecipes(rec);
                        }
                      });
                  }
        } else if (btn_tabs === "Tags"){
            setRecipes([]);
        } else if (btn_tabs === "Notifications") {
            setRecipes(currentUser.notifications)
        }
    }, [btn_tabs, currentUser.notifications, currentUser.idUrl, currentUser.uid])

    const tabs = recipes.length > 0 ? recipes.map(el => <RecipeCardUserProfile key={el.id}  recipe={el}/>) : "it's empry";
    
    if (user.idUrl && currentUser.name !== "Guest") { 
    return (
        <div className={style.profile_container}>
            <div className={style._header}>
                <h2>Profile</h2>
                {currentUser.idUrl === user.idUrl ? <Link to={`/react-recipe-app/profile/${currentUser.idUrl}/settings`}><button className={style.btn_setting}>Settings</button></Link> : <div></div>}
            </div>
            <div className={style._main}>
                <div className={style._photo}>
                    <img src={currentUser.iconAvatar} alt="Avatar" />
                </div>
                <div className={style.info_flutter}>
                    <div className={style._right_top}>
                        <div className={style.recipe}>
                            <h3>Recipe</h3>
                            <p>{currentUser.countRecipes}</p>
                        </div>
                        <div className={style.followers}>
                            <h3>Followers</h3>
                            <p>{currentUser.followers}</p>
                        </div>
                        <div className={style.following}>
                            <h3>Following</h3>
                            <p>{currentUser.following}</p>
                        </div>
                    </div>
                    <div className={style.right_bottom}>
                        <h2>{currentUser.name}</h2>
                    </div>
                </div>
            </div>
            <div className={style.about}>
                <h3>{currentUser.position}</h3>
                <h3>{currentUser.about}</h3>
            </div>
            <div className={style.add_recipe}>
                {currentUser.idUrl === user.idUrl ? <Link to={`/react-recipe-app/profile/add_recipe`}><button>Add Recipe</button></Link> : <div></div>} 
            </div>
            {currentUser.idUrl === user.idUrl ?  <div className={style.tabs}>
                <button onClick={() => setBtn_tabs("Recipes")}>Recipes</button>
                <button onClick={() => setBtn_tabs("Tags")}>Follow Users</button>
                <button onClick={() => setBtn_tabs("Notifications")}>Notifications</button>
            </div> :  <div className={style.tabs}>
                        <button>Recipes</button>
                    </div>
            }
            <div className={style.profile_tabs_section}>
                {tabs}
            </div>
        </div>
    )
    } if (user.name === "Guest") { return (<NotAccessPage />)}else return (<LoginEmptyPage />)
}