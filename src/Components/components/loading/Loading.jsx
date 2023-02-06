import style from "./loading.module.scss"
import loading from "../../../assets/images/loading.gif"

export const Loading = () => {
    return (
        <div className={style.loading}> 
                <img src={loading} alt="loading" />
            </div>
    )
}