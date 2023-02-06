import { useEffect, useState } from "react";
import { db } from "../../Components/utills/firebase";
import { onValue, ref } from "firebase/database";
import { RecipeCardUserProfile } from "../ProfilePage/components/RecipeCardUserProfile";
import filter_icon from "../../assets/images/UserHomePage/Filter.png"
import style from "./recipes.module.scss"
import { ButtonTime } from "../HomePage/components/ButtonTime";
import { ButtonRate } from "../HomePage/components/ButtonRate";
import { ButtonCategory } from "../HomePage/components/ButtonCategory";
import {Categories, filterTime , rateButton} from "../../data/data"

export const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [popup, setPopup]=useState({ display: "none"});
    useEffect(() => {
            const query = ref(db, `recipes/`);
            return onValue(query, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                let rec = [];
                for (let el in data){
                        rec.push(data[el]);
                }
                setRecipes(rec);
            }
            }); 
        }, [])

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

        const tabs = recipes.length > 0 ? recipes.map(el => <RecipeCardUserProfile key={el.id}  recipe={el}/>) : "section is in progress";
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