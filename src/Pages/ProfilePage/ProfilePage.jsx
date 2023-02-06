import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../Components/utills/firebase";
import { LoginEmptyPage, NotAccessPage } from "../EmptyPage/EmptyPage";
import { RecipeCardUserProfile } from "./components/RecipeCardUserProfile";
import style from "./profilepage.module.scss"


export const ProfilePage = (props) => {
    const {id} = useParams();
    const [btn_tabs, setBtn_tabs] = useState("Recipes");
    const [recipes, setRecipes] = useState([]);
    const [currentUser, setCurrentUser]=useState({})
    const user = currentUser;
    useEffect(() => {
        const query = ref(db, `users/` + id);
        return onValue(query, (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          
            setCurrentUser(data);
        }
      });
    }, [id])
    useEffect(() => {
        if (btn_tabs === "Recipes") {
                if (user.uid) {
                      const query = ref(db, `recipes/`);
                        return onValue(query, (snapshot) => {
                        const data = snapshot.val();
                        if (snapshot.exists()) {
                            let rec = [];
                            for (let el in data){
                               if (data[el].idUser === user.idUrl) {
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
            setRecipes(user.notifications)
        }
    }, [btn_tabs, user.notifications, user.idUrl, user.uid])

    const tabs = recipes.length > 0 ? recipes.map(el => <RecipeCardUserProfile key={el.id}  recipe={el}/>) : "it's empry";
    
    if (props.user.idUrl && user.name !== "Guest") { 
    return (
        <div className={style.profile_container}>
            <div className={style._header}>
                <h2>Profile</h2>
                {user.idUrl === props.user.idUrl ? <Link to={`/react-recipe-app/profile/${user.idUrl}/settings`}><button className={style.btn_setting}>Settings</button></Link> : <div></div>}
            </div>
            <div className={style._main}>
                <div className={style._photo}>
                    <img src={user.iconAvatar} alt="Avatar" />
                </div>
                <div className={style.info_flutter}>
                    <div className={style._right_top}>
                        <div className={style.recipe}>
                            <h3>Recipe</h3>
                            <p>{user.countRecipes}</p>
                        </div>
                        <div className={style.followers}>
                            <h3>Followers</h3>
                            <p>{user.followers}</p>
                        </div>
                        <div className={style.following}>
                            <h3>Following</h3>
                            <p>{user.following}</p>
                        </div>
                    </div>
                    <div className={style.right_bottom}>
                        <h2>{user.name}</h2>
                    </div>
                </div>
            </div>
            <div className={style.about}>
                <h3>{user.position}</h3>
                <h3>{user.about}</h3>
            </div>
            <div className={style.add_recipe}>
                {user.idUrl === props.user.idUrl ? <Link to={`/react-recipe-app/profile/add_recipe`}><button>Add Recipe</button></Link> : <div></div>} 
            </div>
            {user.idUrl === props.user.idUrl ?  <div className={style.tabs}>
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
    } if (props.user.name === "Guest") { return (<NotAccessPage />)}else return (<LoginEmptyPage />)
}