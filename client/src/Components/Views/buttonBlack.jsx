
const ButtonBlack = ({ children, handleClic }) => {
    return(
        <button style={{
            border:"none", outline:"none", color:"white", fontSize:"11px", cursor:"pointer", background:"black",padding:"2px", display:"flex",justifyContent:"center",alignItems:"center"}} onClick={() => handleClic()}>
            {children}
        </button>
    )
}
export default ButtonBlack;