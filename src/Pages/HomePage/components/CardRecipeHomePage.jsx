import style from "./cardrecipehomepage.module.scss"
import star from "../../../assets/images/star.png"
import {Link} from "react-router-dom"

export const CardRecipeHomePage = (props) => {
    
    return (
        <Link to={`/recipes/${props.data.id}`} className={style.card_container_homepage}>
            <div className={style.img_product}>
                <img src={props.data.img} alt="#" />
            </div>
             <h2>{props.data.title}</h2>
            <div className={style.recipe_card}>
                <div>
                    <p>Time</p>
                    <p>{props.data.time} Mins</p>
                </div>
            </div>
            <div className={style.rate}>
                <img src={star} alt="star" />
                <p>{props.data.rating.rate.toFixed(1)}</p>
            </div>
        </Link>
    )
}