import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import star from "../../assets/images/star.png";
import timer from "../../assets/images/timer.png";
import {
  updateRecipeImgAction,
  updateRecipeTitleAction,
} from "../../Components/Redux/Actions/indexRecipe";
import {
  updateRecipeImgToAll,
  updateRecipeTitleToAll,
} from "../../Components/Redux/Actions/indexRecipes";
import store from "../../Components/Redux/store/store";
import { dbStorage } from "../../Components/utills/firebase";
import { RespondItem } from "../RecipePage/components/RespondItem";
import style from "./settingrecipepage.module.scss";

export const SettingRecipePage = (props) => {
  const data = props.dataSite;
  const recipe = useSelector((state) => state.recipePage.recipe);
  const [infoIngredient, setInfoIngredient] = useState(false);
  const [infoProcedure, setInfoProcedure] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(recipe.title);
  }, [recipe]);

  const handleClick = (e) => {
    if (e.target.textContent === "Ingredients") {
      setInfoIngredient(true);
      setInfoProcedure(false);
      setReviews(false);
    } else if (e.target.textContent === "Procedure") {
      setInfoIngredient(false);
      setInfoProcedure(true);
      setReviews(false);
    } else if (e.target.textContent === "Reviews") {
      setReviews(true);
      setInfoIngredient(false);
      setInfoProcedure(false);
    }
  };

  const handleChangeImg = () => {
    if (file.name) {
      const storageRef = sRef(dbStorage, `/files/${recipe.id}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            store.dispatch(updateRecipeImgAction(url));
            store.dispatch(updateRecipeImgToAll(recipe.id, url));
          });
        }
      );
    }
  };

  const handleChangeTitle = () => {
    if (title) {
      store.dispatch(updateRecipeTitleAction(title));
      store.dispatch(updateRecipeTitleToAll(recipe.id, title));
    }
  };

  return recipe.title ? (
    <div className={style.recipe_container}>
      <div className={style.img_section}>
        <div className={style.img}>
          <img src={recipe.img} alt="first_image" />
        </div>
        <div className={style.rating}>
          <img src={star} alt="star" />
          <p>{recipe.rating.rate}</p>
        </div>
        <div className={style._time}>
          <img src={timer} alt="timer_icon" />
          <p>
            {recipe.time} {data.minsText}
          </p>
        </div>
      </div>
      <div className={style.input_section}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <button onClick={handleChangeImg}>Change</button>
      </div>
      <h2 className={style.title}>{title}</h2>
      <div className={style.input_section}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={handleChangeTitle}>Change</button>
      </div>
      <div className={style.info_recipe}>
        <div className={style.btns_info}>
          <button onClick={handleClick}>{data.textIngredients}</button>
          <button onClick={handleClick}>{data.textProcedure}</button>
          <button onClick={handleClick}>{data.textReviews}</button>
        </div>
        <div className={style.info_section}>
          {infoIngredient && !recipe.recipe ? (
            <div>{data.zeroIngredient}</div>
          ) : infoIngredient && recipe.recipe.ingredients ? (
            recipe.recipe.ingredients.map((el) => {
              return (
                <div key={el.ingredient} className={style.section}>
                  <p>{el.ingredient}</p>
                  <p>
                    {el.weight} {data.gramsText}
                  </p>
                </div>
              );
            })
          ) : infoIngredient && !recipe.recipe.ingredients ? (
            <div>{data.zeroIngredient}</div>
          ) : (
            ""
          )}

          {infoProcedure && !recipe.recipe ? (
            <div>{data.zeroProcedure}</div>
          ) : infoProcedure && recipe.recipe.procedure ? (
            recipe.recipe.procedure.map((el) => {
              return (
                <div key={el.input_rank} className={style.section}>
                  <p>
                    {el.input_rank} {data.stepText}
                  </p>
                  <p>{el.input}</p>
                </div>
              );
            })
          ) : infoProcedure && !recipe.recipe.procedure ? (
            <div>{data.zeroProcedure}</div>
          ) : (
            ""
          )}
          {reviews && recipe.responds ? (
            recipe.responds.map((el) => <RespondItem key={el.id} resp={el} />)
          ) : reviews && !recipe.responds ? (
            <div>{data.zeroReviews}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  ) : (
    "page not found"
  );
};
