import React from "react";
import filter_icon from "../../assets/images/UserHomePage/Filter.png"
import style from "./recipes.module.scss"
import { Filter } from "../../Components/components/Filter/FilterPopUp";

export const Recipes = (props) => {
    return (
        <div className={style.recipes_container}>
            <h2>{props.data.title}</h2>
            <button className={style.recipes_filter} onClick= {props.filterHandler}>
                <img src={filter_icon} alt="filter_png" />
                {props.data.buttonNameFilter}
            </button>
            <div className={style.recipes}>
                {props.tabs}
            </div>
            <Filter 
                data={props.data.dataFilter}
                hidePopuphandler={props.hidePopuphandler}
                onSubmit={props.onSubmit}
                popup={props.popup}
                buttons_rate={props.buttons_rate}
                buttons_category={props.buttons_category}
            />
        </div>
       
    )
}