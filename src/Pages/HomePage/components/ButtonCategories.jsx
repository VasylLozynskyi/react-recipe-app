import style from "../homepage.module.scss"
export const ButtonCategories = (props) => {
    return(
        <div className={style.button_categories}>
            <button>{props.category}</button>
        </div>
    )
}