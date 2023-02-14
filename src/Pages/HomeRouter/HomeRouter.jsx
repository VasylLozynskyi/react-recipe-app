import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../Pages/HomePage/HomePage";
import { EmptyPage, LoginEmptyPage } from "../EmptyPage/EmptyPage";
import { SearchPage } from "../SearchPage/SearchPage";
import { useEffect, useState } from "react";
import { Header } from "../../Components/Header/Header";
import { SettingRecipePage } from "../SettingRecipePage/SettingRecipePage";
import { useSelector } from "react-redux";
import { getUserAsUID } from "../../Components/utills/api";
import { setUserAction } from "../../Components/Redux/Actions/indexUser";
import store from "../../Components/Redux/store/store";
import { CreateRecipeContainer } from "../CreateRecipePage/CreateRecipeContainer";
import { SettingPageContainer } from "../SettingPage/SettingPageContainer";
import { RecipePageContainer } from "../RecipePage/RecipePageContainer";
import { Loading } from "../../Components/components/loading/Loading";
import { RecipesContainer } from "../Recipes/RecipesContainer";
import { ProfilePageContainer } from "../ProfilePage/ProfilePageContainer";

export const HomeRouter = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const isAuth = useSelector((state) => state.userPage.isAuth);
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    if (Object.keys(props.user).length === 0) {
      let authUser = JSON.parse(
        window.localStorage.getItem("userLoginREcipeApp")
      );
      if (authUser) {
        getUserAsUID(authUser).then((data) => {
          if (data) {
            store.dispatch(setUserAction(data));
          }
        });
      } else console.log("no user login");
    } else if (Object.keys(props.user).length > 0) {
      getUserAsUID(props.user).then((data) => {
        if (data) {
          store.dispatch(setUserAction(data));
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!isAuth) {
      setTimeout(() => {
        setLoadingPage(setLoadingPage(false));
      }, 1000);
    }
  }, [isAuth]);

  const onSearch = (value) => {
    setSearchValue(value);
  };

  if (isAuth) {
    return (
      <>
        <Header dataSite={props.dataSite.header} />
        <Routes>
          <Route path="home" element={<HomePage onSearch={onSearch} />} />
          <Route
            path="recipes"
            element={<RecipesContainer dataSite={props.dataSite.recipesPage} />}
          />
          <Route
            path="profile/:id"
            element={
              <ProfilePageContainer
                dataEmpty={props.dataSite.emptyPage}
                dataSite={props.dataSite.profilePage}
              />
            }
          />
          <Route
            path="recipes/:id"
            element={
              <RecipePageContainer
                dataSite={props.dataSite.recipePage}
                dataEmpty={props.dataSite.emptyPage}
              />
            }
          />
          <Route
            path="profile/add_recipe"
            element={
              <CreateRecipeContainer
                dataSite={props.dataSite.createRecipePage}
              />
            }
          />
          <Route
            path="profile/:id/settings"
            element={
              <SettingPageContainer dataSite={props.dataSite.settingPage} />
            }
          />
          <Route
            path="search"
            element={
              <SearchPage
                searchValue={searchValue}
                dataEmpty={props.dataSite.emptyPage}
              />
            }
          />
          <Route
            path="recipes/:id/settings"
            element={<SettingRecipePage dataSite={props.dataSite.recipePage} />}
          />
          <Route
            path="*"
            element={<EmptyPage data={props.dataSite.emptyPage} />}
          />
        </Routes>
      </>
    );
  } else
    return (
      <>
        {!isAuth && loadingPage && <Loading />}
        {!isAuth && !loadingPage && (
          <LoginEmptyPage data={props.dataSite.loginEmptyPage} />
        )}
      </>
    );
};
