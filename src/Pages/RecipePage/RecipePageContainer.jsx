import { useEffect, useState } from "react";
import { useParams} from "react-router-dom"
import { addFollower } from "../../Components/utills/functions";
import { getRecipe } from "../../Components/utills/api";
import { useSelector } from "react-redux";
import { RecipePage } from "./RecipePage";
import { EmptyPage } from "../EmptyPage/EmptyPage"
import store from "../../Components/Redux/store/store";
import { setCurrentRecipeAction } from "../../Components/Redux/Actions/indexRecipe";

export const RecipePageContainer = (props) => {
    const user = useSelector(state => state.userPage.user)
    const recipe = useSelector(state => state.recipePage.recipe)
    const {id} = useParams()
    const [rate, setRate]=useState("")
    const [timePrepare, setTimePrepare] = useState("")
    const [infoIngredient, setInfoIngredient] = useState(false);
    const [infoProcedure, setInfoProcedure] = useState(false);
    const [reviews, setReviews] = useState(false);
    const [popup, setPopup] = useState({ display: "none"});
    const [share, setShare] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    useEffect(()=>{
        getRecipe(id).then(data => {
            if (data){
                setRate(data.rating.rate);
                setTimePrepare(data.time);
                setInfoIngredient(true);
                store.dispatch(setCurrentRecipeAction(data))
            } 
        })
    }, [id]);
    const handleFollow = () => {
       addFollower(recipe.idUser, "followers", user)
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
        if(e.target.attributes.close && e.target.attributes.close.value === "false"){
            setPopup({ display: "none"})
        }
    }
    const moreHandler = () => {
        setPopup({ display: "flex"})
    }
    const handleShowSharePopup = (e) => {
        setShare(true)
        setPopup({ display: "none"})

    }
    const handleShowShare = (e) => {
        if(e.target.attributes.close && e.target.attributes.close.value === "false"){
        setShare(false)
        }
    }
    const handleShowReviewsPopup = () => {
        setShowReviews(true)
        setPopup({ display: "none"})
    }
    const handleShowReviews = (e) => {
        if(e.target.attributes.close && e.target.attributes.close.value === "false"){
            setShowReviews(false)
            }
    }
    if (recipe.id) {
    return (
     <RecipePage
     data={props.dataSite}
     recipe={recipe}
     user={user}
     timePrepare={timePrepare}
     rate={rate}
     moreHandler={moreHandler}
     handleFollow={handleFollow}
     handleClick={handleClick}
     hidePopuphandler={hidePopuphandler}
     handleShowSharePopup={handleShowSharePopup}
     handleShowShare={handleShowShare}
     infoIngredient={infoIngredient}
     infoProcedure={infoProcedure}
     reviews={reviews}
     popup={popup}
     share={share}
     showReviews={showReviews}
     handleShowReviews={handleShowReviews}
     handleShowReviewsPopup={handleShowReviewsPopup}
     />
    )
                } else return (
                    <EmptyPage data={props.dataEmpty} />
                )
}