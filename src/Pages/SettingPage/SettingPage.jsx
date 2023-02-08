import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../Components/utills/firebase";
import style from "./settingpage.module.scss"
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../Components/Redux/store/store";
import { updateAboutUserAction, updateNameAction, updateNewAvatarAction, updatePositionUserAction, userLogout } from "../../Components/Redux/Actions/indexUser";


export const SettingPage = () => {
    const user = useSelector(state => state.userPage)
    const [changeName, setChangeName] = useState(user.name)
    const [err_Name, setErr_Name] = useState("")
    const [valid_style, setValid_style] = useState({});
    const [changePosition, setChangePosition] = useState(user.position)
    const [changeAbout, setChangeAbout] = useState(user.about)
    const [file, setFile] = useState({});
    const navigate = useNavigate();
    const HandleChangeName = () => {
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
    const HandleChangePosition = () => {
        if (changePosition) {
            store.dispatch(updatePositionUserAction(changePosition))
        }
    }
    const HandleChangeAbout = () => {
        if (changeAbout) {
            store.dispatch(updateAboutUserAction(changeAbout))
        }
    }
    const HandleChangeAvatar = () => {
        if (file) {
            store.dispatch(updateNewAvatarAction(file))
        }
    }
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            store.dispatch(userLogout())
            navigate("/react-recipe-app");
            console.log("Signed out successfully")
        }).catch((error) => {
        console.log(error.message);
        });
    }
    return (
        <div className={style.setting_container}>
           <h2>Settings</h2> 
           <div className={style.name_section}> 
                <div className={style.change}>
                    <p>Name</p>
                    <input type="text" id="name" name="name" placeholder={changeName} style={valid_style} onChange={(e) =>    setChangeName(e.target.value)} />
                    <button onClick={HandleChangeName}>Change</button>
                    <div className={style.invalid_value}>{err_Name}</div> 
                </div>
           </div>
           <div className={style.change}> Position
                <input type="text" id="position" name="position" placeholder={changePosition} onChange={(e) =>    setChangePosition(e.target.value)} />
                <button onClick={HandleChangePosition}>Change</button>
           </div>
           <div className={style.change}> About Me
                <textarea type="text" id="about" name="about" placeholder={changeAbout} maxLength="50" onChange={(e) =>    setChangeAbout(e.target.value)} />
                <button onClick={HandleChangeAbout}>Change</button>
           </div>
           <div className={style.photo}>
            <img src={user.iconAvatar} alt="" />
           </div>
           <div className={style.change}> Photo
                <input type="file" name="avatar" id="img_file" onChange={(e) => {setFile(e.target.files[0])}}/>
                <button onClick={HandleChangeAvatar}>Change</button>
            </div>
            <button className={style.btn_logout} onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}