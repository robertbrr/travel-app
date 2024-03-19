/* Components */
import MainSidebar from "./MainSidebar";
import companyLogo from '../../images/globert_logo.png'

/* Styles */
import "../../styles/background.css"

function ContactPage()
    {
    /* JSX */
    return(
        <div className = "destinations-page">
            <MainSidebar></MainSidebar>
            <div className="contact-container">
                <img src={ companyLogo } style={ { width: '100%', height: 'auto',  transform: "scale(0.5)" } } alt='Globert Logo'/>
                <div style = { { paddingTop: "40px" } } > Phone: 0766121009</div>
                <div> Mail: globert_travel@travel.ro</div>
                <div> Address: 20045 Hilpert View, East Kari, Nevada</div>
                <div> Business Hours: 10am - 6pm on weekdays, closed in the weekends </div>
            </div>
        </div>
    );
    }

export default ContactPage;