import style from "./newrecipecard.module.scss"
import timer from "../../../assets/images/timer.png"
import star from "../../../assets/images/star.png"

export const NewRecipeCard = (props) => {
    return (
        <div className={style.newrecipecard_container}>
            <div className={style.img}>
                <img src={props.data.img[0]} alt="" />
            </div>
            <div className={style.card_section}>
                <h3>{props.data.title}</h3>
                <div className={style.card_rate}>
                    <img src={star} alt="" />
                    <p>{props.data.rating.rate}</p>
                </div>
                <div className={style.card_info}>
                    <div className={style._author}>
                        <img src="" alt="" />
                        <p>By {props.data.authorName}</p>
                    </div>
                    <div className={style._time}>
                        <img src={timer} alt="timer_icon" />
                        <p>{props.data.time} mins</p>
                    </div>
                </div>
            </div>
        </div>
    )
}