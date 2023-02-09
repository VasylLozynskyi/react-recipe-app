import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./header.module.scss"

export const Header = () => {
    const user = useSelector(state => state.userPage.user)
        return (
            <header>
                <div className={style.userinfo_section}>
                    <div className={style.userinfo_flex}>
                        <img src={user.iconAvatar} alt="avatar" />
                        <div>Hello<h2>{user.name}</h2></div>
                    </div> 
                    <p>What are you cooking today?</p>
                </div>
                <div className={style.nav_section}>
                    <div className={style.nav_flex}>
                        <Link to={`/react-recipe-app/home`}>Home</Link>
                        <Link to={`/react-recipe-app/recipes`}>Recipes</Link>
                        { user.name === "Guest" ? <Link to={`/react-recipe-app/login`}>Login</Link> : <Link to={`/react-recipe-app/profile/${user.idUrl}`}>Profile</Link>}
                    </div>
                </div>
            </header>
        )
}