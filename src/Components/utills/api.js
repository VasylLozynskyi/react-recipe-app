import { child, get, ref } from 'firebase/database';
import { db } from './firebase';


export function getData (data){
  const dbRef = ref(db);
  return get(child(dbRef, data)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let rec = [];
        for (let el in data){
                rec.push(data[el]);
        }
         return rec
      }}) 
}

export function getRecipe (id){
  const dbRef = ref(db);
  return get(child(dbRef, `/recipes/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
                const data=snapshot.val();
                return data;
      }})
    .catch(error => console.log(error))
}

export function getRecipesUser (id){
  const dbRef = ref(db);
  return get(child(dbRef, "recipes")).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let rec = [];
        for (let el in data){
          if (data[el].idUser === +id) {
                rec.push(data[el]);
          }
        }
        return rec
      }}) 
}

export function getUserAsUID (user){
    // const query = ref(db, `users`);
    //     return onValue(query, (snapshot) => {
    //       const data = snapshot.val();
    //       if (snapshot.exists()) {
    //          // eslint-disable-next-line
    //         for (let us in data){
    //             if (data[us].uid === user.uid ){
    //             return data[us];
    //             }
    //         }
    //       }
    //     });
  const dbRef = ref(db);
  return get(child(dbRef, "users"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (let us in data){
          if (data[us].uid === user.uid ){
            return data[us];
          }
        }
      }
    }) 
}

export function getUser (id){
  const dbRef = ref(db);
  return get(child(dbRef, `users/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        return data;
      }
    }) 
}
