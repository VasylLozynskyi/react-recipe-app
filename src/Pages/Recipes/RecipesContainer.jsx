import { useState } from "react";
import { RecipeCardUserProfile } from "../../Components/components/RecipeCard/RecipeCardUserProfile";
import {Loading} from "../../Components/components/loading/Loading"
import {Categories, rateButton} from "../../data/data"
import { useSelector } from "react-redux";
import { Recipes } from "./Recipes";
import { ButtonRate } from "./components/ButtonRate";
import { ButtonCategory } from "./components/ButtonCategory";

export const RecipesContainer = (props) => {
    const data = props.dataSite;
    const recipes = useSelector(state => state.recipes.all)
    const [popup, setPopup]=useState({ display: "none"});

        const onChackRate = () => {
            
        }
        const onChackCategory = () => {
            
        }
        const filterHandler = () => {
            setPopup({ display: "flex"})
        }
        const hidePopuphandler = (e) => {
            if(e.target.attributes[1] && e.target.attributes[1].value){
                setPopup({ display: "none"})
            }
        }
        const onSubmit = () => {
            
        }

        const tabs = recipes.length > 0 ? recipes.map(el => <RecipeCardUserProfile key={el.id}  recipe={el}/>) : <Loading />;
        let buttons_rate = rateButton ? rateButton.map(card => <ButtonRate onClick = {onChackRate} key={card} data = {card}/>): "";
        let buttons_category = Categories ? Categories.map(card => <ButtonCategory onClick = {onChackCategory} key= {card} data = {card}/>) : ""; 
    return (
      <Recipes 
        data={data}
        tabs={tabs}
        popup={popup}
        filterHandler={filterHandler}
        hidePopuphandler={hidePopuphandler}
        onSubmit={onSubmit}
        buttons_rate={buttons_rate}
        buttons_category={buttons_category}
      />
    )
}