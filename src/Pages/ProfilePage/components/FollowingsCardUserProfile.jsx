import { Link } from "react-router-dom"
import style from "./followingscarduserprofile.module.scss"

export const FollowingsCardUserProfile = (props) => {
  const user = props.user
  const handleUn = () => {
    props.handleUnFollow(user)
  }
  return (
    <div className={style.followings_container}>
      <Link to={`/profile/${user.idUrl}`}>
        <div className={style.img_user}>
          <img src={user.iconAvatar} alt="#" />
        </div>
        <h2>{user.name}</h2>
      </Link>
      <button onClick={handleUn}>Unfollow</button>
    </div>
  )
}