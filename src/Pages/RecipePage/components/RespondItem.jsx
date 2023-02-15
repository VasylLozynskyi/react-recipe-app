import style from "./responditem.module.scss";
import { Link } from "react-router-dom";

export const RespondItem = (props) => {
  return (
    <div className={style.item_block}>
      <Link to={`/profile/${props.resp.idAuthor}`} className={style.user_block}>
        <div className={style.avatar}>
          <img src={props.resp.authorAvatar} alt="#" />
        </div>
        <div className={style.info}>
          <h2>{props.resp.author}</h2>
          <p>{props.resp.date.slice(4, 21)}</p>
        </div>
      </Link>
      <p>{props.resp.text}</p>
    </div>
  );
};
