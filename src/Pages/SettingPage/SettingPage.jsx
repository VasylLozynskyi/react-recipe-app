import { useState } from "react";
import { updateUserParam } from "../../Components/utills/functions";
import style from "./settingpage.module.scss"


export const SettingPage = (props) => {
    const user = props.user;
    const [changeName, setChangeName] = useState(user.name)
    const [changePosition, setChangePosition] = useState(user.position)
    const [changeAbout, setChangeAbout] = useState(user.about)
    const [file, setFile] = useState({});
    const HandleChangeName = () => {
        if (changeName) {
            updateUserParam(user.idUrl, "name", changeName);
        }
    }
    const HandleChangePosition = () => {
        if (changePosition) {
            updateUserParam(user.idUrl, "position", changePosition);
        }
    }
    const HandleChangeAbout = () => {
        if (changeAbout) {
            updateUserParam(user.idUrl, "about", changeAbout);
        }
    }
    const HandleChangeAvatar = () => {
        if (file) {
            updateUserParam(user.idUrl, "iconAvatar", file);
        }
    }
    return (
        <div className={style.setting_container}>
           <h2>Settings</h2> 
           <div className={style.change}> Name
                <input type="text" id="name" name="name" placeholder={changeName} onChange={(e) =>    setChangeName(e.target.value)} />
                <button onClick={HandleChangeName}>Change</button>
           </div>
           <div className={style.change}> Position
                <input type="text" id="position" name="position" placeholder={changePosition} onChange={(e) =>    setChangePosition(e.target.value)} />
                <button onClick={HandleChangePosition}>Change</button>
           </div>
           <div className={style.change}> About
                <textarea type="text" id="about" name="about" placeholder={changeAbout} maxlength="50" onChange={(e) =>    setChangeAbout(e.target.value)} />
                <button onClick={HandleChangeAbout}>Change</button>
           </div>
           <div className={style.photo}>
            <img src={user.iconAvatar} alt="" />
           </div>
           <div className={style.change}> Photo
                <input type="file" name="avatar" id="img_file" onChange={(e) => {setFile(e.target.files[0])}}/>
                <button onClick={HandleChangeAvatar}>Change</button>
            </div>
        </div>
    )
}