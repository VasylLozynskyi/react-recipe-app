import style from "./timesection.module.scss"
import timer from "../../../assets/images/timer.png"

export const TimeSection = (props) => {
  return (
    <div className={style._time}>
    <img src={timer} alt="timer_icon" />
    <p>{props.time} mins</p>
</div>
  )
}