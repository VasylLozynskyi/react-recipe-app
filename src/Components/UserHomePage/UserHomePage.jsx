import style from "./userhomepage.module.scss"
import { useParams } from 'react-router-dom';
import filter_icon from "../../assets/images/UserHomePage/Filter.png"
import { CardRecipeHomePage } from "./components/CardRecipeHomePage";
import {Categories, filterTime , rateButton, buttons_category} from "../../data/data"
import { ButtonCategories } from "./components/ButtonCategories";
import { ButtonTime } from "./components/ButtonTime";
import { ButtonRate } from "./components/ButtonRate";
import { ButtonCategory } from "./components/ButtonCategory";
import { useState } from "react";

export const UserHomePage = (props) => {
    let {id} = useParams();
    let user = props.users ? props.users.filter(user => id === user.id)[0] : {};
    let avatarUser = user ? user.avatar : "#";
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
        console.dir(e.target.attributes[1].value);
        if(e.target.attributes[1].value){
            setPopup({ display: "none"})
        }
    }
    const onSubmit = () => {
        
    }


    let recipes_user = props.data ? props.data.map(card => <CardRecipeHomePage key={card.id} data = {card}/>) : "";
    let buttons_time = filterTime ? filterTime.map(card => <ButtonTime onClick = {onChackTime} key={card} data = {card}/>): "";
    let buttons_rate = rateButton ? rateButton.map(card => <ButtonRate onClick = {onChackRate} key={card} data = {card}/>): "";
    let buttons_category = Categories ? Categories.map(card => <ButtonCategory onClick = {onChackCategory} key= {card} data = {card}/>) : ""; 
    
    return(
        <div className={style.wrapper_UserHomePage}>
            <header>
                <div>
                    <h1>{user.name}</h1>
                    <p>What are you cooking today?</p>
                </div>
                <img src={avatarUser} alt="avatar" />
            </header>
            <section className={style.search_section}>
                <input type="text" placeholder="Search recipe" />
                <button onClick= {filterHandler}>
                    <img src={filter_icon} alt="filter_png" />
                </button>
            </section>
            <div className={style.container_filter}>
                {Categories.map(btn => <ButtonCategories key= {btn} category = {btn}/>)}
            </div>
            <div className={style.carousel_recipes_user}>
                {recipes_user}
            </div>
            <div style={popup} className={style.popup_filter} onClick={hidePopuphandler} close = {false}>
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