import star_white from "../../../assets/images/UserHomePage/filter_img/Star_white.png"
import star_green from "../../../assets/images/UserHomePage/filter_img/Star_green.png"
import { useState } from "react"
export const ButtonRate = (props) => {
    const [star, setStar] = useState(star_green);
    function rateEnter() {
        setStar(star_white)
    }
    function rateLeave() {
        setStar(star_green)
    }
    function rateHandler() {

    }
   
    return(
        <>
        <button 
        onMouseEnter={rateEnter}
        onMouseLeave={rateLeave} 
        onClick={rateHandler}>
            {props.data}
            <img src={star} alt="star" />
        </button>
        
        </>
    )
}