import { Link } from "react-router-dom"
import style from "./followingscarduserprofile.module.scss"

export const FollowingsCardUserProfile = (props) => {
  const user = props.user
  return (
    <div>
      <Link to={`/react-recipe-app/profile/${user.idUrl}`}>
        <div>
          <img src={user.iconAvatar} alt="#" />
        </div>
        <h2>{user.name}</h2>
      </Link>
    </div>
  )
}