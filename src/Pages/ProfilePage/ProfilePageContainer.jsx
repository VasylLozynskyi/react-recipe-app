import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentUserAction } from "../../Components/Redux/Actions/indexCurrentUser";
import { getUser } from "../../Components/utills/api";
import { EmptyPage, LoginEmptyPage, NotAccessPage } from "../EmptyPage/EmptyPage";
import { RecipeCardUserProfile } from "../../Components/components/RecipeCard/RecipeCardUserProfile";
import store from "../../Components/Redux/store/store"
import { getUserRecipesAction } from "../../Components/Redux/Actions/indexRecipes";
import { getFollowingUsers } from "../../Components/Redux/Actions/indexUsers";
import { FollowingsCardUserProfile } from "./components/FollowingsCardUserProfile";
import { ProfilePage } from "./ProfilePage";
import { deleteFollowingUser } from "../../Components/utills/functions";

export const ProfilePageContainer = (props) => {
    const {id} = useParams();
    const user = useSelector(state => state.userPage.user)
    const isAuth = useSelector(state => state.userPage.isAuth)
    const currentUser = useSelector(state => state.currentUserPage.user)
    const userFollowings = useSelector(state => state.users.userFollowings)
    const userRecipes = useSelector(state => state.recipes.userRecipes)
    const [noUserData, setNoUserData] = useState(true)
    const [btn_tabs, setBtn_tabs] = useState("");
    useEffect(() => {
        getUser(id).then(data => {
            if (data){
            store.dispatch(getUserRecipesAction(id))
            store.dispatch(setCurrentUserAction(data))
            store.dispatch(getFollowingUsers(user.usersFollowing))
            setNoUserData(true)
            setBtn_tabs("Recipes")
            } else setNoUserData(false)
        })
    }, [id, user])

    const handleUnFollow = (userToDel) => {
      deleteFollowingUser(userToDel, user )
      // store unfollow
    }

    let tabUserRecipes = userRecipes.length > 0 ? userRecipes.map(el => <RecipeCardUserProfile key={el.id} recipe={el}/>) : "it's empty";
    let tabUserFollowings = userFollowings.length > 0 ? userFollowings.map(el => <FollowingsCardUserProfile key={el.id} user={el} handleUnFollow={handleUnFollow} />) : "it's empty";
    let tabUserNotification = ["section in progress"];
    if (noUserData && isAuth && currentUser.name !== "Guest") { 
    return (
      <ProfilePage
        data={props.dataSite}
        currentUser={currentUser}
        user={user}
        btnTabs= {(val) => setBtn_tabs(val)}
        btn_tabs={btn_tabs}
        tabUserRecipes={tabUserRecipes}
        tabUserFollowings={tabUserFollowings}
        tabUserNotification={tabUserNotification}
      />
    )
    } else if (noUserData && user.name === "Guest") { return (<NotAccessPage />)}else return (<>{(isAuth && noUserData) &&<LoginEmptyPage />}
    {(isAuth && !noUserData) && <EmptyPage data={props.dataEmpty} />}
    </>)
}