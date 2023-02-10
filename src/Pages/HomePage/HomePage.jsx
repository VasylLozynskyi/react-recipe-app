import { useState } from "react";
import style from "./homepage.module.scss"
import {Categories} from "../../data/data"
import { CardRecipeHomePage } from "./components/CardRecipeHomePage";
import { ButtonCategories } from "./components/ButtonCategories";
import { NewRecipes } from "./components/NewRecipes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Components/components/loading/Loading";
import store from "../../Components/Redux/store/store";
import { filterRecipesAction } from "../../Components/Redux/Actions/indexRecipes";
import { useSelector } from "react-redux";

export const HomePage = (props) => {
    const allRecipes = useSelector(state => state.recipes.filterRecipes);
    const [showLoading, setShowLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    useEffect(() => { 
        setRecipes(allRecipes)
    }, [allRecipes])

    const handleCategory = (e) => {
        if (e.target.localName === "button") {
            store.dispatch(filterRecipesAction(e.target.textContent));
        }
    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const onSearch = () => {
        props.onSearch(search);
        navigate(`/search`);
    }

    useEffect(()=> {
        if (recipes.length === 0) {
            setTimeout(() => {
                setShowLoading(false);
              }, 4000);
        }
       
    }, [recipes]);
    let recipes_user = recipes.length === 0 ? (showLoading ? <Loading /> : "Recipes does not exist") : recipes ? recipes.map(card => <CardRecipeHomePage key={card.id} data = {card}/>) : "";
    let newRecipes = recipes ? recipes.sort((a,b) => Date.parse(b.timeAdd) - Date.parse(a.timeAdd)).slice(0, 3) : "";
    
return(
       <div className={style.wrapper_UserHomePage}>
                <section className={style.search_section}>
                    <input type="text" placeholder="Search recipe" onChange={handleSearch} />
                    <button onClick={onSearch}>Search</button>
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
                        {newRecipes.length === 0 ? (showLoading ? <Loading /> : "Recipes does not exist") : newRecipes.length === 0 ? "Recipes does not exist" : <NewRecipes newRecipes={newRecipes} />}
                    </div>
                </div>
            </div>
        )
}