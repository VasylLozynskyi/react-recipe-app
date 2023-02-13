import style from "./settingpage.module.scss"

export const SettingPage = (props) => {
    const data = props.data;
    return (
        <div className={style.setting_container}>
           <h2>{data.title}</h2> 
           <div className={style.name_section}> 
                <div className={style.change}>
                    <p>{data.labelName}</p>
                    <input type="text" id="name" name="name" placeholder={props.changeName} style={props.valid_style} onChange={(e) => props.changeNameFn(e.target.value)} />
                    <button onClick={props.handleChangeName}>{data.buttonName}</button>
                    <div className={style.invalid_value}>{props.err_Name}</div> 
                </div>
           </div>
           <div className={style.change}> {data.labelPosition}
                <input type="text" id="position" name="position" placeholder={props.changePosition} onChange={(e) => props.changePositionFn(e.target.value)} />
                <button onClick={props.handleChangePosition}>{data.buttonName}</button>
           </div>
           <div className={style.change}> {data.labelAboutMe}
                <textarea type="text" id="about" name="about" placeholder={props.changeAbout} maxLength="50" onChange={(e) => props.changeAboutFn(e.target.value)} />
                <button onClick={props.handleChangeAbout}>{data.buttonName}</button>
           </div>
           <div className={style.photo}>
            <img src={props.iconAvatar} alt="" />
           </div>
           <div className={style.change}> {data.labelPhoto}
                <input type="file" name="avatar" id="img_file" onChange={(e) => {props.setFileFn(e.target.files[0])}}/>
                <button onClick={props.handleChangeAvatar}>{data.buttonName}</button>
            </div>
            <button className={style.btn_logout} onClick={props.handleLogout}>
                {data.buttonLogOut}
            </button>
        </div>
    )
}