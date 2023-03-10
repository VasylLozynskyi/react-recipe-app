import { db, dbStorage } from "./firebase";
import { child, get, ref, set } from "firebase/database";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import iconAvatar from "../../assets/images/UserHomePage/avatars/boy_bang.png";
import store from "../Redux/store/store";
import { addUserRecipeAction } from "../Redux/Actions/indexRecipes";

export const createUserProfile = (user) => {
  const random = Math.floor(Math.random() * 9999);
  if (user) {
    set(ref(db, `users/` + random), {
      name: "Name",
      idUrl: random,
      iconAvatar: iconAvatar,
      uid: user.uid,
      email: user.email,
      countRecipes: 0,
      followers: 0,
      following: 0,
      position: "cook",
      about: "about",
      notifications: "",
    })
      .then(() => {
        console.log("user add to base");
      })
      .catch((error) => {
        console.log("there was an error, details: " + error);
      });
  }
};

export const updateRecipeParam = (recipe, param, value) => {
  set(ref(db, `recipes/` + recipe.id + "/" + param), value)
    .then(() => {
      console.log("recipe updates to base");
    })
    .catch((error) => {
      console.log("there was an error, details: " + error);
    });
};

export const updateUserParam = (id, param, value) => {
  if (id) {
    set(ref(db, `users/` + id + `/` + param), value)
      .then(() => {})
      .catch((error) => {
        console.log("there was an error, details: " + error);
      });
  }

  if (param === "name") {
    const dbRef = ref(db);
    get(child(dbRef, `/recipes`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let datas = snapshot.val();
          for (let el in datas) {
            if (datas[el].idUser === id) {
              set(ref(db, `recipes/` + datas[el].id + `/authorName`), value)
                .then(() => {})
                .catch((error) => {
                  console.log("there was an error, details: " + error);
                });
            }
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const newDate = () => {
  const date = new Date();
  return date.toString();
};

export const createRecipe = (recipe, user, file) => {
  const storageRef = sRef(dbStorage, `/files/${recipe.id}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (err) => console.log(err),
    () => {
      // download url
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        let newRecipe = {
          id: recipe.id,
          idUser: user.idUrl,
          authorName: user.name,
          authorAvatar: user.iconAvatar,
          title: recipe.title,
          timeAdd: newDate(),
          recipe: {
            ingredients: recipe.recipe.ingredients,
            procedure: recipe.recipe.procedure,
          },
          img: url,
          time: recipe.time,
          category: recipe.category,
          rating: {
            rate: 0,
            count: 0,
          },
          reviews: 0,
        };
        set(ref(db, `recipes/` + recipe.id), newRecipe)
          .then(() => {
            console.log("recipe add to base");
          })
          .catch((error) => {
            console.log("there was an error, details: " + error);
          });
        store.dispatch(addUserRecipeAction(newRecipe));
      });
    }
  );
};

export const addFollower = (id, param, user) => {
  if (id) {
    const dbRef = ref(db);
    get(child(dbRef, `/users/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let datas = snapshot.val();
          let ckeck = true;
          for (let us in datas.usersFollowers) {
            if (datas.usersFollowers[us] === user.idUrl) {
              ckeck = false;
              alert(`You olso had followed for ${datas.name}`);
              break;
            }
          }
          if (ckeck) {
            set(ref(db, `users/` + id + `/` + param), +datas.followers + 1)
              .then(() => {})
              .catch((error) => {
                console.log("there was an error, details: " + error);
              });
            set(
              ref(db, `users/` + id + `/usersFollowers/` + user.idUrl),
              user.idUrl
            )
              .then(() => {})
              .catch((error) => {
                console.log("there was an error, details: " + error);
              });
            set(
              ref(db, `users/` + user.idUrl + `/following`),
              +user.following + 1
            )
              .then(() => {})
              .catch((error) => {
                console.log("there was an error, details: " + error);
              });
            set(
              ref(db, `users/` + user.idUrl + `/usersFollowing/` + datas.idUrl),
              datas.idUrl
            )
              .then(() => {})
              .catch((error) => {
                console.log("there was an error, details: " + error);
              });
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

export const setcreateToUserRate = (rate, product, id) => {
  if (id && product) {
    set(ref(db, `users/` + id + "/rates/" + product.id + "/"), {
      productId: product.id,
      productRate: rate,
    })
      .then(() => {
        console.log("rates in userData add to base");
      })
      .catch((error) => {
        console.log("there was an error, details: " + error);
      });

    set(
      ref(db, `recipes/` + product.id + `/rating/rate`),
      (+product.rating.rate * +product.rating.count + rate) /
        (+product.rating.count + 1)
    )
      .then(() => {
        console.log("respond rate add to base");
      })
      .catch((error) => {
        console.log("there was an error, details: " + error);
      });
    set(
      ref(db, `recipes/` + product.id + `/rating/count`),
      +product.rating.count + 1
    )
      .then(() => {
        console.log("respond count add to base");
      })
      .catch((error) => {
        console.log("there was an error, details: " + error);
      });
  }
};

export function generateCode() {
  let prefix = new Array(2)
      .fill()
      .map(() => getRandomUppercaseChar())
      .join(""),
    integer = Math.floor(Math.random() * 9999 * 7);
  return prefix + integer;
}

export const newDateREspond = () => {
  const date = new Date();
  return date.toString();
};

function getRandomUppercaseChar() {
  let r = Math.floor(Math.random() * 26);
  return String.fromCharCode(65 + r);
}

export const saveRecipeRespond = (recipe, respond) => {
  if (recipe && respond) {
    set(
      ref(db, `recipes/` + recipe.id + `/responds/` + recipe.reviews),
      respond
    )
      .then(() => {
        console.log("respond add to base");
      })
      .catch((error) => {
        console.log("there was an error, details: " + error);
      });
    set(ref(db, `recipes/` + recipe.id + `/reviews`), recipe.reviews + 1)
      .then(() => {
        console.log("respondcount update to base");
      })
      .catch((error) => {
        console.log("there was an error, details: " + error);
      });
  }
};

export const deleteFollowingUser = (userToDel, user) => {
  set(ref(db, `users/` + user.idUrl + `/following`), +user.following - 1)
    .then(() => {})
    .catch((error) => {
      console.log("there was an error, details: " + error);
    });
  set(
    ref(db, `users/` + user.idUrl + `/usersFollowing/` + userToDel.idUrl),
    null
  )
    .then(() => {})
    .catch((error) => {
      console.log("there was an error, details: " + error);
    });
  set(
    ref(db, `users/` + userToDel.idUrl + `/followers`),
    +userToDel.followers - 1
  )
    .then(() => {})
    .catch((error) => {
      console.log("there was an error, details: " + error);
    });
  set(
    ref(db, `users/` + userToDel.idUrl + `/usersFollowers/` + user.idUrl),
    null
  )
    .then(() => {})
    .catch((error) => {
      console.log("there was an error, details: " + error);
    });
};
