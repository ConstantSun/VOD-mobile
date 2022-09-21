import  { Redirect } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


export default function Logout() {
    const navigate = useNavigate();
    const handleClick = (event) => {
        localStorage.clear();
        navigate("/");
    }
    return(
        <div className="container">
            
                <button onClick={handleClick}><h1> Log out</h1></button> 
            
        </div>
    )
}
