import { db, dbStorage } from "./firebase";
import { ref, set } from "firebase/database";
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
                          responds: "",
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

export const updateUserParam = (uid, param, value) => {
  
  if (param === "iconAvatar"){
    const storageRef = sRef(dbStorage, `/files/users/${uid}/`)
    const uploadTask = uploadBytesResumable(storageRef, value);
    uploadTask.on( "state_changed",
            (snapshot) => {        
            },
            (err) => console.log(err),
            () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          set(ref(db, `users/`+ uid +`/` + param),
              url
             ).then(() => {console.log("user add to base")})
              .catch((error) => {console.log("there was an error, details: " + error)});
            });
            });
        
    } else if (param === "name"){
      set(ref(db, `users/`+ uid +`/` + param),
      value
     ).then(() => {console.log("user add to base")})
      .catch((error) => {console.log("there was an error, details: " + error)});

  // change name in recipes

    } else if (uid) {
  set(ref(db, `users/`+ uid +`/` + param),
                     value
                    ).then(() => {console.log("user add to base")})
                     .catch((error) => {console.log("there was an error, details: " + error)});
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
                                  ingradients: recipe.recipe.ingradients,
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
                                responds: "",
                              }).then(() => {console.log("user add to base")})
                              .catch((error) => {console.log("there was an error, details: " + error)});
            });
            }
            ); 
    }
  
}



// export const getUserData = (user) => {
//   let a = {};
//   if (user) {
//     const query = ref(db, `users/` + user.uid);
//       return onValue(query, (snapshot) => {
//       const data = snapshot.val();
//       if (snapshot.exists()) {
//         a= data;
//       }
//     });
// }
// return a;
// }

export const massFilter = (mass, index) => {
  if (index === "All") return mass;
  return mass.filter(el => el.category === index)
}
