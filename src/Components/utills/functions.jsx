import { db, dbStorage } from "./firebase";
import { child, get, ref, set } from "firebase/database";
import { ref as sRef, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import iconAvatar from "../../assets/images/UserHomePage/avatars/boy_bang.png"

export const createUserProfile = (user) => {
  const random = Math.floor(Math.random() * 9999);
    if (user) {
      set(ref(db, `users/`+random),
                      {
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
                      }).then(() => {console.log("user add to base")})
                      .catch((error) => {console.log("there was an error, details: " + error)});
    }
  }

export const updateUserParam = (id, param, value) => {
  if (param === "iconAvatar"){
    const storageRef = sRef(dbStorage, `/files/users/${id}/`)
    const uploadTask = uploadBytesResumable(storageRef, value);
    uploadTask.on( "state_changed",
            (snapshot) => {        
            },
            (err) => console.log(err),
            () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          set(ref(db, `users/`+ id +`/` + param),
              url
             ).then(() => {console.log("user add to base")})
              .catch((error) => {console.log("there was an error, details: " + error)});
            });
            });
    } else if (id) {
  set(ref(db, `users/`+ id +`/` + param),
                     value
                    ).then(() => {})
                     .catch((error) => {console.log("there was an error, details: " + error)});
    }

  if (param === "name"){
    const dbRef = ref(db);
    get(child(dbRef, `/recipes`)).then((snapshot) => {
      if (snapshot.exists()) {
        let datas=snapshot.val();
        for (let el in datas){
          if (datas[el].idUser === id) {
            set(ref(db, `recipes/`+ datas[el].id +`/authorName`),
                     value
                    ).then(() => {})
                     .catch((error) => {console.log("there was an error, details: " + error)});
          }
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    }
}  

const newDate =() => {
  const date = new Date();
  return date.toString();
} 

export const createRecipe = (recipe, user, file) => {
    // if (!file) {
    //     alert("Please choose a file first!")
    // } 
     if (file && recipe && user) {
    const storageRef = sRef(dbStorage, `/files/${recipe.id}/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on( "state_changed",
            (snapshot) => {        
            },
            (err) => console.log(err),
            () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              set(ref(db, `recipes/`+recipe.id),
                              {
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
                              }).then(() => {console.log("user add to base")})
                              .catch((error) => {console.log("there was an error, details: " + error)});
            });
            }
            ); 
    }
  
}

export const massFilter = (mass, index) => {
  if (index === "All") return mass;
  return mass.filter(el => el.category === index)
}

export const addFollower = (id, param, user) => {
  if (id){
    const dbRef = ref(db);
    get(child(dbRef, `/users/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        let datas=snapshot.val();
        let ckeck = true;
        for (let us in datas.usersFollowers){
          if (datas.usersFollowers[us] === user.idUrl) {
            ckeck = false;
            alert(`You olso had followed for ${datas.name}`)
            break;
          }
        }
        if (ckeck){                                              
              set(ref(db, `users/`+ id +`/` + param),
              +datas.followers + 1
            ).then(() => {})
            .catch((error) => {console.log("there was an error, details: " + error)});
            set(ref(db, `users/`+ id +`/usersFollowers/` + user.idUrl),
            user.idUrl
          ).then(() => {})
          .catch((error) => {console.log("there was an error, details: " + error)});
          set(ref(db, `users/`+ user.idUrl +`/following`),
                     +user.following + 1
                    ).then(() => {})
                     .catch((error) => {console.log("there was an error, details: " + error)});
          set(ref(db, `users/`+ user.idUrl +`/usersFollowing/` + datas.idUrl),
                      datas.idUrl
                    ).then(() => {})
                     .catch((error) => {console.log("there was an error, details: " + error)});
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}

export const setcreateToUserRate = (rate, product, id) => {
  if (id && product) {
    set(ref(db, `users/`+ id + "/rates/" + product.id + "/"),
                    {
                      productId: product.id,
                      productRate: rate,
                    }).then(() => {console.log("rates in userData add to base")})
                    .catch((error) => {console.log("there was an error, details: " + error)});

    set(ref(db, `recipes/`+ product.id + `/rating/rate`),
                    ((+product.rating.rate * +product.rating.count) + rate) / (+product.rating.count + 1),
                  ).then(() => {console.log("respond add to base")})
                  .catch((error) => {console.log("there was an error, details: " + error)});
    set(ref(db, `recipes/`+ product.id + `/rating/count`),
                  (+product.rating.count + 1),
                ).then(() => {console.log("respond add to base")})
                .catch((error) => {console.log("there was an error, details: " + error)});
  }
}