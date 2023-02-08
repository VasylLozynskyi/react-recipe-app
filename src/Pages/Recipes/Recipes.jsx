import { useState } from "react";
import { RecipeCardUserProfile } from "../ProfilePage/components/RecipeCardUserProfile";
import filter_icon from "../../assets/images/UserHomePage/Filter.png"
import style from "./recipes.module.scss"
import { ButtonTime } from "../HomePage/components/ButtonTime";
import { ButtonRate } from "../HomePage/components/ButtonRate";
import { ButtonCategory } from "../HomePage/components/ButtonCategory";
import {Loading} from "../../Components/components/loading/Loading"
import {Categories, filterTime , rateButton} from "../../data/data"
import { useSelector } from "react-redux";

export const Recipes = () => {
    const recipes = useSelector(state => state.recipes.all)
    const [popup, setPopup]=useState({ display: "none"});

        const onChackTime = () => {

        }
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
        let buttons_time = filterTime ? filterTime.map(card => <ButtonTime onClick = {onChackTime} key={card} data = {card}/>): "";
        let buttons_rate = rateButton ? rateButton.map(card => <ButtonRate onClick = {onChackRate} key={card} data = {card}/>): "";
        let buttons_category = Categories ? Categories.map(card => <ButtonCategory onClick = {onChackCategory} key= {card} data = {card}/>) : ""; 
    return (
        <div className={style.recipes_container}>
            <h2>Recipes</h2>
            <button className={style.recipes_filter} onClick= {filterHandler}>
                <img src={filter_icon} alt="filter_png" />
                Filter
            </button>
            <div className={style.recipes}>
                {tabs}
            </div>
            <div style={popup} className={style.popup_filter} onClick={hidePopuphandler} close='false'>
                    <div className={style.popup_container_filter}>
                        <h2>Filter Search</h2>
                        <div>
                            <h2>Time</h2>
                            <div className={style.button_time}>
                                {buttons_time}
                            </div>
                        </div>
                        <div>
                            <h2>Rate</h2>
                            <div className={style.button_rate}>
                                {buttons_rate}
                            </div>
                        </div>
                        <div>
                            <h2>Category</h2>
                            <div className={style.button_category}>
                                {buttons_category}
                            </div>
                        </div>
                        <div className={style.filterOk}>
                            <button onClick = {onSubmit} >Filter</button>
                        </div>
                    </div>
                </div>
        </div>
       
    )
}