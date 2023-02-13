import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./header.module.scss"

export const Header = (props) => {
    const data = props.dataSite
    const user = useSelector(state => state.userPage.user)
        return (
            <header>
                <div className={style.userinfo_section}>
                    <div className={style.userinfo_flex}>
                        <img src={user.iconAvatar} alt="avatar" />
                        <div>{data.titleHello}<h2>{user.name}</h2></div>
                    </div> 
                    <p>{data.textHello}</p>
                </div>
                <div className={style.nav_section}>
                    <div className={style.nav_flex}>
                        <Link to={`/home`}>{data.linkHome}</Link>
                        <Link to={`/recipes`}>{data.linkRecipes}</Link>
                        { user.name === "Guest" ? <Link to={`/login`}>{data.linkLogin}</Link> : <Link to={`/profile/${user.idUrl}`}>{data.linkProfile}</Link>}
                    </div>
                </div>
            </header>
        )
}