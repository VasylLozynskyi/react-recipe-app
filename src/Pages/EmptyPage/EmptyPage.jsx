import { Link } from "react-router-dom"
import style from "./emptypage.module.scss"

export const LoginEmptyPage = (props) => {
    return (
        <div className={style.emptypage_container}>
            <p>You must first to</p>
            <Link to={"/login"}>Login</Link>
        </div>
    )
}

export const EmptyPage = (props) => {
    return (
        <div className={style.emptypage_container}>
            <p>This page does not exist</p>
            <p>Please return to <Link to={"/"} >home</Link> page</p>
        </div>
    )
}

export const NotAccessPage = (props) => {
    return (
        <div className={style.emptypage_container}>
            <p>You don't have access to this page</p>
            <p>Please return to <Link to={"/"} >home</Link> page</p>
        </div>
    )
}