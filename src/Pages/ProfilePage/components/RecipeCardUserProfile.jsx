import { Link } from "react-router-dom"
import style from "./recipecarduserprofile.module.scss"
import star from "../../../assets/images/star.png"
import timer from "../../../assets/images/timer.png"

export const RecipeCardUserProfile = (props) => {
   
    const recipe = props.recipe;
    return (
        <div className={style.cardrecipeuser_container}>
            <div className={style.img_food}>
                <img  src={recipe.img} alt="someimige_food" />
            </div>
            <div className={style.rating}>
                <img src={star} alt="star" />
                <p>{recipe.rating.rate}</p>
            </div>
            <div className={style.info_author}>
                <Link to={`/react-recipe-app/recipes/${recipe.id}`}>
                    <h3>{recipe.title}</h3>
                </Link>
                <Link to={`/react-recipe-app/profile/${recipe.idUser}`}><p>By {recipe.authorName}</p></Link>
            </div>
                <div className={style._time}>
                        <img src={timer} alt="timer_icon" />
                        <p>{recipe.time} mins</p>
                </div>
            
        </div>
    )
}