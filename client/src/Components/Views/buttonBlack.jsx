
const ButtonBlack = ({ children, handleClic, value}) => {
    return(
        <button style={{
            border:"none", outline:"none", color:"white", fontSize:"11px", cursor:"pointer", background:"black",padding:"2px", display:"flex",justifyContent:"center",alignItems:"center"}} value={value} onClick={(e) => handleClic(e)}>
            {children}
        </button>
    )
}
export default ButtonBlack;