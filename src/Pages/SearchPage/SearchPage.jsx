import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loading } from "../../Components/components/loading/Loading";
import { RecipeCardUserProfile } from "../../Components/components/RecipeCard/RecipeCardUserProfile";
import style from "./searchpage.module.scss";

export const SearchPage = (props) => {
  const [searchItemsRecipes, setSearchItemsRecipes] = useState([]);
  const [searchItemsUsers, setSearchItemsUsers] = useState([]);
  const [input, setInput] = useState("");
  const recipes = useSelector((state) => state.recipes.all);
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    if (props.searchValue) {
      setInput(props.searchValue);
      setSearchItemsRecipes(
        recipes.filter((item) =>
          item.title.toLowerCase().includes(props.searchValue.toLowerCase())
        )
      );
      setSearchItemsUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(props.searchValue.toLowerCase())
        )
      );
    }
  }, [props.searchValue, recipes, users]);

  const handleSearch = () => {
    if (input.length > 0) {
      setSearchItemsRecipes(
        recipes.filter((item) =>
          item.title.toLowerCase().includes(input.toLowerCase())
        )
      );
      setSearchItemsUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(input.toLowerCase())
        )
      );
    }
  };

  const usersTabs =
    searchItemsUsers.length > 0
      ? searchItemsUsers.map((el) => {
          return (
            <div key={el.idUrl}>
              <Link className={style.userSearch} to={`/profile/${el.idUrl}`}>
                <div className={style.img}>
                  <img src={el.iconAvatar} alt="#" />
                </div>
                <h2>{el.name}</h2>
              </Link>
            </div>
          );
        })
      : "";
  const recipesTabs =
    searchItemsRecipes.length > 0 ? (
      searchItemsRecipes.map((el) => (
        <RecipeCardUserProfile key={el.id} recipe={el} />
      ))
    ) : (
      <Loading />
    );
  return (
    <div className={style.searchpage_container}>
      <div className={style.input_section}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchItemsUsers.length > 0 && usersTabs}
      {searchItemsRecipes.length > 0 && recipesTabs}
      {searchItemsRecipes.length === 0 && searchItemsUsers.length === 0 && (
        <div>No result found of this search</div>
      )}
    </div>
  );
};
