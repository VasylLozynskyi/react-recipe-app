import { Link } from "react-router-dom";
import style from "./profilepage.module.scss"

export const ProfilePage = (props) => {
    const data = props.data
    return (
        <div className={style.profile_container}>
            <div className={style._header}>
                <h2>{data.title}</h2>
                {props.currentUser.idUrl === props.user.idUrl ? <Link to={`/profile/${props.currentUser.idUrl}/settings`}><button className={style.btn_setting}>{data.btnSettings}</button></Link> : ""}
            </div>
            <div className={style._main}>
                <div className={style._photo}>
                    <img src={props.currentUser.iconAvatar} alt="Avatar" />
                </div>
                <div className={style.info_flutter}>
                    <div className={style._right_top}>
                        <div className={style.recipe}>
                            <h3>{data.countProfileName1}</h3>
                            <p>{props.currentUser.countRecipes}</p>
                        </div>
                        <div className={style.followers}>
                            <h3>{data.countProfileName2}</h3>
                            <p>{props.currentUser.followers}</p>
                        </div>
                        <div className={style.following}>
                            <h3>{data.countProfileName3}</h3>
                            <p>{props.currentUser.following}</p>
                        </div>
                    </div>
                    <div className={style.right_bottom}>
                        <h2>{props.currentUser.name}</h2>
                    </div>
                </div>
            </div>
            <div className={style.about}>
                <h3>{props.currentUser.position}</h3>
                <h3>{props.currentUser.about}</h3>
            </div>
            <div className={style.add_recipe}>
                {props.currentUser.idUrl === props.user.idUrl ? <Link to={`/profile/add_recipe`}><button>{data.btnNameAddREcipe}</button></Link> : ""} 
            </div>
            {props.currentUser.idUrl === props.user.idUrl ?  
                <div className={style.tabs}>
                    <button onClick={(e) => props.btnTabs(e.target.textContent)}>{data.btnsTabs.tabName1}</button>
                    <button onClick={(e) => props.btnTabs(e.target.textContent)}>{data.btnsTabs.tabName2}</button>
                    <button onClick={(e) => props.btnTabs(e.target.textContent)}>{data.btnsTabs.tabName3}</button>
                </div> 
                :  
                <div className={style.tabs}>
                    <h2>{data.recipeTab}</h2>
                </div>
            }
            <div className={style.profile_tabs_section}>
                {props.btn_tabs === data.btnsTabs.tabName1 && props.tabUserRecipes}
                {props.btn_tabs === data.btnsTabs.tabName2 && props.tabUserFollowings}
                {props.btn_tabs === data.btnsTabs.tabName3 && props.tabUserNotification}
            </div>
        </div>
    )
}