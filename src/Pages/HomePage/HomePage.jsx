import { useState } from "react";
import style from "./homepage.module.scss"
import filter_icon from "../../assets/images/UserHomePage/Filter.png"

import {Categories, filterTime , rateButton} from "../../data/data"
import { massFilter } from "../../Components/utills/functions";

import { CardRecipeHomePage } from "./components/CardRecipeHomePage";
import { ButtonCategories } from "./components/ButtonCategories";
import { ButtonTime } from "./components/ButtonTime";
import { ButtonRate } from "./components/ButtonRate";
import { ButtonCategory } from "./components/ButtonCategory";
import { NewRecipes } from "./components/NewRecipes";
import { useEffect } from "react";
import { db } from "../../Components/utills/firebase";
import { onValue, ref } from "firebase/database";

export const HomePage = (props) => {
    const [popup, setPopup]=useState({ display: "none"});
    const [allRecipes, setAllRecipes]=useState([]);
    // const [category, setCategory] = useState("");
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        if (props.user.uid) {
            const query = ref(db, `recipes/`);
            return onValue(query, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                let rec = [];
                for (let el in data){
                        rec.push(data[el]);
                }
                setAllRecipes(rec);
                setRecipes(rec);
            }
            });
        }  
        }, [])


    const handleCategory = (e) => {
        if (e.target.localName === "button") setRecipes(massFilter(allRecipes, e.target.textContent));
    }

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

    let recipes_user = recipes ? recipes.map(card => <CardRecipeHomePage key={card.id} data = {card}/>) : "";
    let newRecipes = recipes ? recipes.sort((a,b) => Date.parse(a.timeAdd) - Date.parse(b.timeAdd)).slice(0, 3) : "";
    
    let buttons_time = filterTime ? filterTime.map(card => <ButtonTime onClick = {onChackTime} key={card} data = {card}/>): "";
    let buttons_rate = rateButton ? rateButton.map(card => <ButtonRate onClick = {onChackRate} key={card} data = {card}/>): "";
    let buttons_category = Categories ? Categories.map(card => <ButtonCategory onClick = {onChackCategory} key= {card} data = {card}/>) : ""; 
        return(
            <div className={style.wrapper_UserHomePage}>
                <section className={style.search_section}>
                    <input type="text" placeholder="Search recipe" />
                    <button onClick= {filterHandler}>
                        <img src={filter_icon} alt="filter_png" />
                    </button>
                </section>
                <div className={style.container_filter} onClick={handleCategory}>
                    {Categories.map(btn => <ButtonCategories key= {btn} category = {btn}/>)}
                </div>
                <div className={style.recipes_home_container}>
                    <div className={style.carousel_recipes_user}>
                        {recipes_user}
                    </div>
                </div>
                <div className={style.new_recipes_section}>
                    <h2>New Recipes</h2>
                    <div className={style.hidden_newrecipe_section}>
                        <NewRecipes newRecipes={newRecipes} />
                    </div>
                   
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