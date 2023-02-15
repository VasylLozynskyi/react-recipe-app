import { Link } from "react-router-dom";
import style from "./emptypage.module.scss";

export const LoginEmptyPage = (props) => {
  return (
    <div className={style.emptypage_container}>
      <p>{props.data.title}</p>
      <Link to={"/login"}>{props.data.link}</Link>
    </div>
  );
};

export const EmptyPage = (props) => {
  return (
    <div className={style.emptypage_container}>
      <p>{props.data.title}</p>
      <p>
        {props.data.subTitleStart} <Link to={"/"}>{props.data.link}</Link>{" "}
        {props.data.subTitleEnd}
      </p>
    </div>
  );
};

export const NotAccessPage = (props) => {
  return (
    <div className={style.emptypage_container}>
      <p>You don't have access to this page</p>
      <p>
        Please return to <Link to={"/"}>home</Link> page
      </p>
    </div>
  );
};
