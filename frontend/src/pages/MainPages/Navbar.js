/* React */
import { useState } from "react";
import { NavLink, useNavigate,  } from 'react-router-dom'

/* Components */


/* Styles */
import companyLogo from '../../images/globert_logo.png'
import '../../styles/navbar.css'
import { clearUserData, isAgentLoggedIn, isClientLoggedIn } from "../../utilities/UserSession";

const Navbar = () => {

    const [ location, setLocation ] = useState( "" )
    const navigate = useNavigate();

    const LogOutHandler = () =>
        {
        if( window.confirm( "Are you sure you want to log out?" ) )
            {
            clearUserData()
            navigate( "/home" )
            }
        }

    const SearchHandler = async( e ) =>
        {
        e.preventDefault();
        navigate( "/destinations", { state: location } )
        window.location.reload()
        }

    /* JSX */
    return (
        <nav className = "navbar">
            <div className = "container">
                <div className = "nav-logo">
                    <NavLink to = "/home">
                        <img src = { companyLogo } style = { { width: '55%', height: '45%' } } alt = 'Globert Logo'/>
                    </NavLink>
                </div>
                <div className = "nav-elements">
                    <ul>
                        <li>
                            <NavLink to = "/home">Home</NavLink>
                        </li>
                        <li>
                            <div className = "nav-select-container">
                                <button className = "nav-select">Destinations</button>
                                <div className = "nav-select-options">
                                    <a href = "/destinations" style = { { fontSize: "15px" } }>Destinations</a>
                                    <a href = "/offers" style = { { fontSize: "15px"} }>Offers</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <form onSubmit={ SearchHandler }>
                                <input className = "nav-search"
                                       type = "text"
                                       placeholder = "Search destinations.."
                                       onChange = { ( e ) => setLocation( e.target.value ) }
                                >
                                </input>
                            </form>
                        </li>
                        {
                        ( !isClientLoggedIn() && !isAgentLoggedIn() ) &&
                        <li>
                            <NavLink  to="/login">Log In</NavLink>
                        </li>
                        }
                        {
                        ( isClientLoggedIn() || isAgentLoggedIn() ) &&
                        <li>
                            <button onClick = { LogOutHandler } >Log Out</button>
                        </li>
                        }
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar