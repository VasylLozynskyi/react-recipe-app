import style from "./ratesection.module.scss"
import star from "../../../assets/images/star.png"

export const RateSection = (props) => {
  const rate = props.rating.rate;
  return (
    <div className={style.rating}>
                <img src={star} alt="star" />
                <p>{rate}</p>
    </div>
  )
}