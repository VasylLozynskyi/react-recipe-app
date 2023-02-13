import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../Components/Redux/store/store";
import { updateAboutUserAction, updateNameAction, updateNewAvatarAction, updatePositionUserAction, userLogout } from "../../Components/Redux/Actions/indexUser";
import { ref as sRef, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { dbStorage } from "../../Components/utills/firebase";
import { SettingPage } from "./SettingPage"

export const SettingPageContainer = (props) => {
    const user = useSelector(state => state.userPage.user)
    const [changeName, setChangeName] = useState(user.name)
    const [err_Name, setErr_Name] = useState("")
    const [valid_style, setValid_style] = useState({});
    const [changePosition, setChangePosition] = useState(user.position)
    const [changeAbout, setChangeAbout] = useState(user.about)
    const [file, setFile] = useState({});
    const navigate = useNavigate();

    const handleChangeName = () => {
        if (changeName && changeName.toLowerCase() === "guest") {
            setErr_Name("Name can not be as 'guest' or 'Guest'")
            setValid_style({borderColor: "red"})
        } else if (changeName && changeName.length < 3) {
            setErr_Name("Name can not be less then 3 letters")
            setValid_style({borderColor: "red"})
        } else if (changeName) {
            store.dispatch(updateNameAction(changeName))
            setValid_style({borderColor: "gray"})
            setErr_Name("");
        }
    }
    const handleChangePosition = () => {
        if (changePosition) {
            store.dispatch(updatePositionUserAction(changePosition))
        }
    }
    const handleChangeAbout = () => {
        if (changeAbout) {
            store.dispatch(updateAboutUserAction(changeAbout))
        }
    }
    const handleChangeAvatar = () => {
        if (file) {
            const storageRef = sRef(dbStorage, `/files/users/${user.idUrl}/`)
            const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on( "state_changed",
                (snapshot) => {        
                },
                (err) => console.log(err),
                () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    store.dispatch(updateNewAvatarAction(url))
                });
                });
            
        }
    }
    const handleLogout = () => {               
            store.dispatch(userLogout())
            localStorage.removeItem("userLoginREcipeApp");
            navigate("/");
    }
    return (
      <SettingPage
      data={props.dataSite}
      iconAvatar={user.iconAvatar} 
      valid_style={valid_style}
      err_Name={err_Name}
      changeName={changeName}
      changeAbout={changeAbout}
      changePosition={changePosition}
      changeNameFn={(val) => setChangeName(val)}
      changePositionFn={(val) => setChangePosition(val)}
      changeAboutFn={(val) => setChangeAbout(val)}
      setFileFn={(val) => setFile(val)}
      handleChangeName={handleChangeName}
      handleChangeAbout={handleChangeAbout}
      handleChangePosition={handleChangePosition}
      handleChangeAvatar={handleChangeAvatar}
      handleLogout={handleLogout}
      
      />
    )
}