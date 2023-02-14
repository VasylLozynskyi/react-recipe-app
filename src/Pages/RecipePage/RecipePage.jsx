import {Link} from "react-router-dom"
import star from "../../assets/images/star.png"
import timer from "../../assets/images/timer.png"
import style from "./recipepage.module.scss"
import { StarRating } from "../../Components/components/starRating/StarRating";
import star_icon from "../../assets/images/star_icon.png"
import update_icon from "../../assets/images/update_icon.png"
import share_icon from "../../assets/images/share_icon.png"
import review_icon from "../../assets/images/review_icon.png"
import { SharePopup } from "./components/SharePopup";
import { ReviewsPopup } from "./components/ReviewsPopup";
import { RespondItem } from "./components/RespondItem";

export const RecipePage = (props) => {
    const data = props.data;
    return (
        <div className={style.recipe_container}>
            { props.user.name !== "Guest" ? <div className={style.more} onClick= {props.moreHandler}>
                <button title="more">{data.buttonSetting}</button> 
            </div> : ""}
            <div className={style.img_section}>
                <div className={style.img}>
                    <img src={props.recipe.img} alt="first_image" />
                </div>
               <div className={style.rating}>
                    <img src={star} alt="star" />
                    <p>{props.rate}</p>
                </div>
                 <div className={style._time}>
                    <img src={timer} alt="timer_icon" />
                    <p>{props.timePrepare} {data.minsText}</p>
                </div>   
            </div>
            <h2 className={style.title}>{props.recipe.title}</h2>
            <div className={style.author_section}>
                <Link className={style.left} to={`/profile/${props.recipe.idUser}`}>
                    <div className={style.avatar}>
                        <img src={props.recipe.authorAvatar} alt="avatar_author" />
                    </div>
                    <h2>{props.recipe.authorName}</h2>
                </Link>
                { props.user.name !== "Guest" && props.user.idUrl !== props.recipe.idUser ? <div className={style.right}>
                    <button onClick={props.handleFollow}>{data.buttonFollow}</button>
                </div> : ""}
            </div>
            <div className={style.info_recipe}>
                <div className={style.btns_info}>
                    <button onClick={props.handleClick}>{data.textIngredients}</button>
                    <button onClick={props.handleClick}>{data.textProcedure}</button>
                    <button onClick={props.handleClick}>{data.textReviews}</button>
                </div>
                <div className={style.info_section}>
                    {props.infoIngredient && !props.recipe.recipe ? <div>{data.zeroIngredient}</div> : props.infoIngredient && props.recipe.recipe.ingredients ? props.recipe.recipe.ingredients.map(el => {
                        return (
                            <div key={el.ingredient} className={style.section}>
                                <p>{el.ingredient}</p>
                                <p>{el.weight} {data.gramsText}</p>
                            </div>
                        )
                    }) : props.infoIngredient && !props.recipe.recipe.ingredients ? <div>{data.zeroIngredient}</div> : ""}
                    {props.infoProcedure && !props.recipe.recipe ? <div>{data.zeroProcedure}</div> : props.infoProcedure && props.recipe.recipe.procedure ? props.recipe.recipe.procedure.map(el => {
                        return (
                            <div key={el.input_rank} className={style.section}>
                                <p>{el.input_rank} {data.stepText}</p>
                                <p>{el.input}</p>
                            </div>
                        )
                    }) : props.infoProcedure && !props.recipe.recipe.procedure ? <div>{data.zeroProcedure}</div> : ""}
                    {props.reviews && props.recipe.responds ? props.recipe.responds.map(el => <RespondItem key={el.id} resp={el} />)
                    : props.reviews && !props.recipe.responds ? <div>{data.zeroReviews}</div> : ""}
                </div>
            </div>
            <div style={props.popup} className={style.popup_filter} onClick={props.hidePopuphandler} close='false'>
                    <div className={style.popup_container_filter}>
                        {props.user.idUrl === props.recipe.idUser && 
                        <div>
                            <img src={update_icon} alt="#" />
                            <Link to={`/recipes/${props.recipe.id}/settings`}>
                                <h2>{data.popupUpdateRecipe}</h2>
                            </Link>
                        </div>}
                        <div>
                            <img src={star_icon} alt="#" />
                            <h2>{data.popupRateRecipe}</h2>
                            <StarRating user={props.user} product={props.recipe} />
                        </div>
                        <div>
                            <img src={share_icon} alt="#" />
                            <h2 onClick={props.handleShowSharePopup}>{data.popupLinkShare}</h2>  
                        </div>
                        <div>
                            <img src={review_icon} alt="#" />
                            <h2 onClick={props.handleShowReviewsPopup}>{data.popupLinkAddReview}</h2>  
                        </div>
                    </div>
                </div>
                {props.share && <SharePopup isShare={props.handleShowShare} />}
                {props.showReviews && <ReviewsPopup 
                                        isReviews={props.handleShowReviews}
                                        recipe={props.recipe}
                                    />}
        </div>
    )
}