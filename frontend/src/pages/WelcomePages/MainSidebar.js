import { NavLink } from 'react-router-dom'
import '../../navbar.css'
import companyLogo from '../../images/globert_logo.png'

const MainSidebar = () => {
    return (
        <nav className = "navbar">
            <div className = "container">
                <div className = "nav-logo">
                    <NavLink to = "/home">
                        <img src = { companyLogo } style = {{ width: '55%', height: '45%' }} alt='Globert Logo'/>
                    </NavLink>
                </div>
                <div className = "nav-elements">
                    <ul>
                        <li>
                            <NavLink to="/home">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/destinations">Destinations</NavLink>
                        </li>
                        <li>

                            <input className= "nav-search" type="text" placeholder = "Search destinations.." ></input>

                        </li>
                        <li>
                            <NavLink to="/login">Log In</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MainSidebar