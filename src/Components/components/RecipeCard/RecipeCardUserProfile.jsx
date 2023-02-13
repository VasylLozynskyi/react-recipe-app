import { Link } from "react-router-dom"
import style from "./recipecarduserprofile.module.scss"
import { RateSection } from "../rateSection/RateSection"
import { TimeSection } from "../timesection/TimeSection";

export const RecipeCardUserProfile = (props) => {
   
    const recipe = props.recipe;
    return (
        <div className={style.cardrecipeuser_container}>
            <div className={style.img_food}>
                <img  src={recipe.img} alt="someimage_food" />
            </div>
            <RateSection rating={recipe.rating} />
            <div className={style.info_author}>
                <Link to={`/recipes/${recipe.id}`}>
                    <h3>{recipe.title}</h3>
                </Link>
                <Link to={`/profile/${recipe.idUser}`}><p>By {recipe.authorName}</p></Link>
            </div>
            <TimeSection time={recipe.time} />
        </div>
    )
}