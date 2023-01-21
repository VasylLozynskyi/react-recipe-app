import style from "../userhomepage.module.scss"
export const CardRecipeHomePage = (props) => {
    return (
        <div className={style.card_container_homepage}>
            <img src="" alt="" />
            <h2>{props.data.title}</h2>
        </div>
    )
}