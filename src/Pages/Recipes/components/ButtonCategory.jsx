
export const ButtonCategory = (props) => {
    return(
            <button onClick={e => props.onChackCategory(e)}>{props.data}</button>
    )
}