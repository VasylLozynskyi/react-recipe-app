import style from "./sharepopup.module.scss"

export const SharePopup = (props) => {
  const handleCopyLink = (e) => {
    navigator.clipboard.writeText(e.target.previousElementSibling.textContent)
  }
  return(
    <div className={style.popup_share} onClick={props.isShare} close='false'>
      <div className={style.popup_container_share}>
        <p >{window.location.href}</p>
        <button onClick={handleCopyLink}>copy</button>
      </div>
    </div>
  )
}