import { NewRecipeCard } from "./NewRecipeCard"
import style from "./newrecipes.module.scss"


export const NewRecipes = (props) => {
    let massNewRecipes = props.newRecipes.map(res => <NewRecipeCard key={res.id} data={res} />)
    return (
        <div className={style.newrecipes_section}>
            {massNewRecipes}
        </div>
       
    )
}