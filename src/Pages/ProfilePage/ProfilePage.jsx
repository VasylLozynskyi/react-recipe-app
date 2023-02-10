import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setCurrentUserAction } from "../../Components/Redux/Actions/indexCurrentUser";
import { getUser } from "../../Components/utills/api";
import { LoginEmptyPage, NotAccessPage } from "../EmptyPage/EmptyPage";
import { RecipeCardUserProfile } from "./components/RecipeCardUserProfile";
import style from "./profilepage.module.scss"
import store from "../../Components/Redux/store/store"
import { getUserRecipesAction } from "../../Components/Redux/Actions/indexRecipes";
import { getFollowingUsers } from "../../Components/Redux/Actions/indexUsers";
import { FollowingsCardUserProfile } from "./components/FollowingsCardUserProfile";

export const ProfilePage = () => {
    const {id} = useParams();
    const user = useSelector(state => state.userPage.user)
    const isAuth = useSelector(state => state.userPage.isAuth)
    const currentUser = useSelector(state => state.currentUserPage.user)
    const userFollowings = useSelector(state => state.users.userFollowings)
    const userRecipes = useSelector(state => state.recipes.userRecipes)
    const [noUserData, setNoUserData] = useState(true)
    const [btn_tabs, setBtn_tabs] = useState("Recipes");
    useEffect(() => {
        getUser(id).then(data => {
            if (data){
            store.dispatch(getUserRecipesAction(id))
            store.dispatch(setCurrentUserAction(data))
            store.dispatch(getFollowingUsers(user.usersFollowing))
            setNoUserData(true)
            } else setNoUserData(false)
        })
    }, [id])
    let tabUserRecipes = userRecipes.length > 0 ? userRecipes.map(el => <RecipeCardUserProfile key={el.id} recipe={el}/>) : "it's empty";
    let tabUserFollowings = userFollowings.length > 0 ? userFollowings.map(el => <FollowingsCardUserProfile key={el.id} user={el} />) : "it's empty";
    if (noUserData && isAuth && currentUser.name !== "Guest") { 
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
            {currentUser.idUrl === user.idUrl ?  
                <div className={style.tabs}>
                    <button onClick={(e) => setBtn_tabs(e.target.textContent)}>Recipes</button>
                    <button onClick={(e) => setBtn_tabs(e.target.textContent)}>Follow Users</button>
                    <button onClick={(e) => setBtn_tabs(e.target.textContent)}>Notifications</button>
                </div> 
                :  
                <div className={style.tabs}>
                    <h2>Recipes</h2>
                </div>
            }
            <div className={style.profile_tabs_section}>
                {btn_tabs === "Recipes" && tabUserRecipes}
                {btn_tabs === "Follow Users" && tabUserFollowings}
                {btn_tabs === "Notifications" && <div>section in progress</div>}
            </div>
        </div>
    )
    } else if (noUserData && user.name === "Guest") { return (<NotAccessPage />)}else return (<div>{(isAuth && noUserData) &&<LoginEmptyPage />}
    {(isAuth && !noUserData) && <div> This user page does not exist</div>}
    </div>)
}