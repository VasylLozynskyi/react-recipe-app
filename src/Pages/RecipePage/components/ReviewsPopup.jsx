import { useState } from "react";
import { addReviewAction } from "../../../Components/Redux/Actions/indexRecipe";
import store from "../../../Components/Redux/store/store";
import { generateCode, newDateREspond } from "../../../Components/utills/functions";
import { RespondItem } from "./RespondItem";
import style from "./reviewspopup.module.scss"

export const ReviewsPopup = (props) => {
  const [input, setInput] = useState("");

  const createRespond = () => {
    if (!input){
      alert("write respond")
    } else {
      let respond={
          id: generateCode(),
          author: props.recipe.authorName,
          idAuthor: props.recipe.idUser,
          authorAvatar: props.recipe.authorAvatar,
          text: input,
          date: newDateREspond(),
          good: 0,
          bad: 0,
      }
      setInput("");
      store.dispatch(addReviewAction(respond));
      
  }
  }
  let respondsmap = (props.recipe.responds && props.recipe.responds.length > 0) ? props.recipe.responds.map(resp => <RespondItem key={resp.id} resp={resp} />) : "There are no responds";
  return (
    <div className={style.reviewspopup_container} onClick={props.isReviews} close='false'>
      <div className={style.popup_container_rev}>
          <h2>Reviews</h2>
          <p>{props.recipe.reviews} Comments</p>
          <div className={style.commentwrite_section}>
            <label htmlFor="comment">Leave a comment</label>
            <textarea name="comment" id="comment" placeholder="Say something.." onChange={(e) => setInput(e.target.value)} value={input}></textarea>
            <button onClick={createRespond}>Send</button>
          </div>
          <div className={style.reviews}>
              {respondsmap}
          </div>
      </div>
    </div>
  )
}