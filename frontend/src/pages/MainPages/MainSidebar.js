/* Components */
import { NavLink } from 'react-router-dom'

/* Styles */
import companyLogo from '../../images/globert_logo.png'
import '../../styles/navbar.css'

const MainSidebar = () => {

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
                                <div className = "nav-options">
                                    <a href = "/destinations" style = { { fontSize: "15px" } }>Destinations</a>
                                    <a href = "/offers" style = { { fontSize: "15px"} }>Offers</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <input className = "nav-search" type = "text" placeholder = "Search destinations.."></input>
                        </li>
                        <li>
                            <NavLink to = "/login">Log In</NavLink>
                        </li>
                        <li>
                            <NavLink to= "/contact">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MainSidebar