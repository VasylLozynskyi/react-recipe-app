import { child, get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom"
import { db } from "../../Components/utills/firebase";
import star from "../../assets/images/star.png"
import timer from "../../assets/images/timer.png"
import style from "./recipepage.module.scss"
import { addFollower } from "../../Components/utills/functions";
import { StarRating } from "../../Components/components/starRating/StarRating";
import star_icon from "../../assets/images/star_icon.png"
import update_icon from "../../assets/images/update_icon.png"
import share_icon from "../../assets/images/share_icon.png"
import review_icon from "../../assets/images/review_icon.png"

export const RecipePage = (props) => {
 
    const [recipe, setRecipe]=useState({})
    const [rate, setRate]=useState("")
    const [timePrepare, setTimePrepare] = useState("")
    const [infoIngredient, setInfoIngredient] = useState(false);
    const [infoProcedure, setInfoProcedure] = useState(false);
    const [reviews, setReviews] = useState(false);
    const [popup, setPopup]=useState({ display: "none"});
    const {id} = useParams()

    useEffect(()=>{
        const dbRef = ref(db);
        get(child(dbRef, `/recipes/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data=snapshot.val();
                setRecipe(data);
                setRate(data.rating.rate)
                setInfoIngredient(true)
                setTimePrepare(data.time)
                } else {
                    console.log("No data available");
                }
        }  ).catch((error) => {
            console.error(error);
        });

    }, [id]);

    const handleFollow = () => {
        
        addFollower(recipe.idUser, "followers", props.user)
    }

    const handleClick = (e) =>{
        if (e.target.textContent === "Ingredients"){
            setInfoIngredient(true); 
            setInfoProcedure(false);   
            setReviews(false);
        } else if (e.target.textContent === "Procedure"){
            setInfoIngredient(false);  
            setInfoProcedure(true);
            setReviews(false);
        } else if (e.target.textContent === "Reviews"){
            setReviews(true);
            setInfoIngredient(false);  
            setInfoProcedure(false);
        }
    }

    const hidePopuphandler = (e) => {
        if(e.target.attributes[1] && e.target.attributes[1].value){
            setPopup({ display: "none"})
        }
    }

    const moreHandler = () => {
        setPopup({ display: "flex"})
    }

    return (
        <div className={style.recipe_container}>
            { props.user.name !== "Guest" ? <div className={style.more} onClick= {moreHandler}>
                <button title="more">...</button> 
            </div> : ""}
            <div className={style.img_section}>
                <div className={style.img}>
                    <img src={recipe.img} alt="first_image" />
                </div>
               <div className={style.rating}>
                    <img src={star} alt="star" />
                    <p>{rate}</p>
                </div>
                 <div className={style._time}>
                    <img src={timer} alt="timer_icon" />
                    <p>{timePrepare} mins</p>
                </div>   
            </div>
            <h2 className={style.title}>{recipe.title}</h2>
            <div className={style.author_section}>
                <Link className={style.left} to={`/react-recipe-app/profile/${recipe.idUser}`}>
                    <div className={style.avatar}>
                        <img src={recipe.authorAvatar} alt="avatar_author" />
                    </div>
                    <h2>{recipe.authorName}</h2>
                </Link>
                { props.user.name !== "Guest" && props.user.idUrl !== recipe.idUser ? <div className={style.right}>
                    <button onClick={handleFollow}>Follow</button>
                </div> : ""}
            </div>
            <div className={style.info_recipe}>
                <div className={style.btns_info}>
                    <button onClick={handleClick}>Ingredients</button>
                    <button onClick={handleClick}>Procedure</button>
                    <button onClick={handleClick}>Reviews</button>
                </div>
                <div className={style.info_section}>
                    {infoIngredient && !recipe.recipe ? <div>this recipe don't have ingredients</div> : infoIngredient && recipe.recipe.ingredients ? recipe.recipe.ingredients.map(el => {
                        return (
                            <div key={el.ingredient} className={style.section}>
                                <p>{el.ingredient}</p>
                                <p>{el.weight} grams</p>
                            </div>
                        )
                    }) : infoIngredient && !recipe.recipe.ingredients ? <div>this recipe don't have ingredients</div> : ""}
                    {infoProcedure && !recipe.recipe ? <div>this recipe don't have procedure</div> : infoProcedure && recipe.recipe.procedure ? recipe.recipe.procedure.map(el => {
                        return (
                            <div key={el.input_rank} className={style.section}>
                                <p>{el.input_rank} step</p>
                                <p>{el.input}</p>
                            </div>
                        )
                    }) : infoProcedure && !recipe.recipe.procedure ? <div>this recipe don't have procedure</div> : ""}
                    {reviews && recipe.responds ? recipe.responds.map(el => {
                        return (
                            <div key={el} className={style.section}>
                                <p>review </p>
                                <p>some text</p>
                            </div>
                        )
                    }) : reviews && !recipe.responds ? <div>this recipe don't have reviews</div> : ""}
                </div>
            </div>
            <div style={popup} className={style.popup_filter} onClick={hidePopuphandler} close='false'>
                    <div className={style.popup_container_filter}>
                        <div>
                            <img src={update_icon} alt="#" />
                            <h2>Update Recipe</h2>
                        </div>
                        <div>
                            <img src={star_icon} alt="#" />
                            <h2>Rate recipe</h2>
                            <StarRating user={props.user} product={recipe} />
                        </div>
                        <div>
                            <img src={share_icon} alt="#" />
                            <h2>share</h2>  
                        </div>
                        <div>
                            <img src={review_icon} alt="#" />
                            <h2>Add review</h2>  
                        </div>
                    </div>
                </div>
        </div>
    )
}