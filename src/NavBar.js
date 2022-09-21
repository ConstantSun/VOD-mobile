import {Link} from 'react-router-dom'
const NavBar = () => {
    return ( 
        <nav className="navbar">
            <h4>AnyCompany</h4>
            <div className="links">
                <Link to="/home">Home </Link>
                <Link to="/create" 
                    // style={{
                    //     color: "white",
                    //     backgroundColor: '#f1356d',
                    //     borderRadius: '8px'
                    // }}
                    >
                     Up Vid 
                </Link>
                <Link to="/logout"> Logout </Link>
            </div>
        </nav>
     );
}
 
export default NavBar;