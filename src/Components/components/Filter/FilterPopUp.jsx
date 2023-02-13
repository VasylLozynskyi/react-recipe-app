import style from "./filterpopup.module.scss"

export const Filter = (props) => {
  return (
    <div style={props.popup} className={style.popup_filter} onClick={props.hidePopuphandler} close='false'>
      <div className={style.popup_container_filter}>
        <h2>{props.data.title}</h2>
        <div>
          <h2>{props.data.subTitle1}</h2>
        </div>
        <div>
          <h2>{props.data.subTitle2}</h2>
          <div className={style.button_rate}>
            {props.buttons_rate}
          </div>
        </div>
        <div>
          <h2>{props.data.subTitle3}</h2>
          <div className={style.button_category}>
            {props.buttons_category}
          </div>
        </div>
        <div className={style.filterOk}>
          <button onClick = {props.onSubmit} >{props.data.buttonSubmit}</button>
        </div>
      </div>
    </div>
  )
}