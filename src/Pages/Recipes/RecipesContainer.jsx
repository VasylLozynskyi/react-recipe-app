import { useEffect, useState } from "react";
import { RecipeCardUserProfile } from "../../Components/components/RecipeCard/RecipeCardUserProfile";
import { Loading } from "../../Components/components/loading/Loading";
import { Categories, rateButton } from "../../data/data";
import { useSelector } from "react-redux";
import { Recipes } from "./Recipes";
import { ButtonRate } from "./components/ButtonRate";
import { ButtonCategory } from "./components/ButtonCategory";

export const RecipesContainer = (props) => {
  const data = props.dataSite;
  const recipes = useSelector((state) => state.recipes.all);
  const [recipeFiltered, setRecipeFiltered] = useState([]);
  const [popup, setPopup] = useState({ display: "none" });
  const [rateFilter, setRateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setRecipeFiltered(recipes);
  }, [recipes]);

  const onChackRate = (e) => {
    setRateFilter(e.target.textContent);
  };
  const onChackCategory = (e) => {
    setCategoryFilter(e.target.textContent);
  };
  const filterHandler = () => {
    setPopup({ display: "flex" });
  };
  const hidePopuphandler = (e) => {
    if (e.target.attributes[1] && e.target.attributes[1].value) {
      setPopup({ display: "none" });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let rec = [];
    rec = rateFilter
      ? recipes.filter((el) => +el.rating.rate.toFixed(0) === +rateFilter)
      : recipes;
    rec =
      categoryFilter && categoryFilter !== "All"
        ? rec.filter((el) => el.category === categoryFilter)
        : rec;
    setRecipeFiltered(rec);
    setRateFilter("");
    setCategoryFilter("");
    setPopup({ display: "none" });
  };
  useEffect(() => {
    if (recipeFiltered.length === 0) {
      setTimeout(() => {
        setShowLoading(false);
      }, 3000);
    }
  }, [recipeFiltered]);
  const tabs =
    recipeFiltered.length > 0 ? (
      recipeFiltered.map((el) => (
        <RecipeCardUserProfile key={el.id} recipe={el} />
      ))
    ) : showLoading && recipeFiltered.length === 0 ? (
      <Loading />
    ) : (
      data.noRecipes
    );
  let buttons_rate = rateButton
    ? rateButton.map((card) => (
        <ButtonRate onChackRate={onChackRate} key={card} data={card} />
      ))
    : "";
  let buttons_category = Categories
    ? Categories.map((card) => (
        <ButtonCategory
          onChackCategory={onChackCategory}
          key={card}
          data={card}
        />
      ))
    : "";
  return (
    <Recipes
      data={data}
      tabs={tabs}
      popup={popup}
      filterHandler={filterHandler}
      hidePopuphandler={hidePopuphandler}
      onSubmit={onSubmit}
      buttons_rate={buttons_rate}
      buttons_category={buttons_category}
    />
  );
};