import { updateUserParam } from "../../utills/functions";
import { SET_STATE, UPDATE_ABOUT, UPDATE_AVATAR, UPDATE_NAME, UPDATE_POSITION, USER_LOGOUT } from "../Constants/constants";
import { ref as sRef, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { dbStorage } from "../../utills/firebase";

let initialState = {};

const userReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case SET_STATE:
            state = action.user;
            return state;
        case UPDATE_NAME:
            updateUserParam(state.idUrl, "name", action.text);
            state.name = action.text;
            return state;
        case UPDATE_ABOUT:
            updateUserParam(state.idUrl, "about", action.text);
            state.about = action.text;
            return state;
        case UPDATE_POSITION:
            updateUserParam(state.idUrl, "position", action.text);
            state.position = action.text;
            return state;
        case USER_LOGOUT:
            state = {};
            return state;
        case UPDATE_AVATAR:
            const storageRef = sRef(dbStorage, `/files/users/${state.idUrl}/`)
            const uploadTask = uploadBytesResumable(storageRef, action.file);
                uploadTask.on( "state_changed",
                (snapshot) => {        
                },
                (err) => console.log(err),
                () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    updateUserParam(state.idUrl, "iconAvatar", url);
                    state.iconAvatar = url;
                });
                });
            
            return state;
        default:
            return state;
    }
}



export default userReducer;